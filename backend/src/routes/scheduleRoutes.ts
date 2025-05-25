import express from 'express';

import {
  getUserScheduleDates,
  getUserSchedulesByDate,
  createSchedule,
  updateSchedule,
  deleteSchedule,
  updateScheduleOrder,
  getTopRunningSchedule,
} from '../controllers/scheduleController.js';
import authMiddleware from '../middlewares/authMiddleware.js';

const router = express.Router();

/**
 * @swagger
 * /api/schedules/user/{userId}/dates:
 *   get:
 *     summary: 사용자의 일정이 있는 날짜만 조회
 *     description: 특정 사용자의 일정이 있는 날짜 목록을 조회합니다.
 *     tags: [Schedules]
 *     security:
 *       - bearerAuth: []
 *     parameters:
 *       - in: path
 *         name: userId
 *         schema:
 *           type: string
 *         required: true
 *         description: 사용자 ID
 *       - in: query
 *         name: startDate
 *         schema:
 *           type: string
 *           format: date
 *         required: true
 *         description: 시작 날짜 (YYYY-MM-DD)
 *       - in: query
 *         name: endDate
 *         schema:
 *           type: string
 *           format: date
 *         required: true
 *         description: 종료 날짜 (YYYY-MM-DD)
 *     responses:
 *       200:
 *         description: 일정 날짜 조회 성공
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
 *                   example: 일정 조회에 성공했습니다.
 *                 data:
 *                   type: object
 *                   properties:
 *                     scheduleDates:
 *                       type: array
 *                       items:
 *                         type: string
 *                         format: date
 *                         example: "2023-10-15"
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
 */
router.get('/user/:userId/dates', authMiddleware, getUserScheduleDates);

/**
 * @swagger
 * /api/schedules/user/{userId}/byDate:
 *   get:
 *     summary: 사용자의 특정 날짜 일정 상세 조회
 *     description: 사용자의 특정 날짜에 해당하는 모든 일정을 조회합니다.
 *     tags: [Schedules]
 *     security:
 *       - bearerAuth: []
 *     parameters:
 *       - in: path
 *         name: userId
 *         schema:
 *           type: string
 *         required: true
 *         description: 사용자 ID
 *       - in: query
 *         name: date
 *         schema:
 *           type: string
 *           format: date
 *         required: true
 *         description: 조회할 날짜 (YYYY-MM-DD)
 *     responses:
 *       200:
 *         description: 일정 상세 조회 성공
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
 *                   example: 일정 조회에 성공했습니다.
 *                 data:
 *                   type: object
 *                   properties:
 *                     schedules:
 *                       type: array
 *                       items:
 *                         type: object
 *                         properties:
 *                           id:
 *                             type: string
 *                           userCuid:
 *                             type: string
 *                           title:
 *                             type: string
 *                           date:
 *                             type: string
 *                             format: date
 *                           createdAt:
 *                             type: string
 *                             format: date-time
 *                           startTime:
 *                             type: string
 *                             format: date-time
 *                           endTime:
 *                             type: string
 *                             format: date-time
 *                           status:
 *                             type: string
 *                           order:
 *                             type: integer
 *       400:
 *         description: 필수 필드 누락
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
 *                   example: 필수 필드를 입력해주세요.
 *                 errorCode:
 *                   type: integer
 *                   example: 4004
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
 */
router.get('/user/:userId/byDate', authMiddleware, getUserSchedulesByDate);

