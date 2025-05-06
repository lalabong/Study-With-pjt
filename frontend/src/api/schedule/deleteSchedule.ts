import { axiosInstance } from '@api/axiosInstance';

import { SCHEDULE_ENDPOINTS } from '@constants/api';

import { ApiResponse } from '@/types/api';

interface DeleteScheduleRequest {
  scheduleId: string;
}

export const deleteSchedule = async (data: DeleteScheduleRequest): Promise<ApiResponse<null>> => {
  const { scheduleId } = data;

  const response = await axiosInstance.delete(
    SCHEDULE_ENDPOINTS.UPDATE_AND_DELETE_SCHEDULE(scheduleId),
  );
  console.log('일정 삭제 응답:', response.data);

  return response.data;
};
