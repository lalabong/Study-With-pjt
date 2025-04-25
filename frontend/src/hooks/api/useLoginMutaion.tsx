import { useMutation } from '@tanstack/react-query';
import { AxiosError } from 'axios';
import { useRouter } from 'next/navigation';
import { toast } from 'react-toastify';

import { USER_ERROR_MESSAGES } from '@/constants/errorMessages';
import { USER_SUCCESS_MESSAGES } from '@/constants/successMessages';
import { useAuthStore } from '@/stores/authStore';
import { LoginRequest } from '@/types/api';

export const useLoginMutation = () => {
  const router = useRouter();

  return useMutation({
    mutationFn: async (data: LoginRequest) => {
      await useAuthStore.getState().login(data);
    },
    onSuccess: () => {
      toast.success(USER_SUCCESS_MESSAGES.LOGIN_SUCCESS);
      router.push('/mypage');
    },
    onError: (error: unknown) => {
      // 문자열 에러 처리 (authStore에서 throw된 에러)
      if (typeof error === 'string') {
        console.log('error.response.data.message', error);
        toast.error(error);
        return;
      }

      // AxiosError 처리
      if (error instanceof AxiosError) {
        if (error.response?.data?.message) {
          console.log('error.response.data.message', error.response.data.message);
          toast.error(error.response.data.message);
          return;
        }

        if (error.response?.status === 401) {
          toast.error(USER_ERROR_MESSAGES.LOGIN_FAILED);
          return;
        }
      }

      // 기타 예상치 못한 에러
      toast.error(USER_ERROR_MESSAGES.UNKNOWN_ERROR);
      console.error('로그인 실패:', error);
    },
  });
};
