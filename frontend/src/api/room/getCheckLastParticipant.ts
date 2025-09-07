import { axiosInstance } from '@api/axiosInstance';

import { ROOM_ENDPOINTS } from '@constants/api';

import { ApiResponse } from '@/types/api';

interface CheckLastParticipantRequest {
  roomId: string;
}

interface CheckLastParticipantResponse {
  isLastParticipant: boolean;
  participantCount: number;
}

export const getCheckLastParticipant = async (
  data: CheckLastParticipantRequest,
): Promise<ApiResponse<CheckLastParticipantResponse>> => {
  const { roomId } = data;

  const response = await axiosInstance.get(ROOM_ENDPOINTS.CHECK_LAST_PARTICIPANT(roomId));
  console.log('마지막 참여자 확인 응답:', response.data);

  return response.data;
};
