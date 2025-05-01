import { axiosInstance } from '@api/axiosInstance';

import { MYPAGE_ENDPOINTS } from '@constants/api';

import { ApiResponse, TimeLogsResponse } from '@/types/api';

export const getUserTimeLogs = async (
  userId: string,
  period: string = 'week',
  date?: string,
): Promise<ApiResponse<TimeLogsResponse>> => {
  const currentDate = date || new Date().toISOString().split('T')[0];

  const response = await axiosInstance.get(
    MYPAGE_ENDPOINTS.GET_USER_TIMELOGS(userId, period, currentDate),
  );
  console.log('사용자 시간 기록 조회 응답:', response.data);

  return response.data;
};
