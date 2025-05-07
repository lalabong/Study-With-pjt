import { useRouter } from 'next/navigation';

import { useMutation } from '@tanstack/react-query';
import { AxiosError } from 'axios';
import { toast } from 'react-toastify';

import { postSignup, SignupRequest } from '@api/user/postSignup';

import { USER_ERROR_MESSAGES } from '@constants/errorMessages';
import { USER_SUCCESS_MESSAGES } from '@constants/successMessages';

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
    onError: (error: unknown) => {
      if (error instanceof AxiosError) {
        const errorCode = error?.response?.data?.errorCode;

        switch (errorCode) {
          case 1002:
            toast.error(USER_ERROR_MESSAGES.INVALID_FORM);
            return;
          case 1003:
            toast.error(USER_ERROR_MESSAGES.USER_EXISTS);
            return;
          case 1004:
            toast.error(USER_ERROR_MESSAGES.NICKNAME_EXISTS);
            return;
          default:
            toast.error(USER_ERROR_MESSAGES.SIGNUP_FAILED);
            console.error('회원가입 중 오류 발생:', error);
        }
      } else {
        toast.error(USER_ERROR_MESSAGES.UNKNOWN_ERROR);
        console.error('회원가입 중 오류 발생:', error);
      }
    },
  });
};