/**
 * @swagger
 * /api/schedules/user/{userId}/topRunningSchedule:
 *   get:
 *     summary: 사용자의 특정 날짜에서 진행중인 최상단 일정 조회
 *     description: 사용자의 특정 날짜에서 '진행중' 상태인 일정들 중 가장 먼저 시작하는 일정을 조회합니다.
 *     tags: [Schedules]
 *     security:
 *       - bearerAuth: []
 *     parameters:
 *       - in: path
 *         name: userId
 *         schema:
 *           type: string
 *         required: true
 *         description: 사용자 ID
 *       - in: query
 *         name: date
 *         schema:
 *           type: string
 *           format: date
 *         required: true
 *         description: 조회할 날짜 (YYYY-MM-DD)
 *     responses:
 *       200:
 *         description: 최상단 진행중 일정 조회 성공
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
 *                   example: 최상단 진행중 일정 조회에 성공했습니다.
 *                 data:
 *                   type: object
 *                   properties:
 *                     topRunningSchedule:
 *                       type: object
 *                       nullable: true
 *                       properties:
 *                         id:
 *                           type: string
 *                         userCuid:
 *                           type: string
 *                         title:
 *                           type: string
 *                         date:
 *                           type: string
 *                           format: date
 *                         startTime:
 *                           type: string
 *                           format: date-time
 *                         endTime:
 *                           type: string
 *                           format: date-time
 *                         status:
 *                           type: string
 *                         order:
 *                           type: integer
 *                         createdAt:
 *                           type: string
 *                           format: date-time
 *       400:
 *         description: 필수 필드 누락
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
 *                   example: 필수 필드를 입력해주세요.
 *                 errorCode:
 *                   type: integer
 *                   example: 4004
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
 */
router.get('/user/:userId/topRunningSchedule', authMiddleware, getTopRunningSchedule);

/**
 * @swagger
 * /api/schedules:
 *   post:
 *     summary: 새 일정 생성
 *     description: 새로운 일정을 생성합니다. 하루에 최대 20개까지 일정을 생성할 수 있습니다.
 *     tags: [Schedules]
 *     security:
 *       - bearerAuth: []
 *     requestBody:
 *       required: true
 *       content:
 *         application/json:
 *           schema:
 *             type: object
 *             required:
 *               - title
 *               - date
 *             properties:
 *               title:
 *                 type: string
 *                 description: 일정 제목
 *               date:
 *                 type: string
 *                 format: date
 *                 description: 일정 날짜 (YYYY-MM-DD)
 *               startTime:
 *                 type: string
 *                 format: date-time
 *                 description: 시작 시간 (ISO 8601 형식)
 *               endTime:
 *                 type: string
 *                 format: date-time
 *                 description: 종료 시간 (ISO 8601 형식)
 *               status:
 *                 type: string
 *                 description: 일정 상태
 *                 default: "대기중"
 *     responses:
 *       201:
 *         description: 일정 생성 성공
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
 *                   example: 일정이 생성되었습니다.
 *                 data:
 *                   type: object
 *                   properties:
 *                     schedule:
 *                       type: object
 *                       properties:
 *                         id:
 *                           type: string
 *                         title:
 *                           type: string
 *                         date:
 *                           type: string
 *                           format: date
 *                         startTime:
 *                           type: string
 *                           format: date-time
 *                           description: startTime이 제공된 경우에만 포함됩니다.
 *                         endTime:
 *                           type: string
 *                           format: date-time
 *                           description: endTime이 제공된 경우에만 포함됩니다.
 *                         status:
 *                           type: string
 *                         userCuid:
 *                           type: string
 *                         order:
 *                           type: integer
 *                         createdAt:
 *                           type: string
 *                           format: date-time
 *       400:
 *         description: 필수 필드 누락
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
 *                   example: 일정 이름을 입력해주세요.
 *                 errorCode:
 *                   type: integer
 *                   example: 4004
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
 *       422:
 *         description: 유효하지 않은 시간 범위
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
 *                   example: 시작 시간은 종료 시간보다 이전이어야 합니다.
 *                 errorCode:
 *                   type: integer
 *                   example: 4003
 *       429:
 *         description: 일일 일정 한도 초과
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
 *                   example: 하루당 최대 20개까지 일정을 생성할 수 있습니다.
 *                 errorCode:
 *                   type: integer
 *                   example: 4006
 */
router.post('/', authMiddleware, createSchedule);

