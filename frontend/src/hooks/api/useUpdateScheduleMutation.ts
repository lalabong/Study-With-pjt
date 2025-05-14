import { useMutation, useQueryClient } from '@tanstack/react-query';
import { AxiosError } from 'axios';
import { toast } from 'react-toastify';

import { patchSchedule } from '@api/schedule/patchSchedule';

import {
  SCHEDULE_ERROR_MESSAGES,
  SCHEDULE_SUCCESS_MESSAGES,
  USER_ERROR_MESSAGES,
  USER_QUERY_KEYS,
} from '@constants/index';

import { useAuthStore } from '@stores/authStore';
import { useScheduleStore } from '@stores/scheduleStore';

import { formatDateToYYYYMMDD, formatTimeToKorean } from '@utils/date';

export const useUpdateScheduleMutation = () => {
  const queryClient = useQueryClient();

  const userId = useAuthStore((state) => state.user?.userId);

  const selectedDate = useScheduleStore((state) => state.selectedDate);
  const updateScheduleItem = useScheduleStore((state) => state.updateScheduleItem);

  return useMutation({
    mutationFn: patchSchedule,
    onSuccess: (response, variables) => {
      const { scheduleId } = variables;
      const updatedSchedule = response?.data?.schedule;

      if (updatedSchedule) {
        // 로컬 상태 업데이트 (UI에 즉시 반영)
        updateScheduleItem(scheduleId, {
          title: updatedSchedule.title,
          startTime: updatedSchedule.startTime
            ? formatTimeToKorean(updatedSchedule.startTime)
            : undefined,
          endTime: updatedSchedule.endTime
            ? formatTimeToKorean(updatedSchedule.endTime)
            : undefined,
          status: updatedSchedule.status,
        });
      }

      toast.success(SCHEDULE_SUCCESS_MESSAGES.UPDATE_SCHEDULE);

      queryClient.invalidateQueries({
        queryKey: [
          USER_QUERY_KEYS.USER_SCHEDULES_BY_DATE,
          userId,
          formatDateToYYYYMMDD(selectedDate as Date),
        ],
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
          case 4003:
            toast.error(SCHEDULE_ERROR_MESSAGES.INVALID_TIME_RANGE);
            return;
          default:
            toast.error(SCHEDULE_ERROR_MESSAGES.UPDATE_SCHEDULE_FAILED);
            console.error('일정 수정 중 오류:', error);
        }
      }
    },
  });
};
