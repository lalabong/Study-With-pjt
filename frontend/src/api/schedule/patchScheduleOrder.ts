import { axiosInstance } from '@api/axiosInstance';

import { SCHEDULE_ENDPOINTS } from '@constants/api';

import { ApiResponse, Schedule } from '@/types/api';

interface PatchScheduleOrderRequest {
  scheduleId: string;
  targetPosition: number;
}

interface PatchScheduleOrderResponse {
  schedule: Schedule;
}

export const patchScheduleOrder = async (
  data: PatchScheduleOrderRequest,
): Promise<ApiResponse<PatchScheduleOrderResponse>> => {
  const { scheduleId, targetPosition } = data;

  const response = await axiosInstance.patch(SCHEDULE_ENDPOINTS.UPDATE_SCHEDULE_ORDER(scheduleId), {
    targetPosition,
  });
  console.log('일정 순서 변경 응답:', response.data);

  return response.data;
};
