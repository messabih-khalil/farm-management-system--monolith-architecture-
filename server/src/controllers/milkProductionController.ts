// src/controllers/milkProductionController.ts
import { Request, Response } from 'express';
import { JsonFileHandler } from '../utils/jsonFileHandler';
import { v4 as uuidv4 } from 'uuid';
import { MilkProduction } from '../types';
import { generateId } from '../utils/random-id';

const milkProductionFileHandler = new JsonFileHandler('milkProduction.json');

export const recordMilkProduction = async (req: Request, res: Response) => {
    try {
        const { date, milkQuantityLiters } = req.body;
        const newMilkProduction: MilkProduction = {
            id: generateId('milk'),
            date,
            milkQuantityLiters,
        };

        const milkProductions = await milkProductionFileHandler.readFile();
        milkProductions.push(newMilkProduction);
        await milkProductionFileHandler.writeFile(milkProductions);

        res.status(201).json(newMilkProduction);
    } catch (error) {
        res.status(500).json({
            message: 'Error recording milk production',
            error,
        });
    }
};

export const getMilkProductionByDateRange = async (
    req: Request,
    res: Response
) => {
    try {
        const { startDate, endDate } = req.query;
        const milkProductions = await milkProductionFileHandler.readFile();

        const filteredProductions = milkProductions.filter(
            (production: MilkProduction) => {
                const productionDate = new Date(production.date);
                const start = startDate ? new Date(startDate as string) : null;
                const end = endDate ? new Date(endDate as string) : null;

                return (
                    (!start || productionDate >= start) &&
                    (!end || productionDate <= end)
                );
            }
        );

        const totalMilk = filteredProductions.reduce(
            (sum: number, production: MilkProduction) =>
                sum + production.milkQuantityLiters,
            0
        );

        res.json({
            productions: filteredProductions,
            totalMilk,
        });
    } catch (error) {
        res.status(500).json({
            message: 'Error fetching milk production',
            error,
        });
    }
};

export const updateMilkProduction = async (req: Request, res: Response) => {
    try {
        const { id } = req.params;
        const { date, milkQuantityLiters } = req.body;

        let milkProductions = await milkProductionFileHandler.readFile();
        const productionIndex = milkProductions.findIndex(
            (prod: MilkProduction) => prod.id === id
        );

        if (productionIndex === -1) {
            return res
                .status(404)
                .json({ message: 'Milk production record not found' });
        }

        milkProductions[productionIndex] = {
            ...milkProductions[productionIndex],
            date,
            milkQuantityLiters,
        };
        await milkProductionFileHandler.writeFile(milkProductions);

        res.json(milkProductions[productionIndex]);
    } catch (error) {
        res.status(500).json({
            message: 'Error updating milk production record',
            error,
        });
    }
};

export const deleteMilkProduction = async (req: Request, res: Response) => {
    try {
        const { id } = req.params;

        let milkProductions = await milkProductionFileHandler.readFile();
        const newMilkProductions = milkProductions.filter(
            (prod: MilkProduction) => prod.id !== id
        );

        await milkProductionFileHandler.writeFile(newMilkProductions);

        res.json({ message: 'Milk production record deleted successfully' });
    } catch (error) {
        res.status(500).json({
            message: 'Error deleting milk production record',
            error,
        });
    }
};
