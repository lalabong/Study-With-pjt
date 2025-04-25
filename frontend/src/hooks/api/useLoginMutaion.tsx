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
      if (error instanceof AxiosError) {
        if (error.response?.status === 403) {
          toast.error(USER_ERROR_MESSAGES.PASSWORD_MISMATCH);
          return;
        }
        if (error.response?.status === 404) {
          toast.error(USER_ERROR_MESSAGES.USER_NOT_FOUND);
          return;
        }
      }
      toast.error(USER_ERROR_MESSAGES.UNKNOWN_ERROR);
      console.error('로그인 실패:', error);
    },
  });
};
