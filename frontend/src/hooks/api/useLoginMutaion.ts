import { useMutation } from '@tanstack/react-query';
import { AxiosError } from 'axios';
import { toast } from 'react-toastify';

import { postLogin } from '@api/user/postLogin';
import { PostLoginRequest } from '@api/user/postLogin';

import { USER_ERROR_MESSAGES, USER_SUCCESS_MESSAGES } from '@constants/index';

import { useAuthStore } from '@stores/authStore';

export const useLoginMutation = () => {
  const setAccessToken = useAuthStore((state) => state.setAccessToken);
  const setUser = useAuthStore((state) => state.setUser);

  return useMutation({
    mutationFn: async (data: PostLoginRequest) => {
      try {
        const response = await postLogin(data);

        if (!response.data) {
          throw new Error(USER_ERROR_MESSAGES.UNKNOWN_ERROR);
        }

        const { accessToken, user } = response.data;

        if (accessToken) {
          setAccessToken(accessToken);
        }

        if (user) {
          setUser(user);
        }

        if (accessToken && user) {
          useAuthStore.setState({ isAuthenticated: true });
        }

        return response.data;
      } catch (error) {
        throw error;
      }
    },
    onSuccess: () => {
      toast.success(USER_SUCCESS_MESSAGES.LOGIN_SUCCESS);
    },
    onError: (error: unknown) => {
      if (error instanceof AxiosError) {
        const errorCode = error?.response?.data?.errorCode;

        switch (errorCode) {
          case 1014:
            toast.error(USER_ERROR_MESSAGES.PASSWORD_MISMATCH);
            return;
          case 1013:
            toast.error(USER_ERROR_MESSAGES.USER_NOT_FOUND);
            return;
          default:
            toast.error(USER_ERROR_MESSAGES.LOGIN_FAILED);
            console.error('로그인 실패:', error);
        }
      } else {
        toast.error(USER_ERROR_MESSAGES.UNKNOWN_ERROR);
        console.error('로그인 실패:', error);
      }
    },
  });
};
