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

import { formatDateToYYYYMMDD, getCurrentDateString } from '@utils/date';

import { Schedule } from '@/types/api';

export const useUpdateSchedulesOrderMutation = () => {
  const queryClient = useQueryClient();

  const userId = useAuthStore((state) => state.user?.userId);

  const setFilteredSchedules = useScheduleStore((state) => state.setFilteredSchedules);
  const selectedDate = useScheduleStore((state) => state.selectedDate);

  return useMutation({
    mutationFn: putScheduleOrders,
    onMutate: () => {
      if (!selectedDate || Array.isArray(selectedDate)) {
        return { previousSchedules: null, hasRunningSchedule: false };
      }

      if (!userId) {
        return { previousSchedules: null, hasRunningSchedule: false };
      }

      const formattedDate = formatDateToYYYYMMDD(selectedDate);
      const queryKey = [USER_QUERY_KEYS.USER_SCHEDULES_BY_DATE, userId, formattedDate];

      const previousSchedules = queryClient.getQueryData(queryKey);

      // 진행중인 일정이 있는지 확인
      let hasRunningSchedule = false;
      if (
        previousSchedules &&
        typeof previousSchedules === 'object' &&
        'schedules' in previousSchedules
      ) {
        const schedules = (previousSchedules as { schedules: Schedule[] }).schedules;

        hasRunningSchedule = schedules.some((schedule) => schedule.status === '진행중');
      }

      const contextData = { previousSchedules, hasRunningSchedule };

      return contextData; // 에러 시 복구 위해 저장
    },
    onSuccess: (_, __, context) => {
      toast.success(SCHEDULE_SUCCESS_MESSAGES.UPDATE_ORDER);

      queryClient.invalidateQueries({
        queryKey: [
          USER_QUERY_KEYS.USER_SCHEDULES_BY_DATE,
          userId,
          formatDateToYYYYMMDD(selectedDate as Date),
        ],
      });

      // 진행중인 일정의 순서가 변경된 경우에만 캐시 무효화
      const hasRunningSchedule = context?.hasRunningSchedule;

      if (!selectedDate || Array.isArray(selectedDate)) {
        return;
      }

      if (hasRunningSchedule) {
        queryClient.invalidateQueries({
          queryKey: [USER_QUERY_KEYS.USER_TOP_RUNNING_SCHEDULE, userId, getCurrentDateString()],
        });
      }
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
