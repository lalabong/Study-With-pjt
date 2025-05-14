import { useMutation, useQueryClient } from '@tanstack/react-query';
import { AxiosError } from 'axios';
import { toast } from 'react-toastify';

import putScheduleOrders from '@api/schedule/putScheduleOrder';

import {
  SCHEDULE_ERROR_MESSAGES,
  SCHEDULE_SUCCESS_MESSAGES,
  USER_ERROR_MESSAGES,
  USER_QUERY_KEYS,
} from '@constants/index';

import { useAuthStore } from '@stores/authStore';
import { useScheduleStore } from '@stores/scheduleStore';

import { formatDateToYYYYMMDD } from '@utils/date';

import { Schedule } from '@/types/api';

export const useUpdateSchedulesOrderMutation = () => {
  const queryClient = useQueryClient();

  const userId = useAuthStore((state) => state.user?.userId);

  const setFilteredSchedules = useScheduleStore((state) => state.setFilteredSchedules);
  const selectedDate = useScheduleStore((state) => state.selectedDate);

  return useMutation({
    mutationFn: putScheduleOrders,
    onMutate: () => {
      const previousSchedules = queryClient.getQueryData([
        USER_QUERY_KEYS.USER_SCHEDULES_BY_DATE,
        userId,
        formatDateToYYYYMMDD(selectedDate as Date),
      ]);

      return { previousSchedules }; // 에러 시 복구 위해 저장
    },
    onSuccess: () => {
      toast.success(SCHEDULE_SUCCESS_MESSAGES.UPDATE_ORDER);

      queryClient.invalidateQueries({
        queryKey: [
          USER_QUERY_KEYS.USER_SCHEDULES_BY_DATE,
          userId,
          formatDateToYYYYMMDD(selectedDate as Date),
        ],
      });
    },
    onError: (error: unknown, _, context) => {
      // 오류 발생 시 이전 상태로 복구
      if (context?.previousSchedules) {
        setFilteredSchedules(context.previousSchedules as Schedule[]);
      }

      if (error instanceof AxiosError) {
        const errorCode = error?.response?.data?.errorCode;

        switch (errorCode) {
          case 3006:
            toast.error(USER_ERROR_MESSAGES.UNAUTHORIZED);
            break;
          case 4004:
            toast.error(SCHEDULE_ERROR_MESSAGES.REQUIRED_FIELDS);
            break;
          case 4001:
            toast.error(SCHEDULE_ERROR_MESSAGES.SCHEDULE_NOT_FOUND);
            break;
          default:
            toast.error(SCHEDULE_ERROR_MESSAGES.UPDATE_ORDER_FAILED);
            console.error('일정 순서 일괄 변경 중 오류:', error);
        }
      } else {
        toast.error(SCHEDULE_ERROR_MESSAGES.UPDATE_ORDER_FAILED);
        console.error('일정 순서 일괄 변경 중 오류:', error);
      }
    },
  });
};
