import bcrypt from 'bcrypt';
import jwt from 'jsonwebtoken';
import { Request, Response, NextFunction } from 'express';

import prisma from '../lib/prisma.js';
import { ControllerFn, UserPayload, SafeUser, User } from '../types/index.js';
import { createErrorResponse, createSuccessResponse } from '../utils/responseUtils.js';
import { AUTH_ERROR, AUTH_SUCCESS } from '../constants/index.js';

const generateToken = (payload: UserPayload): string => {
  const jwtSecret = process.env.JWT_SECRET;
  if (!jwtSecret) {
    throw new Error(AUTH_ERROR.JWT_SECRET_MISSING);
  }
  return jwt.sign(payload, jwtSecret);
};

const toSafeUser = (user: User): SafeUser => ({
  id: user.id,
  userId: user.userId,
  nickname: user.nickname,
  profileImg: user.profileImg,
});

const checkUserExists = async (field: 'userId' | 'nickname', value: string): Promise<boolean> => {
  const where = field === 'userId' ? { userId: value } : { nickname: value };

  const user = await prisma.user.findUnique({
    where,
  });
  return !!user;
};

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
    const { userId, password } = req.body as { userId: string; password: string };

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

    const token = generateToken(tokenPayload);
    console.log('로그인 성공:', userId);

    const safeUser = toSafeUser(user);

    createSuccessResponse(res, 200, undefined, AUTH_SUCCESS.LOGIN_SUCCESS, {
      token,
      user: safeUser,
    });
  } catch (error) {
    console.error('로그인 에러:', error);
    next(error);
  }
};

const signup: ControllerFn = async (
  req: Request,
  res: Response,
  next: NextFunction
): Promise<void> => {
  try {
    const { userId, password, nickname } = req.body as {
      userId: string;
      password: string;
      nickname: string;
    };

    if (!userId || !password || !nickname) {
      createErrorResponse(res, 400, AUTH_ERROR.REQUIRED_FIELDS);
      return;
    }

    const userIdExists = await checkUserExists('userId', userId);
    if (userIdExists) {
      createErrorResponse(res, 400, AUTH_ERROR.USER_ID_EXISTS);
      return;
    }

    const nicknameExists = await checkUserExists('nickname', nickname);
    if (nicknameExists) {
      createErrorResponse(res, 400, AUTH_ERROR.NICKNAME_EXISTS);
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
      userId,
      nickname,
    };

    const token = generateToken(tokenPayload);
    const safeUser = toSafeUser(newUser);

    createSuccessResponse(res, 201, undefined, AUTH_SUCCESS.SIGNUP_COMPLETE, {
      token,
      user: safeUser,
    });
  } catch (error) {
    console.error('회원가입 에러:', error);
    next(error);
  }
};

const hashPassword = async (password: string): Promise<string> => {
  const salt = await bcrypt.genSalt(10);
  return bcrypt.hash(password, salt);
};

export { login, signup, hashPassword };
