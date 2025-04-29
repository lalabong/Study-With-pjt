'use client';

import { useRouter } from 'next/navigation';

import { useMutation } from '@tanstack/react-query';
import { toast } from 'react-toastify';

import { postLogout } from '@api/user/postLogout';

import { USER_ERROR_MESSAGES } from '@constants/errorMessages';
import { USER_SUCCESS_MESSAGES } from '@constants/successMessages';

import { useAuthStore } from '@stores/authStore';

export const useLogoutMutation = () => {
  const router = useRouter();

  return useMutation({
    mutationFn: async () => {
      await postLogout();

      useAuthStore.setState({
        accessToken: null,
        user: null,
        isAuthenticated: false,
      });
    },
    onSuccess: () => {
      toast.success(USER_SUCCESS_MESSAGES.LOGOUT_SUCCESS);
      router.push('/');
    },
    onError: (error: unknown) => {
      toast.error(USER_ERROR_MESSAGES.UNKNOWN_ERROR);
      console.error('로그아웃 실패:', error);
    },
  });
};
