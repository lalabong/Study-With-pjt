import { useEffect } from 'react';

import { useQuery } from '@tanstack/react-query';
import { AxiosError } from 'axios';
import { toast } from 'react-toastify';

import { getUserSchedules } from '@/api/user/getUserSchedules';
import { USER_ERROR_MESSAGES } from '@/constants/errorMessages';
import { USER_QUERY_KEYS } from '@/constants/queryKeys';
import { SCHEDULE_SUCCESS_MESSAGES } from '@/constants/successMessages';

interface UseUserSchedulesQueryParams {
  userId: string;
  enabled?: boolean;
}

export const useUserSchedulesQuery = ({ userId, enabled = true }: UseUserSchedulesQueryParams) => {
  const query = useQuery({
    queryKey: [USER_QUERY_KEYS.USER_SCHEDULES, userId],
    queryFn: async () => {
      const response = await getUserSchedules(userId);
      return response;
    },
    enabled: !!userId && enabled,
  });

  useEffect(() => {
    if (query.isSuccess && query.data) {
      toast.success(SCHEDULE_SUCCESS_MESSAGES.FETCH_SCHEDULES_SUCCESS);
    } else if (query.error) {
      const error = query.error as AxiosError;
      if (error.response?.status === 404) {
        toast.error(USER_ERROR_MESSAGES.USER_NOT_FOUND);
      } else {
        toast.error(USER_ERROR_MESSAGES.FETCH_SCHEDULES_FAILED);
        console.error('사용자 일정 조회 중 오류 발생:', error);
      }
    }
  }, [query.isSuccess, query.data, query.error]);

  return query;
};
