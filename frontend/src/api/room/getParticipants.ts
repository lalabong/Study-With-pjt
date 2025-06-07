import { axiosInstance } from '@api/axiosInstance';

import { ROOM_ENDPOINTS } from '@constants/api';

import { ApiResponse } from '@/types/api';

export interface RoomParticipant {
  id: string;
  userId: string;
  nickname: string;
  profileImg: string | null;
}

interface GetParticipantsRequest {
  roomId: string;
}

interface GetParticipantsResponse {
  participants: RoomParticipant[];
}

export const getParticipants = async (
  data: GetParticipantsRequest,
): Promise<ApiResponse<GetParticipantsResponse>> => {
  const { roomId } = data;

  const response = await axiosInstance.get(ROOM_ENDPOINTS.GET_PARTICIPANTS(roomId));
  console.log('방 참가자 목록 조회 응답:', response.data);

  return response.data;
};
