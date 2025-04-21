import { Request, RequestHandler } from 'express';

// 사용자 관련 타입
export interface UserPayload {
  id: number;
  userId: string;
  nickname: string;
  createdAt: Date | null;
}

export interface AuthRequest extends Request {
  user?: UserPayload;
}

export interface User {
  id: number;
  userId: string;
  password: string;
  nickname: string;
  profileImg?: string | null;
  createdAt: Date | null;
  totalStudyTime?: number;
}

export type SafeUser = Omit<User, 'password'>;

// 스터디룸 관련 타입
export interface Room {
  id: number;
  name: string;
  ownerId: number;
  createdAt?: Date | null;
}

export interface RoomUser {
  id: number;
  roomId: number;
  userId: number;
  joinedAt?: Date | null;
  createdAt?: Date | null;
}

// 일정 및 시간 관련 타입
export interface Schedule {
  id: number;
  userId: number;
  roomId: number;
  title: string;
  startTime: Date;
  endTime: Date;
  status: string;
  createdAt?: Date | null;
}

export interface TimeLog {
  id: number;
  userId: number;
  roomId: number;
  totalTime: Date;
  date: Date;
  createdAt?: Date | null;
}

// 관계 타입
export interface Friend {
  userId: number;
  friendId: number;
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
