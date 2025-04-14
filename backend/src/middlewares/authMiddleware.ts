import jwt from 'jsonwebtoken';
import { Request, Response, NextFunction } from 'express';
import { AuthRequest, UserPayload } from '../types/index.js';

const authMiddleware = (
  req: Request, 
  res: Response, 
  next: NextFunction
): void => {
  try {
    const authHeader = req.headers.authorization;

    if (!authHeader) {
      res.status(401).json({
        status: 'error',
        message: '인증 헤더가 제공되지 않았습니다.',
      });
      return;
    }

    if (!authHeader.startsWith('Bearer ')) {
      res.status(401).json({
        status: 'error',
        message: '유효한 인증 형식이 아닙니다. Bearer 토큰이 필요합니다.',
      });
      return;
    }

    const token = authHeader.split(' ')[1];

    if (!token) {
      res.status(401).json({
        status: 'error',
        message: '인증 토큰이 제공되지 않았습니다.',
      });
      return;
    }

    const decoded = jwt.verify(token, process.env.JWT_SECRET as string) as UserPayload;

    (req as AuthRequest).user = decoded;

    next();
  } catch (error) {
    if (error instanceof Error) {
      if (error.name === 'TokenExpiredError') {
        res.status(401).json({
          status: 'error',
          message: '토큰이 만료되었습니다.',
        });
        return;
      }

      if (error.name === 'JsonWebTokenError') {
        res.status(401).json({
          status: 'error',
          message: '유효하지 않은 토큰입니다.',
        });
        return;
      }
    }

    next(error);
  }
};

export default authMiddleware; 