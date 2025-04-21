import express, { Request, Response } from 'express';

import authRoutes from './authRoutes.js';
import userRoutes from './userRoutes.js';

/**
 * @swagger
 * tags:
 *   - name: Auth
 *     description: 사용자 인증 관련 API
 *   - name: Users
 *     description: 사용자 정보 및 데이터 관련 API
 *   - name: System
 *     description: 시스템 관련 API
 */

const router = express.Router();

/**
 * @swagger
 * /api/health:
 *   get:
 *     summary: API 상태 확인
 *     tags: [System]
 *     responses:
 *       200:
 *         description: API 서버가 정상적으로 작동 중임
 *         content:
 *           application/json:
 *             schema:
 *               type: object
 *               properties:
 *                 status:
 *                   type: string
 *                   example: success
 *                 message:
 *                   type: string
 *                   example: API is up and running
 */
router.get('/health', (_req: Request, res: Response) => {
  res.status(200).json({
    status: 'success',
    message: 'API is up and running',
  });
});

router.use('/auth', authRoutes);
router.use('/users', userRoutes);

export default router;
