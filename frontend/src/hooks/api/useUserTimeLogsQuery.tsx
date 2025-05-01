'use client';

import { useEffect } from 'react';

import { useQuery } from '@tanstack/react-query';
import { AxiosError } from 'axios';
import { toast } from 'react-toastify';

import { getUserTimeLogs } from '@api/user/getUserTimelogs';

import { USER_ERROR_MESSAGES } from '@constants/errorMessages';
import { USER_QUERY_KEYS } from '@constants/queryKeys';

interface UseUserTimeLogsQueryParams {
  userId: string;
  period?: string;
  date?: string;
  enabled?: boolean;
}

export const useUserTimeLogsQuery = ({
  userId,
  period,
  date,
  enabled = true,
}: UseUserTimeLogsQueryParams) => {
  const query = useQuery({
    queryKey: [USER_QUERY_KEYS.USER_TIMELOGS, userId, period, date],
    queryFn: async () => {
      const response = await getUserTimeLogs(userId, period, date);
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
        toast.error(USER_ERROR_MESSAGES.FETCH_TIMELOGS_FAILED);
        console.error('사용자 시간 기록 조회 중 오류 발생:', error);
      }
    }
  }, [query.error]);

  return query;
};
