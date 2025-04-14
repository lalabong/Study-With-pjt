import { Request, Response, NextFunction } from 'express';

interface AppError extends Error {
  statusCode?: number;
}

const errorHandler = (
  err: AppError, 
  req: Request, 
  res: Response, 
  _next: NextFunction
): void => {
  console.error('Error:', err.message);
  console.error('Stack:', err.stack);

  const statusCode = err.statusCode || 500;
  const message = err.message || '서버 내부 오류가 발생했습니다.';

  res.status(statusCode).json({
    status: 'error',
    message,
    ...(process.env.NODE_ENV === 'development' && { stack: err.stack }),
  });
};

export default errorHandler; 