'use client';

import { useQuery } from '@tanstack/react-query';

import { getReceivedRoomInvites } from '@api/room/getReceivedRoomInvites';

import { ROOM_QUERY_KEYS } from '@constants/queryKeys';

export const useReceivedRoomInvitesQuery = () => {
  return useQuery({
    queryKey: [ROOM_QUERY_KEYS.RECEIVED_ROOM_INVITES],
    queryFn: async () => {
      const result = await getReceivedRoomInvites();
      console.log('useReceivedRoomInvitesQuery - API result:', result);
      return result;
    },
    staleTime: 1000 * 60 * 5, // 5분
    gcTime: 1000 * 60 * 10, // 10분
  });
};
