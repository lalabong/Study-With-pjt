import express from 'express';
import { getFriends } from '../controllers/friendController.js';
import authMiddleware from '../middlewares/authMiddleware.js';

const router = express.Router();

/**
 * @swagger
 * /api/friends/{userId}:
 *   get:
 *     summary: 친구 목록 조회
 *     description: 사용자의 친구 목록을 조회합니다. status가 'accepted'인 친구들만 반환됩니다.
 *     tags: [Friends]
 *     security:
 *       - bearerAuth: []
 *     parameters:
 *       - in: path
 *         name: userId
 *         schema:
 *           type: string
 *         required: true
 *         description: 사용자 ID
 *     responses:
 *       200:
 *         description: 친구 목록 조회 성공
 *         content:
 *           application/json:
 *             schema:
 *               type: object
 *               properties:
 *                 status:
 *                   type: string
 *                   example: success
 *                 data:
 *                   type: object
 *                   properties:
 *                     friends:
 *                       type: array
 *                       description: 친구 목록
 *                       items:
 *                         type: object
 *                         properties:
 *                           id:
 *                             type: string
 *                             description: 친구의 고유 ID (CUID)
 *                             example: "cm123abc456def"
 *                           userId:
 *                             type: string
 *                             description: 친구의 사용자 ID
 *                             example: "friend123"
 *                           nickname:
 *                             type: string
 *                             description: 친구의 닉네임
 *                             example: "친구닉네임"
 *                           profileImg:
 *                             type: string
 *                             nullable: true
 *                             description: 친구의 프로필 이미지 URL
 *                             example: "https://example.com/profile.jpg"
 *                 message:
 *                   type: string
 *                   example: 친구 목록 조회에 성공했습니다.
 *       404:
 *         description: 사용자를 찾을 수 없음
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
 *                   example: 사용자를 찾을 수 없습니다.
 *                 errorCode:
 *                   type: integer
 *                   example: 3001
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
 *       500:
 *         description: 서버 내부 오류
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
 *                   example: 서버 내부 오류가 발생했습니다.
 *                 errorCode:
 *                   type: integer
 *                   example: 2001
 */
router.get('/:userId', authMiddleware, getFriends);

export default router;
