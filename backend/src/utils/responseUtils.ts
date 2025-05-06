import { Response } from 'express';
import { ApiResponse } from '../types/index.js';

/**
 * @param res Express 응답 객체
 * @param status HTTP 상태 코드
 * @param message 에러 메시지
 * @param errorCode 오류 코드 (옵션)
 */
export const createErrorResponse = (res: Response, status: number, message: string, errorCode?: number): void => {
  const errorResponse: ApiResponse<null> & { errorCode?: number } = {
    status: 'error',
    message,
  };
  
  if (errorCode) {
    errorResponse.errorCode = errorCode;
  }
  
  res.status(status).json(errorResponse);
};

/**
 * @param res Express 응답 객체
 * @param status HTTP 상태 코드
 * @param data 응답 데이터 (옵션)
 * @param message 성공 메시지 (옵션)
 * @param extras 추가 필드 (옵션)
 */
export const createSuccessResponse = <T>(
  res: Response,
  status: number,
  data?: T,
  message?: string,
  extras: Record<string, unknown> = {}
): void => {
  const response: ApiResponse<T, typeof extras> = {
    status: 'success',
    ...(data !== undefined && { data }),
    ...(message !== undefined && { message }),
    ...extras,
  };
  res.status(status).json(response);
};