import { axiosInstance } from '@api/axiosInstance';

import { ROOM_ENDPOINTS } from '@constants/api';

import { ApiResponse } from '@/types/api';

interface LeaveRoomRequest {
  roomId: string;
}

interface LeaveRoomResponse {
  roomDeleted: boolean;
}

export const deleteLeaveRoom = async (
  data: LeaveRoomRequest,
): Promise<ApiResponse<LeaveRoomResponse>> => {
  const { roomId } = data;

  const response = await axiosInstance.delete(ROOM_ENDPOINTS.LEAVE_ROOM(roomId));
  console.log('방 나가기 응답:', response.data);

  return response.data;
};
