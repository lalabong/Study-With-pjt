import { axiosInstance } from '@api/axiosInstance';

import { MYPAGE_ENDPOINTS } from '@constants/api';

import { ApiResponse, Schedule } from '@/types/api';

interface UserScheduleRequest {
  userId: string;
  startDate?: string;
  endDate?: string;
}

interface UserScheduleResponse {
  schedules: Schedule[];
}

export const getUserSchedules = async (
  data: UserScheduleRequest,
): Promise<ApiResponse<UserScheduleResponse>> => {
  const { userId, startDate, endDate } = data;
  const url = MYPAGE_ENDPOINTS.GET_USER_SCHEDULES(userId);

  const params: Record<string, string> = {};
  if (startDate) params.startDate = startDate;
  if (endDate) params.endDate = endDate;

  const response = await axiosInstance.get(url, { params });
  console.log('사용자 일정 조회 응답:', response.data);

  return response.data;
};
