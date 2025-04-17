import { AUTH_ENDPOINTS } from '@/constants/api';
import { USER_ERROR_MESSAGES } from '@/constants/errorMessages';
import { useAuthStore } from '@/stores/authStore';
import { ApiResponse, SignupRequest } from '@/types/api';

import { axiosInstance } from '../axiosInstance';

export const postSignup = async (data: SignupRequest): Promise<ApiResponse<null>> => {
  try {
    const response = await axiosInstance.post(AUTH_ENDPOINTS.SIGNUP, data);
    console.log('회원가입 응답:', response.data);

    const { accessToken, user } = response.data;

    if (accessToken) {
      useAuthStore.getState().setAccessToken(accessToken);
    }

    if (user) {
      useAuthStore.getState().setUser(user);
    }

    return response.data;
  } catch (error) {
    console.error(USER_ERROR_MESSAGES.SIGNUP_FAILED, error);
    throw error;
  }
};
