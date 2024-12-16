import { Request, Response } from 'express';
import { JsonFileHandler } from '../utils/jsonFileHandler';
import { v4 as uuidv4 } from 'uuid';
import { Cow } from '../types';
import { generateId } from '../utils/random-id';

const cowFileHandler = new JsonFileHandler('cows.json');

export const createCow = async (req: Request, res: Response) => {
    try {
        const { entryDate, breed } = req.body;
        const newCow: Cow = {
            id: generateId('cow'),
            entryDate,
            breed,
        };

        const cows = await cowFileHandler.readFile();
        cows.push(newCow);
        await cowFileHandler.writeFile(cows);

        res.status(201).json(newCow);
    } catch (error) {
        res.status(500).json({ message: 'Error creating cow', error });
    }
};

export const getAllCows = async (req: Request, res: Response) => {
    try {
        const cows = await cowFileHandler.readFile();
        res.json(cows);
    } catch (error) {
        res.status(500).json({ message: 'Error fetching cows', error });
    }
};

export const updateCow = async (req: Request, res: Response) => {
    try {
        const { id } = req.params;
        const { entryDate, breed } = req.body;

        let cows = await cowFileHandler.readFile();
        const cowIndex = cows.findIndex((cow: Cow) => cow.id === id);

        if (cowIndex === -1) {
            return res.status(404).json({ message: 'Cow not found' });
        }

        cows[cowIndex] = { ...cows[cowIndex], entryDate, breed };
        await cowFileHandler.writeFile(cows);

        res.json(cows[cowIndex]);
    } catch (error) {
        res.status(500).json({ message: 'Error updating cow', error });
    }
};

export const deleteCow = async (req: Request, res: Response) => {
    try {
        const { id } = req.params;

        let cows = await cowFileHandler.readFile();
        const newCows = cows.filter((cow: Cow) => cow.id !== id);

        await cowFileHandler.writeFile(newCows);

        res.json({ message: 'Cow deleted successfully' });
    } catch (error) {
        res.status(500).json({ message: 'Error deleting cow', error });
    }
};
