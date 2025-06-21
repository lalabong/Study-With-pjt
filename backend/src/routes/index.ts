import express, { Request, Response } from 'express';

import authRoutes from './authRoutes.js';
import userRoutes from './userRoutes.js';
import scheduleRoutes from './scheduleRoutes.js';
import roomRoutes from './roomRoutes.js';
import friendRoutes from './friendRoutes.js';

/**
 * @swagger
 * tags:
 *   - name: Auth
 *     description: 사용자 인증 관련 API
 *   - name: Users
 *     description: 사용자 정보 및 데이터 관련 API
 *   - name: Schedules
 *     description: 일정 관리 관련 API
 *   - name: Rooms
 *     description: 방 관리 관련 API
 *   - name: Friends
 *     description: 친구 관리 관련 API
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
router.use('/schedules', scheduleRoutes);
router.use('/rooms', roomRoutes);
router.use('/friends', friendRoutes);

export default router;
