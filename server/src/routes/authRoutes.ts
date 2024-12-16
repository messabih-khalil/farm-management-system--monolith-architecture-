// src/routes/authRoutes.ts
import express from 'express';
import { Request, Response } from 'express';
import { JsonFileHandler } from '../utils/jsonFileHandler';
import {
    hashPassword,
    comparePassword,
    generateToken,
} from '../utils/authUtils';
import { v4 as uuidv4 } from 'uuid';
import { User } from '../types';

const router = express.Router();
const userFileHandler = new JsonFileHandler('users.json');

router.post('/register', async (req: Request, res: Response) => {
    try {
        const { username, password, role } = req.body;

        // Check if user already exists
        const users = await userFileHandler.readFile();
        const existingUser = users.find((u: User) => u.username === username);

        if (existingUser) {
            return res.status(400).json({ message: 'Username already exists' });
        }

        // Hash password
        const hashedPassword = await hashPassword(password);

        // Create new user
        const newUser: User = {
            id: uuidv4(),
            username,
            password: hashedPassword,
            role: role || 'user',
        };

        users.push(newUser);
        await userFileHandler.writeFile(users);

        // Remove password before sending response
        const { password: _, ...userResponse } = newUser;
        res.status(201).json(userResponse);
    } catch (error) {
        res.status(500).json({ message: 'Error registering user', error });
    }
});

router.post('/login', async (req: Request, res: Response) => {
    try {
        const { username, password } = req.body;

        // Find user
        const users = await userFileHandler.readFile();
        const user = users.find((u: User) => u.username === username);

        if (!user) {
            return res.status(401).json({ message: 'Invalid credentials' });
        }

        // Check password
        const isMatch = await comparePassword(password, user.password);

        if (!isMatch) {
            return res.status(401).json({ message: 'Invalid credentials' });
        }

        // Generate token
        const token = generateToken(user);

        // Remove password before sending response
        const { password: _, ...userResponse } = user;
        res.json({ token, user: userResponse });
    } catch (error) {
        res.status(500).json({ message: 'Error logging in', error });
    }
});

export default router;
