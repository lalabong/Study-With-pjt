import { axiosInstance } from '@api/axiosInstance';

import { SCHEDULE_ENDPOINTS } from '@constants/api';

import { ApiResponse, Schedule } from '@/types/api';

interface PatchScheduleRequest {
  scheduleId: string;
  title?: string;
  startTime?: Date;
  endTime?: Date;
  status?: string;
}

interface PatchScheduleResponse {
  schedule: Schedule;
}

export const patchSchedule = async (
  data: PatchScheduleRequest,
): Promise<ApiResponse<PatchScheduleResponse>> => {
  const { scheduleId, ...updateData } = data;

  const response = await axiosInstance.patch(
    SCHEDULE_ENDPOINTS.UPDATE_AND_DELETE_SCHEDULE(scheduleId),
    updateData,
  );
  console.log('일정 수정 응답:', response.data);

  return response.data;
};
