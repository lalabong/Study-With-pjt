import { axiosInstance } from '@api/axiosInstance';

import { SCHEDULE_ENDPOINTS } from '@constants/api';

import { ApiResponse, Schedule } from '@/types/api';

interface PostScheduleRequest {
  title: string;
  startTime: Date;
  endTime: Date;
}

interface PostScheduleResponse {
  schedule: Schedule;
}

export const postSchedule = async (
  data: PostScheduleRequest,
): Promise<ApiResponse<PostScheduleResponse>> => {
  const { title, startTime, endTime } = data;

  const requestData = {
    title,
    startTime: startTime.toISOString(),
    endTime: endTime.toISOString(),
  };

  const response = await axiosInstance.post(SCHEDULE_ENDPOINTS.CREATE_SCHEDULE, requestData);
  console.log('일정 생성 응답:', response.data);

  return response.data;
};
