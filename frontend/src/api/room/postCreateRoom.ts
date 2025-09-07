import { axiosInstance } from '@api/axiosInstance';

import { ROOM_ENDPOINTS } from '@constants/api';

import { ApiResponse } from '@/types/api';

export interface CreateRoomRequest {
  name: string;
}

export interface Room {
  id: string;
  name: string;
  ownerCuid: string;
  createdAt: string;
}

interface CreateRoomResponse {
  room: Room;
}

export const postCreateRoom = async (
  data: CreateRoomRequest,
): Promise<ApiResponse<CreateRoomResponse>> => {
  const response = await axiosInstance.post(ROOM_ENDPOINTS.CREATE_ROOM, data);
  console.log('방 생성 응답:', response.data);

  return response.data;
};
