import express, { Request, Response } from 'express';

import authRoutes from './authRoutes.js';

const router = express.Router();

router.get('/health', (_req: Request, res: Response) => {
  res.status(200).json({
    status: 'success',
    message: 'API is up and running',
  });
});

router.use('/auth', authRoutes);

export default router; 