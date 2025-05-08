import { useQueryClient } from '@tanstack/react-query';
import { useMutation } from '@tanstack/react-query';
import { AxiosError } from 'axios';
import { toast } from 'react-toastify';

import { postSchedule } from '@api/schedule/postSchedule';

import {
  SCHEDULE_ERROR_MESSAGES,
  SCHEDULE_SUCCESS_MESSAGES,
  USER_ERROR_MESSAGES,
  USER_QUERY_KEYS,
} from '@constants/index';

import { useAuthStore } from '@stores/authStore';
import { useScheduleStore } from '@stores/scheduleStore';

import { formatTimeToKorean, getMonthRange } from '@utils/date';

export const useCreateScheduleMutation = () => {
  const queryClient = useQueryClient();

  const userId = useAuthStore((state) => state.user?.userId);

  const selectedDate = useScheduleStore((state) => state.selectedDate);
  const addScheduleItem = useScheduleStore((state) => state.addScheduleItem);

  const [startDate, endDate] = getMonthRange(selectedDate as Date);

  return useMutation({
    mutationFn: postSchedule,
    onSuccess: (response) => {
      toast.success(SCHEDULE_SUCCESS_MESSAGES.CREATE_SCHEDULE);

      // 새로 생성된 일정 데이터
      const newSchedule = response?.data?.schedule;

      if (newSchedule) {
        // 로컬 상태 업데이트 (UI에 즉시 반영)
        addScheduleItem({
          id: newSchedule.id,
          name: newSchedule.title,
          startTime: formatTimeToKorean(newSchedule?.startTime),
          endTime: formatTimeToKorean(newSchedule?.endTime),
          status: '대기중',
          order: newSchedule.order,
        });

        // 캐시 무효화 후 백그라운드에서 리페치
        queryClient.invalidateQueries({
          queryKey: [USER_QUERY_KEYS.USER_SCHEDULES, userId, startDate, endDate],
        });
      }
    },
    onError: (error: unknown) => {
      if (error instanceof AxiosError) {
        const errorCode = error?.response?.data?.errorCode;

        switch (errorCode) {
          case 4004:
            toast.error(SCHEDULE_ERROR_MESSAGES.REQUIRED_FIELDS);
            return;
          case 3006:
            toast.error(USER_ERROR_MESSAGES.UNAUTHORIZED);
            return;
          case 4003:
            toast.error(SCHEDULE_ERROR_MESSAGES.INVALID_TIME_RANGE);
            return;
          case 4006:
            toast.error(SCHEDULE_ERROR_MESSAGES.DAILY_SCHEDULE_LIMIT);
            return;
          default:
            toast.error(SCHEDULE_ERROR_MESSAGES.CREATE_SCHEDULE_FAILED);
            console.error('일정 생성 중 오류:', error);
        }
      }
    },
  });
};
