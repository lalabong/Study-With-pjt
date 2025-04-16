import jwt from 'jsonwebtoken';
import prisma from '../lib/prisma.js';
import { UserPayload } from '../types/index.js';
import { AUTH_ERROR } from '../constants/index.js';

export const generateAccessToken = (payload: UserPayload): string => {
  const accessTokenSecret = process.env.ACCESS_TOKEN_SECRET;
  if (!accessTokenSecret) {
    throw new Error(AUTH_ERROR.ACCESS_TOKEN_SECRET_MISSING);
  }
  return jwt.sign(payload, accessTokenSecret, { expiresIn: '1h' });
};

export const generateRefreshToken = (payload: UserPayload): string => {
  const refreshSecret = process.env.REFRESH_TOKEN_SECRET;
  if (!refreshSecret) {
    throw new Error(AUTH_ERROR.REFRESH_SECRET_MISSING);
  }
  return jwt.sign(payload, refreshSecret, { expiresIn: '14d' });
};

export const saveRefreshToken = async (userId: number, token: string): Promise<void> => {
  await prisma.refreshToken.deleteMany({
    where: { userId },
  });

  const expiresAt = new Date();
  expiresAt.setDate(expiresAt.getDate() + 14);

  await prisma.refreshToken.create({
    data: {
      token,
      userId,
      expiresAt,
    },
  });
};

export const verifyRefreshToken = async (token: string): Promise<UserPayload | null> => {
  try {
    const refreshSecret = process.env.REFRESH_TOKEN_SECRET;
    if (!refreshSecret) {
      throw new Error(AUTH_ERROR.REFRESH_SECRET_MISSING);
    }

    // 유효(존재)한 리프레시 토큰인지 확인
    const tokenRecord = await prisma.refreshToken.findUnique({
      where: { token },
    });

    if (!tokenRecord) {
      return null;
    }

    // 만료된 리프레시 토큰인지 확인 -> 만료됐으면 삭제
    if (new Date() > tokenRecord.expiresAt) {
      await prisma.refreshToken.delete({
        where: { id: tokenRecord.id },
      });
      return null;
    }

    const payload = jwt.verify(token, refreshSecret) as UserPayload;
    return payload; // 토큰에 담긴 사용자 정보 반환
  } catch (error) {
    return null;
  }
};

export const deleteRefreshToken = async (token: string): Promise<boolean> => {
  try {
    await prisma.refreshToken.deleteMany({
      where: { token },
    });
    return true;
  } catch (error) {
    return false;
  }
};

export const verifyAccessToken = (token: string): UserPayload | null => {
  try {
    const accessTokenSecret = process.env.ACCESS_TOKEN_SECRET;
    if (!accessTokenSecret) {
      throw new Error(AUTH_ERROR.ACCESS_TOKEN_SECRET_MISSING);
    }

    const payload = jwt.verify(token, accessTokenSecret) as UserPayload;
    return payload;
  } catch (error) {
    return null;
  }
};
