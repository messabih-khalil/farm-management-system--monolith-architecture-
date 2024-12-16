
import express from 'express';
import * as milkProductionController from '../controllers/milkProductionController';
import { authenticateJWT, adminOnly } from '../middlewares/authMiddleware';

const router = express.Router();

router.post(
    '/',
    authenticateJWT,
    adminOnly,
    milkProductionController.recordMilkProduction
);
router.get(
    '/',
    authenticateJWT,
    milkProductionController.getMilkProductionByDateRange
);
router.put(
    '/:id',
    authenticateJWT,
    adminOnly,
    milkProductionController.updateMilkProduction
);
router.delete(
    '/:id',
    authenticateJWT,
    adminOnly,
    milkProductionController.deleteMilkProduction
);

export default router;
