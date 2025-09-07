'use client';

import { useEffect } from 'react';

import { useQuery } from '@tanstack/react-query';
import { AxiosError } from 'axios';
import { toast } from 'react-toastify';

import { getFriends } from '@api/friend/getFriends';

import { FRIEND_ERROR_MESSAGES } from '@constants/errorMessages';
import { FRIEND_QUERY_KEYS } from '@constants/queryKeys';

interface UseFriendsQueryParams {
  userCuid: string;
  enabled?: boolean;
}

export const useFriendsQuery = ({ userCuid, enabled = true }: UseFriendsQueryParams) => {
  const query = useQuery({
    queryKey: [FRIEND_QUERY_KEYS.FRIENDS, userCuid],
    queryFn: async () => {
      const response = await getFriends({ userCuid });
      return response.data;
    },
    enabled: !!userCuid && enabled,
    staleTime: 5 * 60 * 1000, // 5 minutes
  });

  useEffect(() => {
    if (query.error) {
      const error = query.error as AxiosError<{ errorCode?: number }>;
      const errorCode = error.response?.data?.errorCode;

      switch (errorCode) {
        case 3001:
          toast.error(FRIEND_ERROR_MESSAGES.FRIEND_NOT_FOUND);
          break;
        case 3006:
          toast.error('로그인이 필요한 서비스입니다.');
          break;
        default:
          toast.error(FRIEND_ERROR_MESSAGES.GET_FRIENDS_FAILED);
          console.error('친구 목록 조회 중 오류 발생:', error);
      }
    }
  }, [query.error]);

  return query;
};
