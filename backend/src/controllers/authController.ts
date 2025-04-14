import bcrypt from 'bcrypt';
import jwt from 'jsonwebtoken';
import { Request, Response, NextFunction } from 'express';

import prisma from '../lib/prisma.js';
import { ControllerFn, UserPayload, SafeUser, ApiResponse, User } from '../types/index.js';

declare module 'jsonwebtoken' {
  export interface JwtPayload extends UserPayload {}
}

const createErrorResponse = (res: Response, status: number, message: string): void => {
  const errorResponse: ApiResponse<null> = {
    status: 'error',
    message,
  };
  res.status(status).json(errorResponse);
};

const createSuccessResponse = <T>(
  res: Response,
  status: number,
  data?: T,
  message?: string,
  extras: Record<string, any> = {}
): void => {
  const response: ApiResponse<T, typeof extras> = {
    status: 'success',
    ...(data !== undefined && { data }),
    ...(message !== undefined && { message }),
    ...extras,
  };
  res.status(status).json(response);
};

const generateToken = (payload: UserPayload): string => {
  const jwtSecret = process.env.JWT_SECRET;
  if (!jwtSecret) {
    throw new Error('JWT_SECRET이 설정되지 않았습니다.');
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
      createErrorResponse(res, 401, '사용자명 또는 비밀번호가 올바르지 않습니다.');
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

    createSuccessResponse(res, 200, undefined, undefined, { token, user: safeUser });
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
      createErrorResponse(res, 400, '모든 필수 정보를 입력해주세요.');
      return;
    }

    const userIdExists = await checkUserExists('userId', userId);
    if (userIdExists) {
      createErrorResponse(res, 400, '이미 사용 중인 아이디입니다.');
      return;
    }

    const nicknameExists = await checkUserExists('nickname', nickname);
    if (nicknameExists) {
      createErrorResponse(res, 400, '이미 사용 중인 닉네임입니다.');
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

    createSuccessResponse(res, 201, undefined, '회원가입이 완료되었습니다.', {
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
