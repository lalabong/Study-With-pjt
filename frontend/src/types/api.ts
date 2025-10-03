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

export type FriendStatus = 'pending_sent' | 'pending_received' | 'accepted';

export interface FriendUser {
  id: string;
  userId: string;
  nickname: string;
  profileImg: string | null;
}

export interface SearchedUser extends FriendUser {
  status: FriendStatus | null;
}

export interface ReceivedFriendRequest {
  userCuid: string;
  status: 'pending';
  user: FriendUser;
}

// 페이지네이션 공통 인터페이스
export interface Pagination {
  currentPage: number;
  totalPages: number;
  totalItems: number;
  hasNextPage: boolean;
  hasPrevPage: boolean;
}

// 페이지네이션이 포함된 데이터 응답
export interface PaginatedResponse<T> {
  items: T[];
  pagination: Pagination;
}
