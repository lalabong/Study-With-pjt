'use client';

import { useMutation } from '@tanstack/react-query';

import { postTimeLog } from '@api/room/postTimeLog';

import { USER_QUERY_KEYS } from '@constants/queryKeys';

import { useAuthStore } from '@stores/authStore';

import { getServerQueryClient } from '@lib/react-query/getServerQueryClient';

export const usePostTimeLogMutation = () => {
  const queryClient = getServerQueryClient();

  const { user } = useAuthStore();

  return useMutation({
    mutationFn: postTimeLog,
    onSuccess: (data) => {
      // 관련 쿼리들 무효화하여 최신 데이터로 업데이트
      if (user?.userId) {
        queryClient.invalidateQueries({
          queryKey: [USER_QUERY_KEYS.USER_TIMELOGS, user.userId],
        });
        queryClient.invalidateQueries({
          queryKey: [USER_QUERY_KEYS.USER_TOTAL_STUDY_TIME, user.userId],
        });
      }

      console.log('공부 시간 저장 완료:', data.data);
    },
    onError: (error: unknown) => {
      console.error('공부 시간 저장 실패:', error);
      // 에러 시 토스트나 알림으로 사용자에게 알림 가능
    },
  });
};
