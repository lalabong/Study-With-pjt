import { axiosInstance } from '@api/axiosInstance';

import { MYPAGE_ENDPOINTS } from '@constants/api';

import { ApiResponse, Schedule } from '@/types/api';

export interface UserScheduleResponse {
  schedules: Schedule[];
}

export const getUserSchedules = async (
  userId: string,
): Promise<ApiResponse<UserScheduleResponse>> => {
  const response = await axiosInstance.get(MYPAGE_ENDPOINTS.GET_USER_SCHEDULES(userId));
  console.log('사용자 일정 조회 응답:', response.data);

  return response.data;
};
