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

export const verifyRefreshToken = async (token: string): Promise<{ payload: UserPayload | null, newToken?: string }> => {
  try {
    const refreshSecret = process.env.REFRESH_TOKEN_SECRET;
    if (!refreshSecret) {
      throw new Error(AUTH_ERROR.REFRESH_SECRET_MISSING);
    }

    const tokenRecord = await prisma.refreshToken.findUnique({
      where: { token },
      include: { user: true }
    });

    if (!tokenRecord) {
      return { payload: null };
    }

    if (new Date() > tokenRecord.expiresAt) {
      await prisma.refreshToken.delete({
        where: { id: tokenRecord.id },
      });
      return { payload: null };
    }

    const payload = jwt.verify(token, refreshSecret) as UserPayload;

    const sevenDaysFromNow = new Date();
    sevenDaysFromNow.setDate(sevenDaysFromNow.getDate() + 7);
    
    if (tokenRecord.expiresAt < sevenDaysFromNow) {
      const newToken = generateRefreshToken(payload);
      await saveRefreshToken(tokenRecord.user.id, newToken);
      
      await prisma.refreshToken.delete({
        where: { id: tokenRecord.id }
      });
      
      return { payload, newToken };
    }

    const userTokens = await prisma.refreshToken.findMany({
      where: { userId: tokenRecord.user.id },
      orderBy: { createdAt: 'desc' }
    });

    if (userTokens.length > 3) {
      const tokensToDelete = userTokens.slice(3); // 배열의 인덱스 3부터 끝까지의 요소들들 추출
      await prisma.refreshToken.deleteMany({
        where: {
          id: {
            in: tokensToDelete.map(t => t.id)
          }
        }
      });
    }

    return { payload };
  } catch (error) {
    return { payload: null };
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
