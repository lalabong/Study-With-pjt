import { useInfiniteQuery } from '@tanstack/react-query';

import { getRoomChatMessages, GetRoomChatMessagesRequest } from '@api/room/getRoomChatMessages';

import { ROOM_QUERY_KEYS } from '@/constants/queryKeys';
import { ApiResponse, PaginatedResponse } from '@/types/api';
import { ChatMessageData } from '@/types/websocket';

export const useInfiniteRoomChatMessagesQuery = (
  roomId: string,
  params: Omit<GetRoomChatMessagesRequest, 'page'> = {},
  enabled: boolean = true,
) => {
  return useInfiniteQuery<ApiResponse<PaginatedResponse<ChatMessageData>>, Error>({
    queryKey: [ROOM_QUERY_KEYS.CHAT_MESSAGES, roomId, params],
    queryFn: ({ pageParam }) =>
      getRoomChatMessages(roomId, { ...params, page: pageParam as number }),
    initialPageParam: 1,
    enabled: enabled && !!roomId,
    getNextPageParam: (lastPage: ApiResponse<PaginatedResponse<ChatMessageData>>) => {
      if (!lastPage.data?.pagination) return undefined;
      const { hasNextPage, currentPage } = lastPage.data.pagination;
      return hasNextPage ? currentPage + 1 : undefined;
    },
    getPreviousPageParam: (firstPage: ApiResponse<PaginatedResponse<ChatMessageData>>) => {
      if (!firstPage.data?.pagination) return undefined;
      const { hasPrevPage, currentPage } = firstPage.data.pagination;
      return hasPrevPage ? currentPage - 1 : undefined;
    },
    staleTime: 30 * 1000, // 30초
    gcTime: 5 * 60 * 1000, // 5분
    retry: (failureCount, error: unknown) => {
      // 403 오류 (권한 없음)인 경우 재시도하지 않음
      if ((error as unknown as { response?: { status?: number } })?.response?.status === 403) {
        return false;
      }
      // 다른 오류는 최대 3번 재시도
      return failureCount < 3;
    },
    retryDelay: (attemptIndex) => Math.min(1000 * 2 ** attemptIndex, 30000), // 지수 백오프
  });
};
