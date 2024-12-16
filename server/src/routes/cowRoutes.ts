import express from 'express';
import * as cowController from '../controllers/cowController';
import { authenticateJWT, adminOnly } from '../middlewares/authMiddleware';

const router = express.Router();

router.post('/', authenticateJWT, adminOnly, cowController.createCow);
router.get('/', authenticateJWT, cowController.getAllCows);
router.put('/:id', authenticateJWT, adminOnly, cowController.updateCow);
router.delete('/:id', authenticateJWT, adminOnly, cowController.deleteCow);

export default router;