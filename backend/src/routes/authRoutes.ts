import express from 'express';

import { login, logout, refreshAccessToken, signup } from '../controllers/authController.js';

const router = express.Router();

/**
 * @swagger
 * /api/auth/login:
 *   post:
 *     summary: 사용자 로그인
 *     description: 사용자 ID와 비밀번호로 인증하고 액세스 토큰과 리프레시 토큰을 반환합니다.
 *     tags: [Auth]
 *     requestBody:
 *       required: true
 *       content:
 *         application/json:
 *           schema:
 *             type: object
 *             required:
 *               - userId
 *               - password
 *             properties:
 *               userId:
 *                 type: string
 *                 description: 사용자 ID
 *               password:
 *                 type: string
 *                 description: 사용자 비밀번호
 *     responses:
 *       200:
 *         description: 로그인 성공
 *         headers:
 *           Set-Cookie:
 *             schema:
 *               type: string
 *               description: HttpOnly refreshToken 쿠키
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
 *                   example: 로그인에 성공했습니다.
 *                 data:
 *                   type: object
 *                   properties:
 *                     accessToken:
 *                       type: string
 *                       description: JWT 액세스 토큰
 *                     user:
 *                       type: object
 *                       properties:
 *                         id:
 *                           type: number
 *                           description: 사용자 ID (데이터베이스)
 *                         userId:
 *                           type: string
 *                           description: 사용자 로그인 ID
 *                         nickname:
 *                           type: string
 *                           description: 사용자 닉네임
 *                         profileImg:
 *                           type: string
 *                           nullable: true
 *                           description: 프로필 이미지 URL
 *                         createdAt:
 *                           type: string
 *                           format: date
 *                           example: "2023-05-25"
 *                           description: 가입일 (YYYY-MM-DD 형식)
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
 *                   example: 존재하지 않는 아이디입니다.
 *       403:
 *         description: 비밀번호 불일치
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
 *                   example: 비밀번호가 일치하지 않습니다.
 */
router.post('/login', login);

/**
 * @swagger
 * /api/auth/signup:
 *   post:
 *     summary: 회원가입
 *     description: 새로운 사용자 계정을 생성하고 인증 토큰을 발급합니다.
 *     tags: [Auth]
 *     requestBody:
 *       required: true
 *       content:
 *         application/json:
 *           schema:
 *             type: object
 *             required:
 *               - userId
 *               - password
 *               - nickname
 *             properties:
 *               userId:
 *                 type: string
 *                 description: 사용자 ID (고유값)
 *               password:
 *                 type: string
 *                 description: 사용자 비밀번호
 *               nickname:
 *                 type: string
 *                 description: 사용자 닉네임 (고유값)
 *     responses:
 *       201:
 *         description: 회원가입 성공
 *         headers:
 *           Set-Cookie:
 *             schema:
 *               type: string
 *               description: HttpOnly refreshToken 쿠키 (14일 유효)
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
 *                   example: 회원가입이 완료되었습니다.
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
 *                   example: 모든 필수 항목을 입력해 주세요.
 *       409:
 *         description: 이미 사용 중인 ID
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
 *                   example: 이미 사용 중인 아이디입니다.
 *       422:
 *         description: 이미 사용 중인 닉네임
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
 */
router.post('/signup', signup);

/**
 * @swagger
 * /api/auth/refreshAccessToken:
 *   post:
 *     summary: 액세스 토큰 갱신
 *     description: 쿠키에 저장된 리프레시 토큰을 사용하여 새로운 액세스 토큰을 발급합니다.
 *     tags: [Auth]
 *     responses:
 *       200:
 *         description: 토큰 갱신 성공
 *         headers:
 *           Set-Cookie:
 *             schema:
 *               type: string
 *               description: 새로운 리프레시 토큰이 발급된 경우 갱신된 쿠키
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
 *                   example: 토큰이 갱신되었습니다.
 *                 data:
 *                   type: object
 *                   properties:
 *                     accessToken:
 *                       type: string
 *                       description: 새로운 JWT 액세스 토큰
 *       400:
 *         description: 리프레시 토큰 없음
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
 *                   example: 토큰이 필요합니다.
 *       410:
 *         description: 유효하지 않은 리프레시 토큰
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
 *                   example: 유효하지 않은 리프레시 토큰입니다.
 */
router.post('/refreshAccessToken', refreshAccessToken);

/**
 * @swagger
 * /api/auth/logout:
 *   post:
 *     summary: 로그아웃
 *     description: 리프레시 토큰을 삭제하고 쿠키를 제거합니다.
 *     tags: [Auth]
 *     responses:
 *       200:
 *         description: 로그아웃 성공
 *         headers:
 *           Set-Cookie:
 *             schema:
 *               type: string
 *               description: 리프레시 토큰 쿠키 제거
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
 *                   example: 로그아웃에 성공했습니다.
 */
router.post('/logout', logout);

export default router;
