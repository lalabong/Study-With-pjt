import { axiosInstance } from '@api/axiosInstance';

import { SCHEDULE_ENDPOINTS } from '@constants/api';

import { ApiResponse, Schedule } from '@/types/api';

interface GetSchedulesRequest {
  userId: string;
  startDate?: string;
  endDate?: string;
}

interface GetSchedulesResponse {
  schedules: Schedule[];
}

export const getSchedules = async (
  data: GetSchedulesRequest,
): Promise<ApiResponse<GetSchedulesResponse>> => {
  const { userId, startDate, endDate } = data;

  const params: Record<string, string> = {};
  if (startDate) params.startDate = startDate;
  if (endDate) params.endDate = endDate;

  const response = await axiosInstance.get(SCHEDULE_ENDPOINTS.GET_USER_SCHEDULES(userId), {
    params,
  });
  console.log('사용자 일정 조회 응답:', response.data);

  return response.data;
};
