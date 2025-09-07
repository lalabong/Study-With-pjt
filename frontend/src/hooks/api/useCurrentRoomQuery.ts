'use client';

import { useQuery } from '@tanstack/react-query';

import { getCurrentRoom } from '@api/room/getCurrentRoom';

import { ROOM_QUERY_KEYS } from '@constants/queryKeys';

export const useCurrentRoomQuery = () => {
  return useQuery({
    queryKey: [ROOM_QUERY_KEYS.CURRENT_ROOM],
    queryFn: async () => {
      const response = await getCurrentRoom();
      return response.data;
    },
    refetchOnWindowFocus: false,
    staleTime: 60000, // 1분
    gcTime: 300000, // 5분
  });
};
