import express from 'express';

import {
  getUserSchedules,
  createSchedule,
  updateSchedule,
  deleteSchedule,
  updateScheduleOrder,
} from '../controllers/scheduleController.js';
import authMiddleware from '../middlewares/authMiddleware.js';

const router = express.Router();

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
 *             properties:
 *               title:
 *                 type: string
 *                 description: 일정 제목
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
 *                         startTime:
 *                           type: string
 *                           format: date-time
 *                         endTime:
 *                           type: string
 *                           format: date-time
 *                         status:
 *                           type: string
 *                         userId:
 *                           type: string
 *                         order:
 *                           type: integer
 *                           description: 일정 순서 값
 *       400:
 *         description: 잘못된 요청, 필수 필드 누락, 시간 범위 오류 또는 일일 일정 한도 초과
 *       401:
 *         description: 인증 실패
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
 *                         startTime:
 *                           type: string
 *                           format: date-time
 *                         endTime:
 *                           type: string
 *                           format: date-time
 *                         status:
 *                           type: string
 *                         userId:
 *                           type: string
 *                         order:
 *                           type: integer
 *       400:
 *         description: 잘못된 요청 또는 시간 범위 오류
 *       401:
 *         description: 인증 실패
 *       403:
 *         description: 접근 권한 없음
 *       404:
 *         description: 일정을 찾을 수 없음
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
 *       403:
 *         description: 접근 권한 없음
 *       404:
 *         description: 일정을 찾을 수 없음
 */
router.delete('/:scheduleId', authMiddleware, deleteSchedule);

/**
 * @swagger
 * /api/schedules/user/{userId}:
 *   get:
 *     summary: 사용자 일정 조회
 *     description: 특정 사용자의 일정 목록을 조회합니다.
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
 *         description: 시작 날짜 (YYYY-MM-DD)
 *       - in: query
 *         name: endDate
 *         schema:
 *           type: string
 *           format: date
 *         description: 종료 날짜 (YYYY-MM-DD)
 *     responses:
 *       200:
 *         description: 일정 조회 성공
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
 *                           userId:
 *                             type: string
 *                           title:
 *                             type: string
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
 *                           createdAt:
 *                             type: string
 *                             format: date-time
 *       401:
 *         description: 인증 실패
 *       404:
 *         description: 사용자를 찾을 수 없음
 */
router.get('/user/:userId', authMiddleware, getUserSchedules);

/**
 * @swagger
 * /api/schedules/{scheduleId}/order:
 *   patch:
 *     summary: 일정 순서 변경
 *     description: |
 *       사용자의 일정 순서를 변경합니다.
 *       드래그 앤 드롭으로 순서를 변경할 때 앞뒤 일정 순서의 중간값을 계산합니다.
 *       순서 간격이 너무 좁아지면 모든 일정을 자동으로 재정렬합니다.
 *     tags: [Schedules]
 *     security:
 *       - bearerAuth: []
 *     parameters:
 *       - in: path
 *         name: scheduleId
 *         schema:
 *           type: string
 *         required: true
 *         description: 순서를 변경할 일정 ID
 *     requestBody:
 *       required: true
 *       content:
 *         application/json:
 *           schema:
 *             type: object
 *             required:
 *               - targetPosition
 *             properties:
 *               targetPosition:
 *                 type: integer
 *                 description: 변경할 위치 (0부터 시작하는 인덱스)
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
 *                 data:
 *                   type: object
 *                   properties:
 *                     schedule:
 *                       type: object
 *                       properties:
 *                         id:
 *                           type: string
 *                         order:
 *                           type: integer
 *                           description: 변경된 순서 값
 *       400:
 *         description: 잘못된 요청 또는 유효하지 않은 위치
 *       401:
 *         description: 인증 실패
 *       403:
 *         description: 접근 권한 없음
 *       404:
 *         description: 일정을 찾을 수 없음
 */
router.patch('/:scheduleId/order', authMiddleware, updateScheduleOrder);

export default router;
