'use client';

import { useQuery } from '@tanstack/react-query';
import { AxiosError } from 'axios';

import { getSearchUsers } from '@api/friend/getSearchUsers';

import { FRIEND_ERROR_MESSAGES } from '@constants/index';
import { FRIEND_QUERY_KEYS } from '@constants/queryKeys';

interface UseSearchUsersQueryParams {
  nickname: string;
  enabled?: boolean;
}

export const useSearchUsersQuery = ({ nickname, enabled = true }: UseSearchUsersQueryParams) => {
  const trimmedNickname = nickname.trim();

  const query = useQuery({
    queryKey: [FRIEND_QUERY_KEYS.SEARCH_USERS, trimmedNickname],
    queryFn: async () => {
      if (trimmedNickname.length < 2) {
        throw new Error(FRIEND_ERROR_MESSAGES.SEARCH_QUERY_TOO_SHORT);
      }

      const response = await getSearchUsers({ nickname: trimmedNickname });
      return response.data;
    },
    enabled: !!trimmedNickname && trimmedNickname.length >= 2 && enabled,
    staleTime: 5 * 60 * 1000, // 5 minutes
    retry: (failureCount, error) => {
      if (error instanceof AxiosError && error.response?.status === 400) {
        return false;
      }
      return failureCount < 2;
    },
  });

  return query;
};
