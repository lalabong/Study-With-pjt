import { MYPAGE_ENDPOINTS } from '@/constants';
import { ApiResponse, UserScheduleResponse } from '@/types/api';

import { axiosInstance } from '../axiosInstance';

export const getUserSchedules = async (
  userId: string,
): Promise<ApiResponse<UserScheduleResponse>> => {
  const response = await axiosInstance.get(MYPAGE_ENDPOINTS.GET_USER_SCHEDULES(userId));
  console.log('사용자 일정 조회 응답:', response.data);

  return response.data;
};
