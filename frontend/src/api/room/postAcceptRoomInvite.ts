import { axiosInstance } from '@api/axiosInstance';

import { ROOM_ENDPOINTS } from '@constants/api';

import { ApiResponse } from '@/types/api';

import { Room } from './postCreateRoom';

interface AcceptRoomInviteResponse {
  room: Room;
}

export const postAcceptRoomInvite = async (
  inviteId: string,
): Promise<ApiResponse<AcceptRoomInviteResponse>> => {
  const response = await axiosInstance.post(ROOM_ENDPOINTS.ACCEPT_INVITE(inviteId));
  console.log('방 초대 수락 응답:', response.data);

  return response.data;
};
