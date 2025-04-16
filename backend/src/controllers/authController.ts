import bcrypt from 'bcrypt';
import { Request, Response, NextFunction } from 'express';

import prisma from '../lib/prisma.js';
import {
  ControllerFn,
  UserPayload,
  SafeUser,
  User,
  LoginRequest,
  SignupRequest,
} from '../types/index.js';
import { createErrorResponse, createSuccessResponse } from '../utils/responseUtils.js';
import { AUTH_ERROR, AUTH_SUCCESS } from '../constants/index.js';
import {
  generateAccessToken,
  generateRefreshToken,
  saveRefreshToken,
  verifyRefreshToken,
  deleteRefreshToken,
} from '../utils/tokenUtils.js';

const toSafeUser = (user: User): SafeUser => ({
  id: user.id,
  userId: user.userId,
  nickname: user.nickname,
  profileImg: user.profileImg,
});

const verifyPassword = async (
  userId: string,
  password: string
): Promise<{ user: User | null; isValid: boolean }> => {
  const user = await prisma.user.findUnique({
    where: { userId },
  });

  if (!user) {
    return { user: null, isValid: false };
  }

  const passwordMatch = await bcrypt.compare(password, user.password);
  return { user, isValid: passwordMatch };
};

const login: ControllerFn = async (
  req: Request,
  res: Response,
  next: NextFunction
): Promise<void> => {
  try {
    const { userId, password } = req.body as LoginRequest;

    console.log('로그인 시도:', { userId, passwordProvided: !!password });

    const { user, isValid } = await verifyPassword(userId, password);

    if (!user || !isValid) {
      console.log(user ? '비밀번호 불일치:' : '사용자를 찾을 수 없음:', userId);
      createErrorResponse(res, 401, AUTH_ERROR.INVALID_CREDENTIALS);
      return;
    }

    const tokenPayload: UserPayload = {
      id: user.id,
      userId: user.userId,
      nickname: user.nickname,
    };

    const accessToken = generateAccessToken(tokenPayload);
    const refreshToken = generateRefreshToken(tokenPayload);

    await saveRefreshToken(user.id, refreshToken);

    console.log('로그인 성공:', userId);

    const safeUser = toSafeUser(user);

    res.cookie('refreshToken', refreshToken, {
      httpOnly: true,
      secure: process.env.NODE_ENV === 'production',
      sameSite: 'strict',
      maxAge: 14 * 24 * 60 * 60 * 1000, // 14일
    });

    createSuccessResponse(res, 200, undefined, AUTH_SUCCESS.LOGIN_SUCCESS, {
      accessToken,
      user: safeUser,
    });
  } catch (error: unknown) {
    console.error('로그인 에러:', error);
    next(error);
  }
};

const refreshAccessToken: ControllerFn = async (
  req: Request,
  res: Response,
  next: NextFunction
): Promise<void> => {
  try {
    const refreshToken = req.cookies.refreshToken;

    if (!refreshToken) {
      createErrorResponse(res, 401, AUTH_ERROR.TOKEN_REQUIRED);
      return;
    }

    const payload = await verifyRefreshToken(refreshToken);

    if (!payload) {
      createErrorResponse(res, 401, AUTH_ERROR.INVALID_REFRESH_TOKEN);
      return;
    }

    const accessToken = generateAccessToken(payload);

    createSuccessResponse(res, 200, undefined, AUTH_SUCCESS.TOKEN_REFRESHED, {
      accessToken,
    });
  } catch (error: unknown) {
    console.error('토큰 갱신 에러:', error);
    next(error);
  }
};

const logout: ControllerFn = async (
  req: Request,
  res: Response,
  next: NextFunction
): Promise<void> => {
  try {
    const refreshToken = req.cookies.refreshToken;

    if (refreshToken) {
      await deleteRefreshToken(refreshToken);
    }

    res.clearCookie('refreshToken');

    createSuccessResponse(res, 200, undefined, AUTH_SUCCESS.LOGOUT_SUCCESS);
  } catch (error: unknown) {
    console.error('로그아웃 에러:', error);
    next(error);
  }
};

const hashPassword = async (password: string): Promise<string> => {
  const salt = await bcrypt.genSalt(10);
  return bcrypt.hash(password, salt);
};

const signup: ControllerFn = async (
  req: Request,
  res: Response,
  next: NextFunction
): Promise<void> => {
  try {
    const { userId, password, nickname } = req.body as SignupRequest;

    if (!userId || !password || !nickname) {
      createErrorResponse(res, 400, AUTH_ERROR.REQUIRED_FIELDS);
      return;
    }

    const existingUserId = await prisma.user.findUnique({
      where: { userId },
    });

    if (existingUserId) {
      createErrorResponse(res, 409, AUTH_ERROR.USER_ID_EXISTS);
      return;
    }

    const existingNickname = await prisma.user.findUnique({
      where: { nickname },
    });

    if (existingNickname) {
      createErrorResponse(res, 409, AUTH_ERROR.NICKNAME_EXISTS);
      return;
    }

    const hashedPassword = await hashPassword(password);

    const newUser = await prisma.user.create({
      data: {
        userId,
        password: hashedPassword,
        nickname,
      },
    });

    const tokenPayload: UserPayload = {
      id: newUser.id,
      userId: newUser.userId,
      nickname: newUser.nickname,
    };

    const accessToken = generateAccessToken(tokenPayload);
    const refreshToken = generateRefreshToken(tokenPayload);

    await saveRefreshToken(newUser.id, refreshToken);

    const safeUser = toSafeUser(newUser);

    res.cookie('refreshToken', refreshToken, {
      httpOnly: true,
      secure: process.env.NODE_ENV === 'production',
      sameSite: 'strict',
      maxAge: 14 * 24 * 60 * 60 * 1000, // 14일
    });

    createSuccessResponse(res, 201, undefined, AUTH_SUCCESS.SIGNUP_COMPLETE, {
      accessToken,
      user: safeUser,
    });
  } catch (error: unknown) {
    next(error);
  }
};

export { login, signup, refreshAccessToken, logout, hashPassword };
