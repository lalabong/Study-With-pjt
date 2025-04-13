import express from 'express';

import authRoutes from '#routes/authRoutes.js';

const router = express.Router();

router.get('/health', (req, res) => {
  res.status(200).json({
    status: 'success',
    message: 'API is up and running',
  });
});

router.use('/auth', authRoutes);

export default router;
