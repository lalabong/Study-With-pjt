import express from 'express';

import { getUserInfo, getUserSchedules, getUserTimeLogs } from '../controllers/userController.js';
import authMiddleware from '../middlewares/authMiddleware.js';

const router = express.Router();

/**
 * @swagger
 * /api/users/{userId}:
 *   get:
 *     summary: 사용자 정보 조회
 *     description: 사용자 ID로 기본 정보를 조회합니다.
 *     tags: [Users]
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
 *         description: 사용자 정보 조회 성공
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
 *                   example: 사용자 정보 조회 성공
 *                 data:
 *                   type: object
 *                   properties:
 *                     id:
 *                       type: number
 *                       description: 사용자 ID (데이터베이스)
 *                     userId:
 *                       type: string
 *                       description: 사용자 로그인 ID
 *                     nickname:
 *                       type: string
 *                       description: 사용자 닉네임
 *                     profileImg:
 *                       type: string
 *                       nullable: true
 *                       description: 프로필 이미지 URL
 *                     createdAt:
 *                       type: string
 *                       format: date
 *                       example: "2023-05-25"
 *                       description: 가입일(YYYY-MM-DD 형식)
 *       404:
 *         description: 사용자를 찾을 수 없음
 *       401:
 *         description: 인증 실패
 */
router.get('/:userId', authMiddleware, getUserInfo);

/**
 * @swagger
 * /api/users/{userId}/schedules:
 *   get:
 *     summary: 사용자 일정 조회
 *     description: 사용자의 일정 목록을 조회합니다.
 *     tags: [Users]
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
 *                             type: number
 *                           userId:
 *                             type: number
 *                           createdAt:
 *                             type: string
 *                             format: date-time
 *                             example: "2023-05-25T10:00:00"
 *                           title:
 *                             type: string
 *                           startTime:
 *                             type: string
 *                             format: date-time
 *                             example: "2023-05-25T10:00:00"
 *                           endTime:
 *                             type: string
 *                             format: date-time
 *                             example: "2023-05-25T11:00:00"
 *                           status:
 *                             type: string
 *                             example: "대기중"
 *       404:
 *         description: 사용자를 찾을 수 없음
 *       401:
 *         description: 인증 실패
 */
router.get('/:userId/schedules', authMiddleware, getUserSchedules);

/**
 * @swagger
 * /api/users/{userId}/timelogs:
 *   get:
 *     summary: 사용자 시간 기록 조회
 *     description: >
 *       사용자의 학습 시간 기록을 조회합니다. 특정 날짜를 지정하면 해당 날짜가 속한 기간의 정보를 반환합니다.
 *       period=week 옵션을 사용하면 해당 날짜가 속한 주(월~일)의 일별 학습 시간을 제공합니다.
 *       period=month 옵션을 사용하면 현재 달과 과거 5개월(총 6개월)의 월별 통계를 함께 제공합니다.
 *     tags: [Users]
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
 *         name: period
 *         schema:
 *           type: string
 *           enum: [week, month]
 *         description: >
 *           조회 기간 (week, month)
 *           week - 해당 날짜가 속한 1주일(월~일)
 *           month - 현재 달 + 과거 5개월 (총 6개월)
 *       - in: query
 *         name: date
 *         schema:
 *           type: string
 *           format: date
 *         description: 기준 날짜 (YYYY-MM-DD). 지정하지 않으면 현재 날짜 기준으로 조회합니다.
 *     responses:
 *       200:
 *         description: 시간 기록 조회 성공
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
 *                   example: 시간 기록 조회에 성공했습니다.
 *                 data:
 *                   type: object
 *                   properties:
 *                     totalTime:
 *                       type: object
 *                       properties:
 *                         hours:
 *                           type: number
 *                           description: 총 시간
 *                         minutes:
 *                           type: number
 *                           description: 총 분
 *                         decimalHours:
 *                           type: number
 *                           description: 소수점 형태의 시간 (예-1.5)
 *                     periodInfo:
 *                       type: object
 *                       properties:
 *                         startDate:
 *                           type: string
 *                           format: date
 *                           description: 조회 기간 시작일
 *                         endDate:
 *                           type: string
 *                           format: date
 *                           description: 조회 기간 종료일
 *                     weeklyData:
 *                       type: array
 *                       description: period=week일 때만 제공
 *                       items:
 *                         type: object
 *                         properties:
 *                           date:
 *                             type: string
 *                             format: date
 *                             description: 날짜
 *                           hours:
 *                             type: number
 *                             description: 시간 단위
 *                           minutes:
 *                             type: number
 *                             description: 분 단위
 *                           decimalHours:
 *                             type: number
 *                             description: 소수점 형태 시간
 *                     monthlyData:
 *                       type: array
 *                       description: period=month일 때만 제공
 *                       items:
 *                         type: object
 *                         properties:
 *                           month:
 *                             type: string
 *                             example: "2023-04"
 *                             description: 해당 월
 *                           totalTime:
 *                             type: object
 *                             properties:
 *                               hours:
 *                                 type: number
 *                                 description: 월별 총 시간
 *                               minutes:
 *                                 type: number
 *                                 description: 월별 총 분
 *                               decimalHours:
 *                                 type: number
 *                                 description: 소수점 형태 시간
 *       404:
 *         description: 사용자를 찾을 수 없음
 *       401:
 *         description: 인증 실패
 */
router.get('/:userId/timelogs', authMiddleware, getUserTimeLogs);

export default router;
