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

import { formatDateToYYYYMMDD, getCurrentDateString } from '@utils/date';

import { Schedule } from '@/types/api';

export const useUpdateScheduleMutation = () => {
  const queryClient = useQueryClient();

  const userId = useAuthStore((state) => state.user?.userId);

  const selectedDate = useScheduleStore((state) => state.selectedDate);
  const updateScheduleItem = useScheduleStore((state) => state.updateScheduleItem);

  return useMutation({
    mutationFn: patchSchedule,
    onMutate: async (variables) => {
      if (!selectedDate || Array.isArray(selectedDate)) {
        return { originalStatus: undefined };
      }

      if (!userId) {
        return { originalStatus: undefined };
      }

      const formattedDate = formatDateToYYYYMMDD(selectedDate);
      const queryKey = [USER_QUERY_KEYS.USER_SCHEDULES_BY_DATE, userId, formattedDate];

      // 변경 전 원본 데이터 저장
      const originalSchedules = queryClient.getQueryData(queryKey);

      let originalStatus: string | undefined = undefined;
      if (
        originalSchedules &&
        typeof originalSchedules === 'object' &&
        'schedules' in originalSchedules
      ) {
        const schedules = (originalSchedules as { schedules: Schedule[] }).schedules;

        const targetSchedule = schedules.find((schedule) => schedule.id === variables.scheduleId);
        originalStatus = targetSchedule?.status;
      }

      const contextData = { originalStatus };

      return contextData;
    },
    onSuccess: (response, variables, context) => {
      const { scheduleId } = variables;
      const updatedSchedule = response?.data?.schedule;

      if (updatedSchedule) {
        // 로컬 상태 업데이트 (UI에 즉시 반영)
        updateScheduleItem(scheduleId, {
          title: updatedSchedule.title,
          startTime: updatedSchedule.startTime,
          endTime: updatedSchedule.endTime,
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

      // 진행중인 일정과 관련된 변경이 있는 경우 캐시 무효화
      const { status: newStatus } = variables;
      const originalStatus = context?.originalStatus;
      const finalStatus = updatedSchedule?.status || newStatus;

      if (!selectedDate || Array.isArray(selectedDate)) {
        return;
      }

      // 조건 1: 진행중인 일정이 수정된 경우 (상태 변경 여부와 관계없이)
      // 조건 2: 진행중이지 않은 일정을 진행중으로 변경한 경우
      // 조건 3: 진행중인 일정의 상태를 다른 상태로 변경한 경우
      const shouldInvalidate =
        originalStatus === '진행중' || // 원래 진행중이었던 일정이 수정됨
        finalStatus === '진행중' || // 최종적으로 진행중이 됨
        (originalStatus === '진행중' && finalStatus !== '진행중'); // 진행중에서 다른 상태로 변경

      if (shouldInvalidate) {
        queryClient.invalidateQueries({});
        queryClient.invalidateQueries({
          queryKey: [USER_QUERY_KEYS.USER_TOP_RUNNING_SCHEDULE, userId, getCurrentDateString()],
        });
      }
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
