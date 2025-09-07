import express from 'express';
import {
  getParticipants,
  createRoom,
  leaveRoom,
  checkLastParticipant,
  getRoomInfo,
  getCurrentRoom,
} from '../controllers/roomController.js';
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
/**
 * @swagger
 * /api/rooms:
 *   post:
 *     summary: 방 생성
 *     description: 새로운 스터디 방을 생성합니다.
 *     tags: [Rooms]
 *     security:
 *       - bearerAuth: []
 *     requestBody:
 *       required: true
 *       content:
 *         application/json:
 *           schema:
 *             type: object
 *             required:
 *               - name
 *             properties:
 *               name:
 *                 type: string
 *                 description: 방 이름
 *                 example: "JavaScript 스터디 방"
 *                 maxLength: 50
 *     responses:
 *       201:
 *         description: 방 생성 성공
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
 *                   example: 방 생성에 성공했습니다.
 *                 data:
 *                   type: object
 *                   properties:
 *                     room:
 *                       type: object
 *                       properties:
 *                         id:
 *                           type: string
 *                           description: 방 고유 ID (CUID)
 *                           example: "cm123abc456def"
 *                         name:
 *                           type: string
 *                           description: 방 이름
 *                           example: "JavaScript 스터디 방"
 *                         ownerCuid:
 *                           type: string
 *                           description: 방 소유자 ID
 *                           example: "cm456def789ghi"
 *                         createdAt:
 *                           type: string
 *                           format: date-time
 *                           description: 방 생성 시간
 *                           example: "2024-01-01T00:00:00.000Z"
 *       400:
 *         description: 방 이름이 누락됨
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
 *                   example: 방 이름을 입력해주세요.
 *                 errorCode:
 *                   type: integer
 *                   example: 5002
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
 */
router.post('/', authMiddleware, createRoom);

/**
 * @swagger
 * /api/rooms/current:
 *   get:
 *     summary: 현재 참여 중인 방 조회
 *     description: 현재 사용자가 참여 중인 방 정보를 조회합니다.
 *     tags: [Rooms]
 *     security:
 *       - bearerAuth: []
 *     responses:
 *       200:
 *         description: 현재 방 조회 성공
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
 *                   example: 방 정보 조회에 성공했습니다.
 *                 data:
 *                   type: object
 *                   properties:
 *                     currentRoom:
 *                       type: object
 *                       nullable: true
 *                       properties:
 *                         id:
 *                           type: string
 *                           description: 방 고유 ID
 *                           example: "cm123abc456def"
 *                         name:
 *                           type: string
 *                           description: 방 이름
 *                           example: "JavaScript 스터디 방"
 *                         createdAt:
 *                           type: string
 *                           format: date-time
 *                           description: 방 생성 시간
 *                           example: "2024-01-01T00:00:00.000Z"
 *                         ownerCuid:
 *                           type: string
 *                           description: 방 소유자 ID
 *                           example: "cm456def789ghi"
 */
router.get('/current', authMiddleware, getCurrentRoom);

/**
 * @swagger
 * /api/rooms/{roomId}:
 *   get:
 *     summary: 방 정보 조회
 *     description: 특정 방의 기본 정보를 조회합니다.
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
 *         description: 방 정보 조회 성공
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
 *                   example: 방 정보 조회에 성공했습니다.
 *                 data:
 *                   type: object
 *                   properties:
 *                     room:
 *                       type: object
 *                       properties:
 *                         id:
 *                           type: string
 *                           description: 방 고유 ID
 *                           example: "cm123abc456def"
 *                         name:
 *                           type: string
 *                           description: 방 이름
 *                           example: "JavaScript 스터디 방"
 *                         createdAt:
 *                           type: string
 *                           format: date-time
 *                           description: 방 생성 시간
 *                           example: "2024-01-01T00:00:00.000Z"
 *                         ownerCuid:
 *                           type: string
 *                           description: 방 소유자 ID
 *                           example: "cm456def789ghi"
 */
router.get('/:roomId', authMiddleware, getRoomInfo);

router.get('/:roomId/participants', authMiddleware, getParticipants);

/**
 * @swagger
 * /api/rooms/{roomId}/leave:
 *   delete:
 *     summary: 방 나가기
 *     description: 사용자가 방에서 나갑니다. 마지막 참여자가 나가면 방이 자동 삭제됩니다.
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
 *         description: 방 나가기 성공
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
 *                   example: 방에서 나갔습니다.
 *                 data:
 *                   type: object
 *                   properties:
 *                     roomDeleted:
 *                       type: boolean
 *                       description: 방이 삭제되었는지 여부
 *                       example: true
 */
router.delete('/:roomId/leave', authMiddleware, leaveRoom);

// sendBeacon을 위한 POST 엔드포인트 (동일한 기능)
router.post('/:roomId/leave', authMiddleware, leaveRoom);

/**
 * @swagger
 * /api/rooms/{roomId}/check-last-participant:
 *   get:
 *     summary: 마지막 참여자 확인
 *     description: 현재 사용자가 방의 마지막 참여자인지 확인합니다.
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
 *         description: 마지막 참여자 확인 성공
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
 *                   example: 마지막 참여자 확인이 완료되었습니다.
 *                 data:
 *                   type: object
 *                   properties:
 *                     isLastParticipant:
 *                       type: boolean
 *                       description: 마지막 참여자인지 여부
 *                       example: true
 *                     participantCount:
 *                       type: integer
 *                       description: 현재 참여자 수
 *                       example: 1
 */
router.get('/:roomId/check-last-participant', authMiddleware, checkLastParticipant);

export default router;
