import { useEffect } from 'react';

import { useQuery } from '@tanstack/react-query';
import { AxiosError } from 'axios';
import { toast } from 'react-toastify';

import { getScheduleDates } from '@api/schedule/getScheduleDates';

import { SCHEDULE_ERROR_MESSAGES, USER_ERROR_MESSAGES, USER_QUERY_KEYS } from '@constants/index';

interface UseScheduleDatesQueryParams {
  userId: string;
  startDate: string;
  endDate: string;
  enabled?: boolean;
}

export const useScheduleDatesQuery = ({
  userId,
  startDate,
  endDate,
  enabled = true,
}: UseScheduleDatesQueryParams) => {
  const query = useQuery({
    queryKey: [USER_QUERY_KEYS.USER_SCHEDULE_DATES, userId, startDate, endDate],
    queryFn: async () => {
      const response = await getScheduleDates({ userId, startDate, endDate });
      return response.data;
    },
    enabled: !!userId && enabled,
  });

  useEffect(() => {
    if (query.error) {
      const error = query.error as AxiosError<{ errorCode?: number }>;
      const errorCode = error.response?.data?.errorCode;

      switch (errorCode) {
        case 3006:
          toast.error(USER_ERROR_MESSAGES.UNAUTHORIZED);
          break;
        case 3001:
          toast.error(USER_ERROR_MESSAGES.USER_NOT_FOUND);
          break;
        default:
          toast.error(SCHEDULE_ERROR_MESSAGES.FETCH_SCHEDULE_DATES_FAILED);
          console.error('일정 날짜 조회 중 오류 발생:', error);
      }
    }
  }, [query.error]);

  return query;
};
