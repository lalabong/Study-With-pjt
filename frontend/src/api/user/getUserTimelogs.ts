import { axiosInstance } from '@api/axiosInstance';

import { MYPAGE_ENDPOINTS } from '@constants/api';

import { ApiResponse, MonthlyTimeLog, PeriodInfo, TimeRecord, WeeklyTimeLog } from '@/types/api';

interface GetUserTimeLogsRequest {
  userId: string;
  period?: string;
  date?: string;
}

export interface TimeLogsResponse {
  totalTime: TimeRecord;
  periodInfo: PeriodInfo;
  weeklyData?: WeeklyTimeLog[];
  monthlyData?: MonthlyTimeLog[];
}

export const getUserTimeLogs = async (
  data: GetUserTimeLogsRequest,
): Promise<ApiResponse<TimeLogsResponse>> => {
  const { userId, period, date } = data;

  const currentDate = date || new Date().toISOString().split('T')[0];

  const response = await axiosInstance.get(
    MYPAGE_ENDPOINTS.GET_USER_TIMELOGS(userId, period, currentDate),
  );
  console.log('사용자 시간 기록 조회 응답:', response.data);

  return response.data;
};
