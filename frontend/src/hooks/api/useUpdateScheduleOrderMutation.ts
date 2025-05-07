import { useMutation, useQueryClient } from '@tanstack/react-query';
import { AxiosError } from 'axios';
import { toast } from 'react-toastify';

import { patchScheduleOrder } from '@api/schedule/patchScheduleOrder';

import {
  SCHEDULE_ERROR_MESSAGES,
  USER_ERROR_MESSAGES,
  SCHEDULE_SUCCESS_MESSAGES,
} from '@constants/errorMessages';
import { USER_QUERY_KEYS } from '@constants/queryKeys';

import { useAuthStore } from '@stores/authStore';
import { useScheduleStore } from '@stores/scheduleStore';

import { getMonthRange } from '@utils/date';

export const useUpdateScheduleOrderMutation = () => {
  const queryClient = useQueryClient();

  const userId = useAuthStore((state) => state.user?.userId);

  const selectedDate = useScheduleStore((state) => state.selectedDate);
  const filteredSchedules = useScheduleStore((state) => state.filteredSchedules);
  const setFilteredSchedules = useScheduleStore((state) => state.setFilteredSchedules);

  const [startDate, endDate] = getMonthRange(selectedDate as Date);

  return useMutation({
    mutationFn: patchScheduleOrder,
    onSuccess: (response, variables) => {
      const { scheduleId, targetPosition } = variables;

      // 로컬 상태에서 일정 순서 변경
      const schedulesCopy = [...filteredSchedules];
      const scheduleIndex = schedulesCopy.findIndex((item) => item.id === scheduleId);

      if (scheduleIndex !== -1) {
        const [movedSchedule] = schedulesCopy.splice(scheduleIndex, 1);
        schedulesCopy.splice(targetPosition, 0, movedSchedule);

        // 로컬 상태 업데이트 (UI에 즉시 반영)
        setFilteredSchedules(schedulesCopy);
      }

      toast.success(SCHEDULE_SUCCESS_MESSAGES.UPDATE_ORDER);

      // 캐시 무효화 후 백그라운드에서 리페치
      queryClient.invalidateQueries({
        queryKey: [USER_QUERY_KEYS.USER_SCHEDULES, userId, startDate, endDate],
      });
    },
    onError: (error: unknown) => {
      if (error instanceof AxiosError) {
        const errorCode = error?.response?.data?.errorCode;

        switch (errorCode) {
          case 3006:
            toast.error(USER_ERROR_MESSAGES.UNAUTHORIZED);
            return;
          case 4002:
            toast.error(SCHEDULE_ERROR_MESSAGES.PERMISSION_DENIED);
            return;
          case 4001:
            toast.error(SCHEDULE_ERROR_MESSAGES.SCHEDULE_NOT_FOUND);
            return;
          case 4005:
            toast.error(SCHEDULE_ERROR_MESSAGES.INVALID_POSITION);
            return;
          default:
            toast.error(SCHEDULE_ERROR_MESSAGES.UPDATE_ORDER_FAILED);
            console.error('일정 순서 변경 중 오류:', error);
        }
      }
    },
  });
};
