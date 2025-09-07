import { axiosInstance } from '@api/axiosInstance';

import { ROOM_ENDPOINTS } from '@constants/api';

import { ApiResponse } from '@/types/api';

export interface RoomInfo {
  id: string;
  name: string;
  createdAt: string;
  ownerCuid: string;
}

interface GetRoomInfoRequest {
  roomId: string;
}

interface GetRoomInfoResponse {
  room: RoomInfo;
}

export const getRoomInfo = async (
  data: GetRoomInfoRequest,
): Promise<ApiResponse<GetRoomInfoResponse>> => {
  const { roomId } = data;

  const response = await axiosInstance.get(ROOM_ENDPOINTS.GET_ROOM_INFO(roomId));
  console.log('방 정보 조회 응답:', response.data);

  return response.data;
};
