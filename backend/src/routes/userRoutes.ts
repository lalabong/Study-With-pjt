import express from 'express';

import {
  getUserInfo,
  getUserTimeLogs,
  getUserTotalStudyTime,
  patchUserNickname,
  patchUserProfileImg,
} from '../controllers/userController.js';
import authMiddleware from '../middlewares/authMiddleware.js';
import { uploadProfileImg } from '../middlewares/fileMiddleware.js';

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
 *                       type: string
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
 *                   example: 3404
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
 *                   example: 1401
 */
router.get('/:userId', authMiddleware, getUserInfo);

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
 *                   example: 3404
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
 *                   example: 1401
 */
router.get('/:userId/timelogs', authMiddleware, getUserTimeLogs);

/**
 * @swagger
 * /api/users/{userId}/totalStudyTime:
 *   get:
 *     summary: 사용자 총 학습 시간 조회
 *     description: 사용자의 총 학습 시간을 조회합니다.
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
 *         description: 총 학습 시간 조회 성공
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
 *                   example: 총 학습 시간 조회에 성공했습니다.
 *                 data:
 *                   type: object
 *                   properties:
 *                     totalStudyTime:
 *                       type: number
 *                       description: 총 학습 시간
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
 *                   example: 3404
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
 *                   example: 1401
 */
router.get('/:userId/totalStudyTime', authMiddleware, getUserTotalStudyTime);

/**
 * @swagger
 * /api/users/{userId}/profileImg:
 *   patch:
 *     summary: 사용자 프로필 이미지 수정
 *     description: 사용자의 프로필 이미지를 수정합니다. 파일 업로드 또는 URL 문자열로 가능합니다.
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
 *     requestBody:
 *       required: false
 *       content:
 *         multipart/form-data:
 *           schema:
 *             type: object
 *             properties:
 *               profileImg:
 *                 type: string
 *                 format: binary
 *                 description: 프로필 이미지 파일 (jpg, jpeg, png, gif만 지원, 최대 5MB)
 *         application/json:
 *           schema:
 *             type: object
 *             properties:
 *               profileImg:
 *                 type: string
 *                 description: 프로필 이미지 URL 또는 null (null인 경우 프로필 이미지 제거)
 *     responses:
 *       200:
 *         description: 프로필 이미지 수정에 성공했습니다.
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
 *                   example: 프로필 이미지 수정에 성공했습니다.
 *                 data:
 *                   type: object
 *                   properties:
 *                     profileImg:
 *                       type: string
 *                       nullable: true
 *                       description: 수정된 프로필 이미지의 전체 URL (서버 도메인 포함) 또는 null
 *                       example: "http://localhost:4000/uploads/profiles/user123_1746259680098.png"
 *       400:
 *         description: 잘못된 요청 또는 파일 업로드 오류
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
 *                   example: 파일 업로드 오류가 발생했습니다.
 *                 errorCode:
 *                   type: integer
 *                   example: 3004
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
 *                   example: 3404
 *       413:
 *         description: 파일 크기가 너무 큼 (최대 5MB)
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
 *                   example: 파일 크기가 너무 큽니다. 최대 5MB까지 업로드 가능합니다.
 *                 errorCode:
 *                   type: integer
 *                   example: 3002
 *       415:
 *         description: 지원하지 않는 파일 형식 (jpg, jpeg, png, gif만 지원)
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
 *                   example: 지원하지 않는 파일 형식입니다. (jpg, jpeg, png, gif만 가능)
 *                 errorCode:
 *                   type: integer
 *                   example: 3003
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
router.patch('/:userId/profileImg', uploadProfileImg, patchUserProfileImg);

/**
 * @swagger
 * /api/users/{userId}/nickname:
 *   patch:
 *     summary: 사용자 닉네임 수정
 *     description: 사용자의 닉네임을 수정합니다.
 *     tags: [Users]
 *     security:
 *       - bearerAuth: []
 *     parameters:
 *       - in: path
 *         name: userId
 *         schema:
 *           type: string
 *         description: 사용자 ID
 *     requestBody:
 *       required: true
 *       content:
 *         application/json:
 *           schema:
 *             type: object
 *             required:
 *               - nickname
 *             properties:
 *               nickname:
 *                 type: string
 *                 description: 수정할 닉네임 (1자 이상 50자 이하)
 *     responses:
 *       200:
 *         description: 닉네임 수정에 성공했습니다.
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
 *                   example: 닉네임 수정에 성공했습니다.
 *                 data:
 *                   type: object
 *                   properties:
 *                     nickname:
 *                       type: string
 *                       description: 수정된 닉네임
 *       400:
 *         description: 유효하지 않은 닉네임
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
 *                   example: 닉네임은 1자 이상 50자 이하여야 합니다.
 *                 errorCode:
 *                   type: integer
 *                   example: 3001
 *       404:
 *         description: 사용자를 찾을 수 없습니다.
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
 *                   example: 3404
 *       409:
 *         description: 이미 존재하는 닉네임
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
 *                   example: 이미 사용 중인 닉네임입니다.
 *                 errorCode:
 *                   type: integer
 *                   example: 1004
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
router.patch('/:userId/nickname', authMiddleware, patchUserNickname);

export default router;
