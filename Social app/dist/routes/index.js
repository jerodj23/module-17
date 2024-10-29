import userRoutes from './api/userRoutes.js';
import thoughtRoutes from './api/thoughtRoutes.js';
import express from 'express';
const router = express.Router();
router.use('/users', userRoutes);
router.use('/thoughts', thoughtRoutes);
export default router;
