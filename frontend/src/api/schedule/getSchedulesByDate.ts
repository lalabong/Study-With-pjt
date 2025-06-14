import { axiosInstance } from '@api/axiosInstance';

import { SCHEDULE_ENDPOINTS } from '@constants/api';

import { ApiResponse, Schedule } from '@/types/api';

interface GetSchedulesByDateRequest {
  userId: string;
  date: string;
}

interface GetSchedulesByDateResponse {
  schedules: Schedule[];
}

// 특정 날짜의 일정들 조회
const getSchedulesByDate = async (
  data: GetSchedulesByDateRequest,
): Promise<ApiResponse<GetSchedulesByDateResponse>> => {
  const { userId, date } = data;

  const response = await axiosInstance.get(SCHEDULE_ENDPOINTS.GET_SCHEDULES_BY_DATE(userId, date));
  console.log('특정 날짜 일정 조회 응답:', response.data);

  return response.data;
};

export default getSchedulesByDate;
