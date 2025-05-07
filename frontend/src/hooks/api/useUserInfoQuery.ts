'use client';

import { useEffect } from 'react';

import { useQuery } from '@tanstack/react-query';
import { AxiosError } from 'axios';
import { toast } from 'react-toastify';

import { getUserInfo } from '@api/user/getUserInfo';

import { USER_ERROR_MESSAGES } from '@constants/errorMessages';
import { USER_QUERY_KEYS } from '@constants/queryKeys';

interface UseUserInfoQueryParams {
  userId: string;
  enabled?: boolean;
}

export const useUserInfoQuery = ({ userId, enabled = true }: UseUserInfoQueryParams) => {
  const query = useQuery({
    queryKey: [USER_QUERY_KEYS.USER_INFO, userId],
    queryFn: async () => {
      const response = await getUserInfo({ userId });
      return response.data;
    },
    enabled: !!userId && enabled,
  });

  useEffect(() => {
    if (query.error) {
      const error = query.error as AxiosError<{ errorCode?: number }>;
      const errorCode = error.response?.data?.errorCode;

      switch (errorCode) {
        case 1005:
          toast.error(USER_ERROR_MESSAGES.UNAUTHORIZED);
          break;
        case 3001:
          toast.error(USER_ERROR_MESSAGES.USER_NOT_FOUND);
          break;
        default:
          toast.error(USER_ERROR_MESSAGES.GET_USER_INFO_FAILED);
          console.error('사용자 정보 조회 중 오류 발생:', error);
      }
    }
  }, [query.error]);

  return query;
};
