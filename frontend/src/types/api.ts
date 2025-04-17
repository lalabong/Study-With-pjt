import { User } from '@/stores/authStore';

export type ApiResponse<T, E extends Record<string, unknown> = Record<string, unknown>> = {
  status: 'success' | 'error';
  message?: string;
  data?: T;
} & E;

export interface LoginRequest {
  userId: string;
  password: string;
}

export interface SignupRequest extends LoginRequest {
  nickname: string;
}

export interface LoginResponse {
  accessToken: string;
  user: User;
}
