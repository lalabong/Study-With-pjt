import jwt from 'jsonwebtoken';
import { Request, Response, NextFunction } from 'express';
import { AuthRequest, UserPayload } from '../types/index.js';
import { createErrorResponse } from '../utils/responseUtils.js';
import { AUTH_ERROR } from '../constants/index.js';

const authMiddleware = (req: Request, res: Response, next: NextFunction): void => {
  try {
    const authHeader = req.headers.authorization;

    if (!authHeader) {
      createErrorResponse(res, 401, AUTH_ERROR.UNAUTHORIZED);
      return;
    }

    if (!authHeader.startsWith('Bearer ')) {
      createErrorResponse(res, 401, AUTH_ERROR.INVALID_TOKEN);
      return;
    }

    const token = authHeader.split(' ')[1];

    if (!token) {
      createErrorResponse(res, 401, AUTH_ERROR.UNAUTHORIZED);
      return;
    }

    const decoded = jwt.verify(token, process.env.JWT_SECRET as string) as UserPayload;

    (req as AuthRequest).user = decoded;

    next();
  } catch (error) {
    if (error instanceof Error) {
      if (error.name === 'TokenExpiredError') {
        createErrorResponse(res, 401, AUTH_ERROR.TOKEN_EXPIRED);
        return;
      }

      if (error.name === 'JsonWebTokenError') {
        createErrorResponse(res, 401, AUTH_ERROR.INVALID_TOKEN);
        return;
      }
    }

    next(error);
  }
};

export default authMiddleware;
