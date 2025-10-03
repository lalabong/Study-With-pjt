import { ROOM_ENDPOINTS } from '@/constants/api';
import { ApiResponse, PaginatedResponse } from '@/types/api';
import { ChatMessageData } from '@/types/websocket';

import { axiosInstance } from '../axiosInstance';

export interface GetRoomChatMessagesRequest {
  page?: number;
  limit?: number;
}

// 방의 채팅 메시지 목록 조회 (페이지네이션)
export const getRoomChatMessages = async (
  roomId: string,
  params: GetRoomChatMessagesRequest = {},
): Promise<ApiResponse<PaginatedResponse<ChatMessageData>>> => {
  const response = await axiosInstance.get(ROOM_ENDPOINTS.GET_ROOM_CHAT_MESSAGES(roomId), {
    params,
  });
  return response.data;
};
