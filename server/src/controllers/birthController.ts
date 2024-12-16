import { Request, Response } from 'express';
import { JsonFileHandler } from '../utils/jsonFileHandler';
import { v4 as uuidv4 } from 'uuid';
import { Birth } from '../types';
import { generateId } from '../utils/random-id';

const birthFileHandler = new JsonFileHandler('births.json');

export const recordBirth = async (req: Request, res: Response) => {
    try {
        const { motherCowId, birthDate } = req.body;
        const newBirth: Birth = {
            id: generateId("birth"),
            motherCowId,
            birthDate,
        };

        const births = await birthFileHandler.readFile();
        births.push(newBirth);
        await birthFileHandler.writeFile(births);

        res.status(201).json(newBirth);
    } catch (error) {
        res.status(500).json({ message: 'Error recording birth', error });
    }
};

export const getAllBirths = async (req: Request, res: Response) => {
    try {
        const births = await birthFileHandler.readFile();
        res.json(births);
    } catch (error) {
        res.status(500).json({
            message: 'Error fetching all birth records',
            error,
        });
    }
};

export const getBirthsByMotherCow = async (req: Request, res: Response) => {
    try {
        const { motherCowId } = req.params;
        const births = await birthFileHandler.readFile();
        const cowBirths = births.filter(
            (birth: Birth) => birth.motherCowId === motherCowId
        );
        res.json(cowBirths);
    } catch (error) {
        res.status(500).json({ message: 'Error fetching births', error });
    }
};

export const updateBirth = async (req: Request, res: Response) => {
    try {
        const { id } = req.params;
        const { motherCowId, birthDate } = req.body;

        let births = await birthFileHandler.readFile();
        const birthIndex = births.findIndex((birth: Birth) => birth.id === id);

        if (birthIndex === -1) {
            return res.status(404).json({ message: 'Birth record not found' });
        }

        births[birthIndex] = {
            ...births[birthIndex],
            motherCowId,
            birthDate,
        };
        await birthFileHandler.writeFile(births);

        res.json(births[birthIndex]);
    } catch (error) {
        res.status(500).json({ message: 'Error updating birth record', error });
    }
};

export const deleteBirth = async (req: Request, res: Response) => {
    try {
        const { id } = req.params;

        let births = await birthFileHandler.readFile();
        const newBirths = births.filter((birth: Birth) => birth.id !== id);

        await birthFileHandler.writeFile(newBirths);

        res.json({ message: 'Birth record deleted successfully' });
    } catch (error) {
        res.status(500).json({ message: 'Error deleting birth record', error });
    }
};
