'use client';

import { useEffect } from 'react';

import { useQuery } from '@tanstack/react-query';
import { AxiosError } from 'axios';
import { toast } from 'react-toastify';

import { getParticipants } from '@api/room/getParticipants';

import { ROOM_ERROR_MESSAGES, USER_ERROR_MESSAGES, ROOM_QUERY_KEYS } from '@constants/index';

interface UseRoomParticipantsQueryParams {
  roomId: string;
  enabled?: boolean;
}

export const useRoomParticipantsQuery = ({
  roomId,
  enabled = true,
}: UseRoomParticipantsQueryParams) => {
  const query = useQuery({
    queryKey: [ROOM_QUERY_KEYS.ROOM_PARTICIPANTS, roomId],
    queryFn: async () => {
      const response = await getParticipants({ roomId });
      return response.data;
    },
    enabled: !!roomId && enabled,
    refetchOnWindowFocus: false,
    staleTime: 30000, // 30초 동안 데이터를 신선하다고 간주
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
          toast.error(ROOM_ERROR_MESSAGES.FETCH_PARTICIPANTS_FAILED);
          console.error('참가자 목록 조회 중 오류 발생:', error);
      }
    }
  }, [query.error]);

  return query;
};
