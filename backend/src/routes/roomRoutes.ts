import express from 'express';
import { getParticipants } from '../controllers/roomController.js';
import authMiddleware from '../middlewares/authMiddleware.js';

const router = express.Router();

/**
 * @swagger
 * /api/rooms/{roomId}/participants:
 *   get:
 *     summary: 방 참가자 목록 조회
 *     description: 특정 방에 참가하고 있는 사용자들의 정보를 조회합니다.
 *     tags: [Rooms]
 *     security:
 *       - bearerAuth: []
 *     parameters:
 *       - in: path
 *         name: roomId
 *         schema:
 *           type: string
 *         required: true
 *         description: 방 ID
 *     responses:
 *       200:
 *         description: 참가자 목록 조회 성공
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
 *                   example: 참가자 정보 조회에 성공했습니다.
 *                 data:
 *                   type: object
 *                   properties:
 *                     participants:
 *                       type: array
 *                       items:
 *                         type: object
 *                         properties:
 *                           id:
 *                             type: string
 *                             description: 사용자 고유 ID (CUID)
 *                             example: "cm123abc456def"
 *                           userId:
 *                             type: string
 *                             description: 사용자 ID
 *                             example: "user123"
 *                           nickname:
 *                             type: string
 *                             description: 사용자 닉네임
 *                             example: "홍길동"
 *                           profileImg:
 *                             type: string
 *                             nullable: true
 *                             description: 프로필 이미지 URL
 *                             example: "https://example.com/profile.jpg"
 *       401:
 *         description: 인증 실패
 *         content:
 *           application/json:
 *             schema:
 *               type: object
 *               properties:
 *                 status:
 *                   type: string
 *                   example: error
 *                 message:
 *                   type: string
 *                   example: 로그인이 필요한 서비스입니다.
 *                 errorCode:
 *                   type: integer
 *                   example: 3006
 *       404:
 *         description: 방을 찾을 수 없음
 *         content:
 *           application/json:
 *             schema:
 *               type: object
 *               properties:
 *                 status:
 *                   type: string
 *                   example: error
 *                 message:
 *                   type: string
 *                   example: 방을 찾을 수 없습니다.
 *                 errorCode:
 *                   type: integer
 *                   example: 5001
 */
router.get('/:roomId/participants', authMiddleware, getParticipants);

export default router;
