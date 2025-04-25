import { useMutation } from '@tanstack/react-query';
import { AxiosError } from 'axios';
import { useRouter } from 'next/navigation';
import { toast } from 'react-toastify';

import { postSignup } from '@/api/user/postSignup';
import { USER_ERROR_MESSAGES } from '@/constants/errorMessages';
import { USER_SUCCESS_MESSAGES } from '@/constants/successMessages';
import { SignupRequest } from '@/types/api';

export const useSignupMutation = () => {
  const router = useRouter();

  return useMutation({
    mutationFn: async (data: SignupRequest) => {
      await postSignup(data);
    },
    onSuccess: () => {
      toast.success(USER_SUCCESS_MESSAGES.SIGNUP_SUCCESS);
      router.push('/login');
    },
    onError: (error) => {
      if (error instanceof AxiosError) {
        if (error.response?.status === 400) {
          toast.error(USER_ERROR_MESSAGES.INVALID_FORM);
          return;
        }
        if (error.response?.status === 409) {
          toast.error(USER_ERROR_MESSAGES.USER_EXISTS);
          return;
        }
        if (error.response?.status === 422) {
          toast.error(USER_ERROR_MESSAGES.NICKNAME_EXISTS);
          return;
        }
      }
      toast.error(USER_ERROR_MESSAGES.SIGNUP_FAILED);
      console.error('회원가입 중 오류 발생:', error);
    },
  });
};
