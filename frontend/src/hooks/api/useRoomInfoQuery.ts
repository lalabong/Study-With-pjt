'use client';

import { useEffect } from 'react';

import { useQuery } from '@tanstack/react-query';
import { AxiosError } from 'axios';
import { toast } from 'react-toastify';

import { getRoomInfo } from '@api/room/getRoomInfo';

import { ROOM_ERROR_MESSAGES, USER_ERROR_MESSAGES, ROOM_QUERY_KEYS } from '@constants/index';

interface UseRoomInfoQueryParams {
  roomId: string;
  enabled?: boolean;
}

export const useRoomInfoQuery = ({ roomId, enabled = true }: UseRoomInfoQueryParams) => {
  const query = useQuery({
    queryKey: [ROOM_QUERY_KEYS.ROOM_INFO, roomId],
    queryFn: async () => {
      const response = await getRoomInfo({ roomId });
      return response.data;
    },
    enabled: !!roomId && enabled,
    refetchOnWindowFocus: false,
    staleTime: 300000,
    gcTime: 600000,
  });

  useEffect(() => {
    if (query.error) {
      const error = query.error as AxiosError<{ errorCode?: number }>;
      const errorCode = error.response?.data?.errorCode;

      switch (errorCode) {
        case 3006:
          toast.error(USER_ERROR_MESSAGES.UNAUTHORIZED);
          break;
        case 5001:
          toast.error(ROOM_ERROR_MESSAGES.ROOM_NOT_FOUND);
          break;
        default:
          toast.error(ROOM_ERROR_MESSAGES.FETCH_ROOM_INFO_FAILED);
          console.error('방 정보 조회 중 오류 발생:', error);
      }
    }
  }, [query.error]);

  return query;
};
