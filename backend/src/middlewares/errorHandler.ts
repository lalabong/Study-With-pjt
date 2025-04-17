import { Request, Response, NextFunction } from 'express';
import { createErrorResponse } from '../utils/responseUtils.js';
import { SERVER_ERROR } from '../constants/index.js';

interface AppError extends Error {
  statusCode?: number;
}

const errorHandler = (err: AppError, req: Request, res: Response, _next: NextFunction): void => {
  console.error('Error:', err.message);
  console.error('Stack:', err.stack);

  const statusCode = err.statusCode || 500;
  const message = err.message || SERVER_ERROR.INTERNAL_ERROR;

  if (process.env.NODE_ENV === 'development') {
    res.status(statusCode).json({
      status: 'error',
      message,
      stack: err.stack,
    });
    return;
  }

  createErrorResponse(res, statusCode, message);
};

export default errorHandler;
