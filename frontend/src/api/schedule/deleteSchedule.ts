import { axiosInstance } from '@api/axiosInstance';

import { SCHEDULE_ENDPOINTS } from '@constants/api';

import { ApiResponse, Schedule } from '@/types/api';

interface DeleteScheduleRequest {
  scheduleId: string;
}

interface DeleteScheduleResponse {
  deletedSchedule: Schedule;
}

export const deleteSchedule = async (
  data: DeleteScheduleRequest,
): Promise<ApiResponse<DeleteScheduleResponse>> => {
  const { scheduleId } = data;

  const response = await axiosInstance.delete(
    SCHEDULE_ENDPOINTS.UPDATE_AND_DELETE_SCHEDULE(scheduleId),
  );
  console.log('일정 삭제 응답:', response.data);

  return response.data;
};
