import { useMutation } from '@tanstack/react-query';
import { AxiosError } from 'axios';
import { toast } from 'react-toastify';

import { patchUserNickname } from '@api/user/patchUserNickname';

import { USER_ERROR_MESSAGES, USER_SUCCESS_MESSAGES } from '@constants/index';

import { useAuthStore } from '@stores/authStore';

interface UpdateNicknameParams {
  userId: string;
}

interface UpdateNicknameRequest {
  nickname: string;
}

export const useUpdateNicknameMutation = ({ userId }: UpdateNicknameParams) => {
  const user = useAuthStore((state) => state.user);
  const setUser = useAuthStore((state) => state.setUser);

  return useMutation({
    mutationFn: async (data: UpdateNicknameRequest) => {
      if (!user) {
        throw new Error(USER_ERROR_MESSAGES.UNAUTHORIZED);
      }

      try {
        const response = await patchUserNickname(userId, data);

        if (!response.data) {
          throw new Error(USER_ERROR_MESSAGES.UPDATE_NICKNAME_FAILED);
        }

        const updatedUser = {
          ...user,
          nickname: response.data.nickname,
        };

        setUser(updatedUser);

        return response.data;
      } catch (error) {
        throw error;
      }
    },
    onSuccess: () => {
      toast.success(USER_SUCCESS_MESSAGES.UPDATE_NICKNAME_SUCCESS);
    },
    onError: (error: unknown) => {
      if (error instanceof AxiosError) {
        const errorCode = (error as AxiosError<{ errorCode?: number }>).response?.data?.errorCode;

        switch (errorCode) {
          case 3001:
            toast.error(USER_ERROR_MESSAGES.USER_NOT_FOUND);
            return;
          case 3002:
            toast.error(USER_ERROR_MESSAGES.NICKNAME_MAX_LENGTH);
            return;
          case 1004:
            toast.error(USER_ERROR_MESSAGES.NICKNAME_EXISTS);
            return;
          case 2001:
            toast.error(USER_ERROR_MESSAGES.SERVER_ERROR);
            return;
          default:
            toast.error(USER_ERROR_MESSAGES.UPDATE_NICKNAME_FAILED);
            console.error('닉네임 업데이트 실패:', error);
        }
      } else {
        toast.error(USER_ERROR_MESSAGES.UPDATE_NICKNAME_FAILED);
        console.error('닉네임 업데이트 실패:', error);
      }
    },
  });
};
