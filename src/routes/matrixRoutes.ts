import express, { Router } from 'express';
import { addMatrices, multiplyMatrices } from '../controllers/matrixController';

const router: Router = express.Router();

// Matrix operation routes
router.post('/add', addMatrices);
router.post('/multiply', multiplyMatrices);

export default router;

