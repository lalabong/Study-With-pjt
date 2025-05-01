import { User } from '@stores/authStore';

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

export interface Schedule {
  id: number;
  userId: string;
  createdAt: string;
  title: string;
  startTime: string;
  endTime: string;
  status: string;
}

export interface TimeRecord {
  hours: number;
  minutes: number;
  decimalHours: number;
}

export interface WeeklyTimeLog {
  date: string;
  hours: number;
  minutes: number;
  decimalHours: number;
}

export interface MonthlyTimeLog {
  month: string;
  totalTime: TimeRecord;
}

export interface PeriodInfo {
  startDate: string;
  endDate: string;
}

export interface TimeLogsResponse {
  totalTime: TimeRecord;
  periodInfo: PeriodInfo;
  weeklyData?: WeeklyTimeLog[];
  monthlyData?: MonthlyTimeLog[];
}
