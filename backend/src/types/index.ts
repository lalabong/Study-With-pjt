import { Request, RequestHandler } from 'express';

// 사용자 관련 기본 타입 (공통 필드)
export interface BaseUser {
  id: string;
  userId: string;
  nickname: string;
  profileImg?: string | null;
  totalStudyTime?: number;
}

// 사용자 인증/토큰용 타입
export interface UserPayload {
  id: string;
  userId: string;
  createdAt: Date | null;
}

export interface AuthRequest extends Request {
  user?: UserPayload;
}

// DB 저장용 사용자 타입 (비밀번호와 Date 타입 createdAt 포함)
export interface User extends BaseUser {
  password: string;
  createdAt: Date | null;
}

// 클라이언트 반환용 사용자 타입 (비밀번호 제외, 문자열 타입 createdAt)
export interface SafeUser extends BaseUser {
  createdAt: string | null;
}

// 스터디룸 관련 타입
export interface Room {
  id: string;
  name: string;
  ownerId: string;
  createdAt?: Date | null;
}

export interface RoomUser {
  id: string;
  roomId: string;
  userId: string;
  joinedAt?: Date | null;
  createdAt?: Date | null;
}

// 일정 및 시간 관련 타입
export interface Schedule {
  id: string;
  userId: string;
  title: string;
  startTime: Date;
  endTime: Date;
  order: number;
  status: string;
  createdAt?: Date | null;
}

export interface TimeLog {
  id: string;
  userId: string;
  roomId: string;
  totalTime: Date;
  date: Date;
  createdAt?: Date | null;
}

// 관계 타입
export interface Friend {
  userId: string;
  friendId: string;
  createdAt?: Date | null;
}

export type ApiResponse<T, E extends Record<string, unknown> = Record<string, unknown>> = {
  status: 'success' | 'error';
  message?: string;
  data?: T;
} & E;

// 컨트롤러 타입
export type ControllerFn = RequestHandler;

export interface LoginRequest {
  userId: string;
  password: string;
}

export interface SignupRequest extends LoginRequest {
  nickname: string;
}
