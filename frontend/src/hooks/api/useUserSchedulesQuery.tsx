import { useEffect } from 'react';

import { useQuery } from '@tanstack/react-query';
import { AxiosError } from 'axios';
import { toast } from 'react-toastify';

import { getSchedules } from '@api/schedule/getSchedules';

import { USER_ERROR_MESSAGES } from '@constants/errorMessages';
import { USER_QUERY_KEYS } from '@constants/queryKeys';

interface UseUserSchedulesQueryParams {
  userId: string;
  startDate?: string;
  endDate?: string;
  enabled?: boolean;
}

export const useUserSchedulesQuery = ({
  userId,
  startDate,
  endDate,
  enabled = true,
}: UseUserSchedulesQueryParams) => {
  const query = useQuery({
    queryKey: [USER_QUERY_KEYS.USER_SCHEDULES, userId, startDate, endDate],
    queryFn: async () => {
      const response = await getSchedules({ userId, startDate, endDate });
      return response.data;
    },
    enabled: !!userId && enabled,
  });

  useEffect(() => {
    if (query.error) {
      const error = query.error as AxiosError<{ errorCode?: number }>;
      const errorCode = error.response?.data?.errorCode;

      switch (errorCode) {
        case 3001:
          toast.error(USER_ERROR_MESSAGES.USER_NOT_FOUND);
          break;
        default:
          toast.error(USER_ERROR_MESSAGES.FETCH_SCHEDULES_FAILED);
          console.error('사용자 일정 조회 중 오류 발생:', error);
      }
    }
  }, [query.error]);

  return query;
};
