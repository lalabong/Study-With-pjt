import { axiosInstance } from '@api/axiosInstance';

import { SCHEDULE_ENDPOINTS } from '@constants/api';

import { ApiResponse, Schedule } from '@/types/api';

interface GetTopRunningScheduleRequest {
  userId: string;
  date: string;
}

interface GetTopRunningScheduleResponse {
  topRunningSchedule: Pick<Schedule, 'title'> | null;
}

// 사용자의 특정 날짜에서 진행중인 최상단 일정 조회
const getTopRunningSchedule = async (
  data: GetTopRunningScheduleRequest,
): Promise<ApiResponse<GetTopRunningScheduleResponse>> => {
  const { userId, date } = data;

  const response = await axiosInstance.get(
    SCHEDULE_ENDPOINTS.GET_TOP_RUNNING_SCHEDULE(userId, date),
  );
  console.log('최상단 진행중 일정 조회 응답:', response.data);

  return response.data;
};

export default getTopRunningSchedule;
