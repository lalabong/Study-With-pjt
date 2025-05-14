export type ApiResponse<T, E extends Record<string, unknown> = Record<string, unknown>> = {
  status: 'success' | 'error';
  message?: string;
  data?: T;
  errorCode?: number;
} & E;

export type ScheduleStatus = '대기중' | '진행중' | '완료' | '취소';

export interface Schedule {
  id: string;
  userCuid: string;
  createdAt: string;
  title: string;
  date: string;
  startTime?: string;
  endTime?: string;
  status: ScheduleStatus;
  order: number;
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
