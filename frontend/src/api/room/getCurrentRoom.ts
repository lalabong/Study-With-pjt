import { axiosInstance } from '@api/axiosInstance';

import { ROOM_ENDPOINTS } from '@constants/api';

import { ApiResponse } from '@/types/api';

interface Room {
  id: string;
  name: string;
  createdAt: string;
  ownerCuid: string;
}

interface GetCurrentRoomResponse {
  currentRoom: Room | null;
}

export const getCurrentRoom = async (): Promise<ApiResponse<GetCurrentRoomResponse>> => {
  const response = await axiosInstance.get(ROOM_ENDPOINTS.CURRENT);
  return response.data;
};
