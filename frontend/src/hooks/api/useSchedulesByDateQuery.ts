import { useEffect } from 'react';

import { useQuery } from '@tanstack/react-query';
import { AxiosError } from 'axios';
import { toast } from 'react-toastify';

import getSchedulesByDate from '@api/schedule/getSchedulesByDate';

import { SCHEDULE_ERROR_MESSAGES, USER_ERROR_MESSAGES, USER_QUERY_KEYS } from '@constants/index';

interface UseSchedulesByDateQueryParams {
  userId: string;
  date: string;
  enabled?: boolean;
}

export const useSchedulesByDateQuery = ({
  userId,
  date,
  enabled = true,
}: UseSchedulesByDateQueryParams) => {
  const query = useQuery({
    queryKey: [USER_QUERY_KEYS.USER_SCHEDULES_BY_DATE, userId, date],
    queryFn: async () => {
      const response = await getSchedulesByDate({ userId, date });
      return response.data;
    },
    enabled: !!userId && !!date && enabled,
  });

  useEffect(() => {
    if (query.error) {
      const error = query.error as AxiosError<{ errorCode?: number }>;
      const errorCode = error.response?.data?.errorCode;

      switch (errorCode) {
        case 4004:
          toast.error(SCHEDULE_ERROR_MESSAGES.REQUIRED_FIELDS);
          break;
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
