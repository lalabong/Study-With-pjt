'use client';

import { useEffect } from 'react';

import { useQuery } from '@tanstack/react-query';
import { AxiosError } from 'axios';
import { toast } from 'react-toastify';

import { getReceivedFriendRequests } from '@api/friend/getReceivedFriendRequests';

import { FRIEND_ERROR_MESSAGES } from '@constants/errorMessages';
import { FRIEND_QUERY_KEYS } from '@constants/queryKeys';

interface UseReceivedFriendRequestsQueryParams {
  userCuid: string;
  enabled?: boolean;
}

export const useReceivedFriendRequestsQuery = ({
  userCuid,
  enabled = true,
}: UseReceivedFriendRequestsQueryParams) => {
  const query = useQuery({
    queryKey: [FRIEND_QUERY_KEYS.RECEIVED_FRIEND_REQUESTS, userCuid],
    queryFn: async () => {
      const response = await getReceivedFriendRequests({ userCuid });
      return response.data;
    },
    enabled: !!userCuid && enabled,
    staleTime: 2 * 60 * 1000, // 2 minutes - friend requests need fresher data
  });

  useEffect(() => {
    if (query.error) {
      const error = query.error as AxiosError<{ errorCode?: number }>;
      const errorCode = error.response?.data?.errorCode;

      switch (errorCode) {
        case 3006:
          toast.error('로그인이 필요한 서비스입니다.');
          break;
        default:
          toast.error(FRIEND_ERROR_MESSAGES.GET_RECEIVED_FRIEND_REQUESTS_FAILED);
          console.error('받은 친구 요청 조회 중 오류 발생:', error);
      }
    }
  }, [query.error]);

  return query;
};
