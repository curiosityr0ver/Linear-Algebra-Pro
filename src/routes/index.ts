import express, { Router } from 'express';
import userRoutes from './userRoutes';
import matrixRoutes from './matrixRoutes';

const router: Router = express.Router();

// Mount routes
router.use('/users', userRoutes);
router.use('/matrices', matrixRoutes);

export default router;

