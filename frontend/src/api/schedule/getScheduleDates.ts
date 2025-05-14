import { axiosInstance } from '@api/axiosInstance';

import { SCHEDULE_ENDPOINTS } from '@constants/api';

import { ApiResponse } from '@/types/api';

interface GetScheduleDatesRequest {
  userId: string;
  startDate: string;
  endDate: string;
}

interface GetScheduleDatesResponse {
  scheduleDates: string[];
}

// 일정이 있는 날짜들들 조회
export const getScheduleDates = async (
  data: GetScheduleDatesRequest,
): Promise<ApiResponse<GetScheduleDatesResponse>> => {
  const { userId, startDate, endDate } = data;

  const response = await axiosInstance.get(
    SCHEDULE_ENDPOINTS.GET_SCHEDULE_DATES(userId, startDate, endDate),
  );
  console.log('일정 날짜 조회 응답:', response.data);

  return response.data;
};
