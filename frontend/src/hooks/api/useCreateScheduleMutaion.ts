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

import { formatDateToYYYYMMDD, formatTimeToKorean } from '@utils/date';

export const useCreateScheduleMutation = () => {
  const queryClient = useQueryClient();

  const userId = useAuthStore((state) => state.user?.userId);

  const { selectedDate, addScheduleItem, startDate, endDate } = useScheduleStore();

  return useMutation({
    mutationFn: postSchedule,
    onSuccess: (response) => {
      toast.success(SCHEDULE_SUCCESS_MESSAGES.CREATE_SCHEDULE);

      const newSchedule = response?.data?.schedule;

      if (newSchedule) {
        addScheduleItem({
          id: newSchedule.id,
          title: newSchedule.title,
          startTime: newSchedule.startTime ? formatTimeToKorean(newSchedule.startTime) : undefined,
          endTime: newSchedule.endTime ? formatTimeToKorean(newSchedule.endTime) : undefined,
          status: '대기중',
          order: newSchedule.order,
          userCuid: newSchedule.userCuid,
          createdAt: newSchedule.createdAt,
          date: newSchedule.date,
        });

        queryClient.invalidateQueries({
          queryKey: [
            USER_QUERY_KEYS.USER_SCHEDULES_BY_DATE,
            userId,
            formatDateToYYYYMMDD(selectedDate as Date),
          ],
        });
        queryClient.invalidateQueries({
          queryKey: [USER_QUERY_KEYS.USER_SCHEDULE_DATES, userId, startDate, endDate],
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
