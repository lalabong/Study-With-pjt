import express from 'express';
import { getFriends, deleteFriend, postFriendRequest } from '../controllers/friendController.js';
import authMiddleware from '../middlewares/authMiddleware.js';

const router = express.Router();

/**
 * @swagger
 * /api/friends/{userCuid}:
 *   get:
 *     summary: 친구 목록 조회
 *     description: 사용자의 친구 목록을 조회합니다. status가 'accepted'인 친구들만 반환됩니다.
 *     tags: [Friends]
 *     security:
 *       - bearerAuth: []
 *     parameters:
 *       - in: path
 *         name: userCuid
 *         schema:
 *           type: string
 *         required: true
 *         description: 사용자의 고유 ID (CUID)
 *         example: "cm123abc456def"
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
router.get('/:userCuid', authMiddleware, getFriends);

/**
 * @swagger
 * /api/friends/{userCuid}:
 *   delete:
 *     summary: 친구 삭제
 *     description: 사용자의 친구 관계를 삭제합니다. 양방향 친구 관계가 모두 삭제됩니다.
 *     tags: [Friends]
 *     security:
 *       - bearerAuth: []
 *     parameters:
 *       - in: path
 *         name: userCuid
 *         schema:
 *           type: string
 *         required: true
 *         description: 사용자의 고유 ID (CUID)
 *         example: "cm123abc456def"
 *     requestBody:
 *       required: true
 *       content:
 *         application/json:
 *           schema:
 *             type: object
 *             required:
 *               - friendCuid
 *             properties:
 *               friendCuid:
 *                 type: string
 *                 description: 삭제할 친구의 고유 ID (CUID)
 *                 example: "cm123abc456def"
 *     responses:
 *       200:
 *         description: 친구 삭제 성공
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
 *                   nullable: true
 *                   example: null
 *                 message:
 *                   type: string
 *                   example: 친구 삭제에 성공했습니다.
 *       400:
 *         description: 잘못된 요청 (필수 필드 누락)
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
 *                   example: friendCuid는 필수 입력 항목입니다.
 *                 errorCode:
 *                   type: integer
 *                   example: 6001
 *       404:
 *         description: 사용자 또는 친구를 찾을 수 없음
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
 *             examples:
 *               userNotFound:
 *                 summary: 사용자를 찾을 수 없음
 *                 value:
 *                   status: error
 *                   message: 사용자를 찾을 수 없습니다.
 *                   errorCode: 3001
 *               friendNotFound:
 *                 summary: 친구를 찾을 수 없음
 *                 value:
 *                   status: error
 *                   message: 친구를 찾을 수 없습니다.
 *                   errorCode: 6001
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
router.delete('/:userCuid', authMiddleware, deleteFriend);

/**
 * @swagger
 * /api/friends/{userCuid}/request:
 *   post:
 *     summary: 친구 요청 전송
 *     description: 다른 사용자에게 친구 요청을 전송합니다. 자기 자신에게는 요청할 수 없고, 이미 친구이거나 대기 중인 요청이 있으면 실패합니다.
 *     tags: [Friends]
 *     security:
 *       - bearerAuth: []
 *     parameters:
 *       - in: path
 *         name: userCuid
 *         schema:
 *           type: string
 *         required: true
 *         description: 요청자의 고유 ID (CUID)
 *         example: "cm123abc456def"
 *     requestBody:
 *       required: true
 *       content:
 *         application/json:
 *           schema:
 *             type: object
 *             required:
 *               - friendCuid
 *             properties:
 *               friendCuid:
 *                 type: string
 *                 description: 친구 요청을 받을 사용자의 고유 ID (CUID)
 *                 example: "cm456def789ghi"
 *     responses:
 *       200:
 *         description: 친구 요청 전송 성공
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
 *                   nullable: true
 *                   example: null
 *                 message:
 *                   type: string
 *                   example: 친구 요청을 전송했습니다.
 *       400:
 *         description: 잘못된 요청
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
 *                 errorCode:
 *                   type: integer
 *             examples:
 *               selfRequest:
 *                 summary: 자기 자신에게 친구 요청
 *                 value:
 *                   status: error
 *                   message: 자기 자신에게는 친구 요청을 보낼 수 없습니다.
 *                   errorCode: 6003
 *               alreadyFriends:
 *                 summary: 이미 친구인 경우
 *                 value:
 *                   status: error
 *                   message: 이미 친구입니다.
 *                   errorCode: 6004
 *               requestExists:
 *                 summary: 이미 친구 요청이 존재하는 경우
 *                 value:
 *                   status: error
 *                   message: 이미 친구 요청이 존재합니다.
 *                   errorCode: 6002
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
router.post('/:userCuid/request', authMiddleware, postFriendRequest);

export default router;
