import { axiosInstance } from '@api/axiosInstance';

import { ROOM_ENDPOINTS } from '@constants/api';

import { ApiResponse } from '@/types/api';

export const postDeclineRoomInvite = async (inviteId: string): Promise<ApiResponse<void>> => {
  const response = await axiosInstance.post(ROOM_ENDPOINTS.DECLINE_INVITE(inviteId));
  console.log('방 초대 거절 응답:', response.data);

  return response.data;
};
