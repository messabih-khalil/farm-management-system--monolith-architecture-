import bcrypt from 'bcryptjs';
import jwt from 'jsonwebtoken';

export const hashPassword = async (password: string): Promise<string> => {
  return await bcrypt.hash(password, 10);
};

export const comparePassword = async (password: string, hashedPassword: string): Promise<boolean> => {
  return await bcrypt.compare(password, hashedPassword);
};

export const generateToken = (user: any): string => {
  return jwt.sign(
    { id: user.id, username: user.username, role: user.role }, 
    process.env.JWT_SECRET || 'your-secret-key', 
    { expiresIn: '1h' }
  );
};