/**
 * @swagger
 * /api/schedules/{scheduleId}:
 *   patch:
 *     summary: 일정 수정
 *     description: 기존 일정의 일부를 수정합니다.
 *     tags: [Schedules]
 *     security:
 *       - bearerAuth: []
 *     parameters:
 *       - in: path
 *         name: scheduleId
 *         schema:
 *           type: string
 *         required: true
 *         description: 일정 ID
 *     requestBody:
 *       required: true
 *       content:
 *         application/json:
 *           schema:
 *             type: object
 *             properties:
 *               title:
 *                 type: string
 *                 description: 수정할 제목
 *               startTime:
 *                 type: string
 *                 format: date-time
 *                 description: 수정할 시작 시간
 *               endTime:
 *                 type: string
 *                 format: date-time
 *                 description: 수정할 종료 시간
 *               status:
 *                 type: string
 *                 description: 수정할 상태
 *     responses:
 *       200:
 *         description: 일정 수정 성공
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
 *                   example: 일정이 수정되었습니다.
 *                 data:
 *                   type: object
 *                   properties:
 *                     schedule:
 *                       type: object
 *                       properties:
 *                         id:
 *                           type: string
 *                         title:
 *                           type: string
 *                         date:
 *                           type: string
 *                           format: date
 *                         startTime:
 *                           type: string
 *                           format: date-time
 *                         endTime:
 *                           type: string
 *                           format: date-time
 *                         status:
 *                           type: string
 *                         userCuid:
 *                           type: string
 *                         order:
 *                           type: integer
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
 *                   example: 1005
 *       403:
 *         description: 접근 권한 없음
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
 *                   example: 권한이 없습니다.
 *                 errorCode:
 *                   type: integer
 *                   example: 4002
 *       404:
 *         description: 일정을 찾을 수 없음
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
 *                   example: 일정을 찾을 수 없습니다.
 *                 errorCode:
 *                   type: integer
 *                   example: 4001
 *       422:
 *         description: 유효하지 않은 시간 범위
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
 *                   example: 시작 시간은 종료 시간보다 이전이어야 합니다.
 *                 errorCode:
 *                   type: integer
 *                   example: 4003
 */
router.patch('/:scheduleId', authMiddleware, updateSchedule);

/**
 * @swagger
 * /api/schedules/{scheduleId}:
 *   delete:
 *     summary: 일정 삭제
 *     description: 기존 일정을 삭제합니다.
 *     tags: [Schedules]
 *     security:
 *       - bearerAuth: []
 *     parameters:
 *       - in: path
 *         name: scheduleId
 *         schema:
 *           type: string
 *         required: true
 *         description: 일정 ID
 *     responses:
 *       200:
 *         description: 일정 삭제 성공
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
 *                   example: 일정이 삭제되었습니다.
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
 *                   example: 1005
 *       403:
 *         description: 접근 권한 없음
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
 *                   example: 권한이 없습니다.
 *                 errorCode:
 *                   type: integer
 *                   example: 4002
 *       404:
 *         description: 일정을 찾을 수 없음
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
 *                   example: 일정을 찾을 수 없습니다.
 *                 errorCode:
 *                   type: integer
 *                   example: 4001
 */
router.delete('/:scheduleId', authMiddleware, deleteSchedule);

/**
 * @swagger
 * /api/schedules/order:
 *   put:
 *     summary: 일정 순서 일괄 변경
 *     description: 특정 날짜의 모든 일정 순서를 클라이언트에서 정렬된 순서대로 일괄 업데이트합니다.
 *     tags: [Schedules]
 *     security:
 *       - bearerAuth: []
 *     requestBody:
 *       required: true
 *       content:
 *         application/json:
 *           schema:
 *             type: object
 *             required:
 *               - date
 *               - schedules
 *             properties:
 *               date:
 *                 type: string
 *                 format: date
 *                 description: 일정 날짜 (YYYY-MM-DD)
 *               schedules:
 *                 type: array
 *                 description: 순서대로 정렬된 일정 ID 배열
 *                 items:
 *                   type: string
 *                   description: 일정 ID
 *     responses:
 *       200:
 *         description: 일정 순서 변경 성공
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
 *                   example: 일정 순서가 변경되었습니다.
 *       400:
 *         description: 필수 필드 누락
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
 *                   example: 필수 필드를 입력해주세요.
 *                 errorCode:
 *                   type: integer
 *                   example: 4004
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
 *         description: 일정을 찾을 수 없음
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
 *                   example: 일정을 찾을 수 없습니다.
 *                 errorCode:
 *                   type: integer
 *                   example: 4001
 */
router.put('/order', authMiddleware, updateScheduleOrder);

export default router;
