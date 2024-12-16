import express from 'express';
import * as medicalCheckController from '../controllers/medicalCheckController';
import { authenticateJWT, adminOnly } from '../middlewares/authMiddleware';

const router = express.Router();

router.get(
    '/',
    authenticateJWT,
    authenticateJWT,
    adminOnly,
    medicalCheckController.getAllMedicalChecks
);

router.post(
    '/',
    authenticateJWT,
    adminOnly,
    medicalCheckController.createMedicalCheck
);
router.get(
    '/cow/:cowId',
    authenticateJWT,
    medicalCheckController.getMedicalChecksByCow
);
router.put(
    '/:id',
    authenticateJWT,
    adminOnly,
    medicalCheckController.updateMedicalCheck
);
router.delete(
    '/:id',
    authenticateJWT,
    adminOnly,
    medicalCheckController.deleteMedicalCheck
);

export default router;
