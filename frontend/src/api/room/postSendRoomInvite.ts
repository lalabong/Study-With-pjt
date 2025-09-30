import { axiosInstance } from '@api/axiosInstance';

import { ROOM_ENDPOINTS } from '@constants/api';

import { ApiResponse } from '@/types/api';

export interface SendRoomInviteRequest {
  inviteeCuid: string;
}

export const postSendRoomInvite = async (
  roomId: string,
  data: SendRoomInviteRequest,
): Promise<ApiResponse<void>> => {
  const response = await axiosInstance.post(ROOM_ENDPOINTS.SEND_INVITE(roomId), data);
  console.log('방 초대 전송 응답:', response.data);

  return response.data;
};
