import express from 'express';
import { getFriends, deleteFriend, postFriendRequest, deleteFriendRequest, getUserByNickname, getReceivedFriendRequests, postAcceptFriendRequest } from '../controllers/friendController.js';
import authMiddleware from '../middlewares/authMiddleware.js';

const router = express.Router();

/**
 * @swagger
 * /api/friends/search:
 *   get:
 *     summary: 닉네임으로 사용자 검색
 *     description: 닉네임으로 사용자를 검색합니다. 자기 자신은 제외되며, 다른 사용자들의 친구 관계 상태(pending, accepted)가 함께 표시됩니다. 최소 2자 이상의 검색어가 필요합니다.
 *     tags: [Friends]
 *     security:
 *       - bearerAuth: []
 *     parameters:
 *       - in: query
 *         name: nickname
 *         schema:
 *           type: string
 *           minLength: 2
 *         required: true
 *         description: 검색할 닉네임 (최소 2자 이상)
 *         example: "친구"
 *     responses:
 *       200:
 *         description: 사용자 검색 성공
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
 *                     users:
 *                       type: array
 *                       description: 검색된 사용자 목록 (최대 20개)
 *                       items:
 *                         type: object
 *                         properties:
 *                           id:
 *                             type: string
 *                             description: 사용자의 고유 ID (CUID)
 *                             example: "cm123abc456def"
 *                           userId:
 *                             type: string
 *                             description: 사용자의 로그인 ID
 *                             example: "user123"
 *                           nickname:
 *                             type: string
 *                             description: 사용자의 닉네임
 *                             example: "친구닉네임"
 *                           profileImg:
 *                             type: string
 *                             nullable: true
 *                             description: 사용자의 프로필 이미지 URL
 *                             example: "https://example.com/profile.jpg"
 *                           status:
 *                             type: string
 *                             nullable: true
 *                             description: |
 *                               현재 사용자와의 친구 관계 상태:
 *                               - null: 아무 관계 없음 (친구 요청 가능)
 *                               - pending_sent: 내가 보낸 친구 요청 대기중 (취소 가능)
 *                               - pending_received: 내가 받은 친구 요청 대기중 (수락/거절 가능)
 *                               - accepted: 이미 친구 (삭제 가능)
 *                             example: "pending_sent"
 *                             enum: ["pending_sent", "pending_received", "accepted"]
 *                     count:
 *                       type: integer
 *                       description: 검색된 사용자 수
 *                       example: 5
 *                 message:
 *                   type: string
 *                   example: 유저 닉네임으로 유저 검색에 성공했습니다.
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
 *               missingNickname:
 *                 summary: 닉네임 누락
 *                 value:
 *                   status: error
 *                   message: 친구 ID를 입력해주세요.
 *                   errorCode: 6006
 *               invalidLength:
 *                 summary: 검색어 길이 부족
 *                 value:
 *                   status: error
 *                   message: 검색어는 최소 2자 이상이어야 합니다.
 *                   errorCode: 6009
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
router.get('/search', authMiddleware, getUserByNickname);

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
 * /api/friends/{userCuid}/requests/received:
 *   get:
 *     summary: 받은 친구 요청 목록 조회
 *     description: 사용자가 받은 친구 요청 목록을 조회합니다. status가 'pending'인 요청들만 반환되며, 최근 요청 순으로 정렬됩니다.
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
 *         description: 받은 친구 요청 목록 조회 성공
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
 *                     receivedFriendRequests:
 *                       type: array
 *                       description: 받은 친구 요청 목록
 *                       items:
 *                         type: object
 *                         properties:
 *                           userCuid:
 *                             type: string
 *                             description: 요청을 보낸 사용자의 고유 ID (CUID)
 *                             example: "cm456def789ghi"
 *                           status:
 *                             type: string
 *                             description: 친구 요청 상태
 *                             example: "pending"
 *                           user:
 *                             type: object
 *                             description: 요청을 보낸 사용자 정보
 *                             properties:
 *                               id:
 *                                 type: string
 *                                 description: 사용자의 고유 ID (CUID)
 *                                 example: "cm456def789ghi"
 *                               userId:
 *                                 type: string
 *                                 description: 사용자의 로그인 ID
 *                                 example: "sender123"
 *                               nickname:
 *                                 type: string
 *                                 description: 사용자의 닉네임
 *                                 example: "요청보낸친구"
 *                               profileImg:
 *                                 type: string
 *                                 nullable: true
 *                                 description: 사용자의 프로필 이미지 URL
 *                                 example: "https://example.com/profile.jpg"
 *                 message:
 *                   type: string
 *                   example: 받은 친구 요청 목록 조회에 성공했습니다.
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
router.get('/:userCuid/requests/received', authMiddleware, getReceivedFriendRequests);

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

/**
 * @swagger
 * /api/friends/{userCuid}/request:
 *   delete:
 *     summary: 친구 요청 취소
 *     description: 사용자가 보낸 친구 요청을 취소합니다. 본인이 보낸 pending 상태의 친구 요청만 취소할 수 있습니다.
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
 *                 description: 친구 요청을 취소할 대상 사용자의 고유 ID (CUID)
 *                 example: "cm456def789ghi"
 *     responses:
 *       200:
 *         description: 친구 요청 취소 성공
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
 *                   example: 친구 요청 취소에 성공했습니다.
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
 *               requiredField:
 *                 summary: 필수 필드 누락
 *                 value:
 *                   status: error
 *                   message: 친구 ID를 입력해주세요.
 *                   errorCode: 6006
 *               selfRequest:
 *                 summary: 자기 자신에게 친구 요청 취소 시도
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
 *               cannotCancel:
 *                 summary: 취소할 수 없는 친구 요청
 *                 value:
 *                   status: error
 *                   message: 취소할 수 없는 친구 요청입니다.
 *                   errorCode: 6008
 *       403:
 *         description: 권한 없음 (본인의 친구 요청이 아님)
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
 *                   example: 본인의 친구 요청만 취소할 수 있습니다.
 *                 errorCode:
 *                   type: integer
 *                   example: 6007
 *       404:
 *         description: 사용자 또는 친구 요청을 찾을 수 없음
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
 *               userNotFound:
 *                 summary: 사용자를 찾을 수 없음
 *                 value:
 *                   status: error
 *                   message: 사용자를 찾을 수 없습니다.
 *                   errorCode: 3001
 *               requestNotFound:
 *                 summary: 친구 요청을 찾을 수 없음
 *                 value:
 *                   status: error
 *                   message: 친구 요청을 찾을 수 없습니다.
 *                   errorCode: 6005
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
router.delete('/:userCuid/request', authMiddleware, deleteFriendRequest);

/**
 * @swagger
 * /api/friends/{userCuid}/request/accept:
 *   post:
 *     summary: 친구 요청 수락
 *     description: 사용자가 받은 친구 요청을 수락합니다. pending 상태의 친구 요청만 수락할 수 있습니다.
 *     tags: [Friends]
 *     security:
 *       - bearerAuth: []
 *     parameters:
 *       - in: path
 *         name: userCuid
 *         schema:
 *           type: string
 *         required: true
 *         description: 수락하는 사용자의 고유 ID (CUID)
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
 *                 description: 친구 요청을 보낸 사용자의 고유 ID (CUID)
 *                 example: "cm456def789ghi"
 *     responses:
 *       200:
 *         description: 친구 요청 수락 성공
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
 *                   example: 친구 요청 수락에 성공했습니다.
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
 *               requiredField:
 *                 summary: 필수 필드 누락
 *                 value:
 *                   status: error
 *                   message: friendCuid는 필수 입력 항목입니다.
 *                   errorCode: 6001
 *               alreadyFriends:
 *                 summary: 이미 친구인 경우
 *                 value:
 *                   status: error
 *                   message: 이미 친구입니다.
 *                   errorCode: 6004
 *       404:
 *         description: 친구 요청을 찾을 수 없음
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
 *                   example: 친구 요청을 찾을 수 없습니다.
 *                 errorCode:
 *                   type: integer
 *                   example: 6005
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
router.post('/:userCuid/request/accept', authMiddleware, postAcceptFriendRequest);

export default router;
