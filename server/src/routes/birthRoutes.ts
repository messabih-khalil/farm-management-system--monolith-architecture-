import express from 'express';
import * as birthController from '../controllers/birthController';
import { authenticateJWT, adminOnly } from '../middlewares/authMiddleware';

const router = express.Router();

router.get('/', authenticateJWT, adminOnly, birthController.getAllBirths);

router.post('/', authenticateJWT, adminOnly, birthController.recordBirth);
router.get(
    '/cow/:motherCowId',
    authenticateJWT,
    birthController.getBirthsByMotherCow
);
router.put('/:id', authenticateJWT, adminOnly, birthController.updateBirth);
router.delete('/:id', authenticateJWT, adminOnly, birthController.deleteBirth);

export default router;
