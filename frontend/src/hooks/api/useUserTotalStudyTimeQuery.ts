'use client';

import { useEffect } from 'react';

import { useQuery } from '@tanstack/react-query';
import { AxiosError } from 'axios';
import { toast } from 'react-toastify';

import { getUserTotalStudyTime } from '@api/user/getUserTotalStudyTime';

import { USER_ERROR_MESSAGES, USER_QUERY_KEYS } from '@constants/index';

interface UseUserTotalStudyTimeQueryParams {
  userId: string;
  enabled?: boolean;
}

export const useUserTotalStudyTimeQuery = ({
  userId,
  enabled = true,
}: UseUserTotalStudyTimeQueryParams) => {
  const query = useQuery({
    queryKey: [USER_QUERY_KEYS.USER_TOTAL_STUDY_TIME, userId],
    queryFn: async () => {
      const response = await getUserTotalStudyTime({ userId });
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
          toast.error(USER_ERROR_MESSAGES.FETCH_TIMELOGS_FAILED);
          console.error('사용자 총 학습 시간 조회 중 오류 발생:', error);
      }
    }
  }, [query.error]);

  return query;
};
