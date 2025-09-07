'use client';

import { useQuery } from '@tanstack/react-query';

import { getCheckLastParticipant } from '@api/room/getCheckLastParticipant';

import { ROOM_QUERY_KEYS } from '@constants/index';

interface UseCheckLastParticipantQueryParams {
  roomId: string;
  enabled?: boolean;
}

export const useCheckLastParticipantQuery = ({
  roomId,
  enabled = true,
}: UseCheckLastParticipantQueryParams) => {
  return useQuery({
    queryKey: [ROOM_QUERY_KEYS.CHECK_LAST_PARTICIPANT, roomId],
    queryFn: async () => {
      const response = await getCheckLastParticipant({ roomId });
      return response.data;
    },
    enabled: !!roomId && enabled,
    refetchOnWindowFocus: false,
    staleTime: 0, // 항상 최신 정보 유지
  });
};
