// src/controllers/medicalCheckController.ts
import { Request, Response } from 'express';
import { JsonFileHandler } from '../utils/jsonFileHandler';
import { v4 as uuidv4 } from 'uuid';
import { MedicalCheck } from '../types';
import { generateId } from '../utils/random-id';

const medicalCheckFileHandler = new JsonFileHandler('medicalChecks.json');

export const getAllMedicalChecks = async (req: Request, res: Response) => {
    try {
        const medicalChecks = await medicalCheckFileHandler.readFile();
        res.json(medicalChecks);
    } catch (error) {
        res.status(500).json({
            message: 'Error fetching all medical checks',
            error,
        });
    }
};

export const createMedicalCheck = async (req: Request, res: Response) => {
    try {
        const { cowId, checkDate, disease } = req.body;
        const newMedicalCheck: MedicalCheck = {
            id: generateId("medical"),
            cowId,
            checkDate,
            disease,
        };

        const medicalChecks = await medicalCheckFileHandler.readFile();
        medicalChecks.push(newMedicalCheck);
        await medicalCheckFileHandler.writeFile(medicalChecks);

        res.status(201).json(newMedicalCheck);
    } catch (error) {
        res.status(500).json({
            message: 'Error creating medical check',
            error,
        });
    }
};

export const getMedicalChecksByCow = async (req: Request, res: Response) => {
    try {
        const { cowId } = req.params;
        const medicalChecks = await medicalCheckFileHandler.readFile();
        const cowMedicalChecks = medicalChecks.filter(
            (check: MedicalCheck) => check.cowId === cowId
        );
        res.json(cowMedicalChecks);
    } catch (error) {
        res.status(500).json({
            message: 'Error fetching medical checks',
            error,
        });
    }
};

export const updateMedicalCheck = async (req: Request, res: Response) => {
    try {
        const { id } = req.params;
        const { cowId, checkDate, disease } = req.body;

        let medicalChecks = await medicalCheckFileHandler.readFile();
        const checkIndex = medicalChecks.findIndex(
            (check: MedicalCheck) => check.id === id
        );

        if (checkIndex === -1) {
            return res.status(404).json({ message: 'Medical check not found' });
        }

        medicalChecks[checkIndex] = {
            ...medicalChecks[checkIndex],
            cowId,
            checkDate,
            disease,
        };
        await medicalCheckFileHandler.writeFile(medicalChecks);

        res.json(medicalChecks[checkIndex]);
    } catch (error) {
        res.status(500).json({
            message: 'Error updating medical check',
            error,
        });
    }
};

export const deleteMedicalCheck = async (req: Request, res: Response) => {
    try {
        const { id } = req.params;

        let medicalChecks = await medicalCheckFileHandler.readFile();
        const newMedicalChecks = medicalChecks.filter(
            (check: MedicalCheck) => check.id !== id
        );

        await medicalCheckFileHandler.writeFile(newMedicalChecks);

        res.json({ message: 'Medical check deleted successfully' });
    } catch (error) {
        res.status(500).json({
            message: 'Error deleting medical check',
            error,
        });
    }
};
