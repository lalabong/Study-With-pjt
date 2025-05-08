import { useMutation, useQueryClient } from '@tanstack/react-query';
import { AxiosError } from 'axios';
import { toast } from 'react-toastify';

import { deleteSchedule } from '@api/schedule/deleteSchedule';

import {
  SCHEDULE_ERROR_MESSAGES,
  SCHEDULE_SUCCESS_MESSAGES,
  USER_ERROR_MESSAGES,
  USER_QUERY_KEYS,
} from '@constants/index';

import { useAuthStore } from '@stores/authStore';
import { useScheduleStore } from '@stores/scheduleStore';

import { getMonthRange } from '@utils/date';

export const useDeleteScheduleMutation = () => {
  const queryClient = useQueryClient();

  const userId = useAuthStore((state) => state.user?.userId);

  const selectedDate = useScheduleStore((state) => state.selectedDate);
  const removeScheduleItem = useScheduleStore((state) => state.removeScheduleItem);

  const [startDate, endDate] = getMonthRange(selectedDate as Date);

  return useMutation({
    mutationFn: deleteSchedule,
    onSuccess: (_, variables) => {
      const { scheduleId } = variables;

      // 로컬 상태 업데이트 (UI에 즉시 반영)
      removeScheduleItem(scheduleId);

      toast.success(SCHEDULE_SUCCESS_MESSAGES.DELETE_SCHEDULE);

      // 캐시 무효화 후 백그라운드에서 리페치
      queryClient.invalidateQueries({
        queryKey: [USER_QUERY_KEYS.USER_SCHEDULES, userId, startDate, endDate],
      });
    },
    onError: (error: unknown) => {
      if (error instanceof AxiosError) {
        const errorCode = error?.response?.data?.errorCode;

        switch (errorCode) {
          case 1005:
            toast.error(USER_ERROR_MESSAGES.UNAUTHORIZED);
            return;
          case 4002:
            toast.error(SCHEDULE_ERROR_MESSAGES.PERMISSION_DENIED);
            return;
          case 4001:
            toast.error(SCHEDULE_ERROR_MESSAGES.SCHEDULE_NOT_FOUND);
            return;
          default:
            toast.error(SCHEDULE_ERROR_MESSAGES.DELETE_SCHEDULE_FAILED);
            console.error('일정 삭제 중 오류:', error);
        }
      }
    },
  });
};
