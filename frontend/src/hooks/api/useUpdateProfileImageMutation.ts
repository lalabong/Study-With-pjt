import { useMutation } from '@tanstack/react-query';
import { AxiosError } from 'axios';
import { toast } from 'react-toastify';

import { patchUserProfileImg } from '@api/user/patchUserProfileImg';

import { USER_ERROR_MESSAGES } from '@constants/errorMessages';
import { USER_SUCCESS_MESSAGES } from '@constants/successMessages';

import { useAuthStore } from '@stores/authStore';

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
        const response = await patchUserProfileImg({ userId, profileImg });

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
        const errorCode = (error as AxiosError<{ errorCode?: number }>).response?.data?.errorCode;

        switch (errorCode) {
          case 3001:
            toast.error(USER_ERROR_MESSAGES.USER_NOT_FOUND);
            return;
          case 3003:
            toast.error(USER_ERROR_MESSAGES.FILE_TOO_LARGE);
            return;
          case 3004:
            toast.error(USER_ERROR_MESSAGES.UNSUPPORTED_FILE_TYPE);
            return;
          case 3005:
            toast.error(USER_ERROR_MESSAGES.FILE_UPLOAD_ERROR);
            return;
          case 2001:
            toast.error(USER_ERROR_MESSAGES.SERVER_ERROR);
            return;
          case 1005:
            toast.error(USER_ERROR_MESSAGES.UNAUTHORIZED);
            return;
          default:
            toast.error(USER_ERROR_MESSAGES.UPDATE_PROFILE_IMAGE_FAILED);
            console.error('프로필 이미지 업데이트 실패:', error);
        }
      } else {
        toast.error(USER_ERROR_MESSAGES.UPDATE_PROFILE_IMAGE_FAILED);
        console.error('프로필 이미지 업데이트 실패:', error);
      }
    },
  });
};
