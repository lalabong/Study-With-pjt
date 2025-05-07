'use client';

import { useEffect } from 'react';

import { useQuery } from '@tanstack/react-query';
import { AxiosError } from 'axios';
import { toast } from 'react-toastify';

import { getUserTotalStudyTime } from '@api/user/getUserTotalStudyTime';

import { USER_ERROR_MESSAGES } from '@constants/errorMessages';
import { USER_QUERY_KEYS } from '@constants/queryKeys';

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
      const error = query.error as AxiosError;
      if (error.response?.status === 401) {
        toast.error(USER_ERROR_MESSAGES.UNAUTHORIZED);
      } else if (error.response?.status === 404) {
        toast.error(USER_ERROR_MESSAGES.USER_NOT_FOUND);
      } else {
        toast.error(USER_ERROR_MESSAGES.FETCH_TOTAL_STUDY_TIME_FAILED);
        console.error('사용자 총 학습 시간 조회 중 오류 발생:', error);
      }
    }
  }, [query.error]);

  return query;
};
