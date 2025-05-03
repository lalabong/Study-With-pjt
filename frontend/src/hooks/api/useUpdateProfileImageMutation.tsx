import { useMutation } from '@tanstack/react-query';
import { AxiosError } from 'axios';
import { toast } from 'react-toastify';

import { USER_ERROR_MESSAGES } from '@constants/errorMessages';
import { USER_SUCCESS_MESSAGES } from '@constants/successMessages';

import { useAuthStore } from '@stores/authStore';

import { updateUserProfileImg } from '@/api/user/updateUserProfileImg';

interface UpdateProfileImgParams {
  userId: string;
}

export const useUpdateProfileImgMutation = ({ userId }: UpdateProfileImgParams) => {
  const user = useAuthStore((state) => state.user);
  const setUser = useAuthStore((state) => state.setUser);

  return useMutation({
    mutationFn: async (profileImg: string | File) => {
      if (!user) {
        throw new Error(USER_ERROR_MESSAGES.UNAUTHORIZED);
      }

      try {
        console.log('프로필 이미지 업데이트 요청:', { userId, profileImg });
        const response = await updateUserProfileImg({ userId, profileImg });

        if (!response.data) {
          throw new Error(USER_ERROR_MESSAGES.UPDATE_PROFILE_IMAGE_FAILED);
        }

        const updatedUser = {
          ...user,
          profileImg: response.data.profileImg,
        };

        setUser(updatedUser);

        return response.data;
      } catch (error) {
        throw error;
      }
    },
    onSuccess: () => {
      toast.success(USER_SUCCESS_MESSAGES.UPDATE_PROFILE_IMAGE_SUCCESS);
    },
    onError: (error: unknown) => {
      if (error instanceof AxiosError) {
        if (error.response?.status === 400) {
          toast.error(USER_ERROR_MESSAGES.INVALID_FORM);
          return;
        }
        if (error.response?.status === 401 || error.response?.status === 403) {
          toast.error(USER_ERROR_MESSAGES.UNAUTHORIZED);
          return;
        }
      }
      toast.error(USER_ERROR_MESSAGES.UPDATE_PROFILE_IMAGE_FAILED);
      console.error('프로필 이미지 업데이트 실패:', error);
    },
  });
};
