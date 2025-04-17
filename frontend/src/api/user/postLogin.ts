import { AUTH_ENDPOINTS } from '@/constants/api';
import { USER_ERROR_MESSAGES } from '@/constants/errorMessages';
import { useAuthStore } from '@/stores/authStore';
import { LoginRequest, LoginResponse } from '@/types/api';

import { axiosInstance } from '../axiosInstance';

export const postLogin = async (data: LoginRequest): Promise<LoginResponse> => {
  try {
    const response = await axiosInstance.post(AUTH_ENDPOINTS.LOGIN, data);
    console.log('로그인 응답:', response.data);

    const { accessToken, user } = response.data;

    if (accessToken) {
      useAuthStore.getState().setAccessToken(accessToken);
    }

    // 사용자 정보가 있으면 스토어에 저장(소셜 로그인 대비)
    if (user) {
      useAuthStore.getState().setUser(user);
    }

    return response.data;
  } catch (error) {
    console.error(USER_ERROR_MESSAGES.LOGIN_FAILED, error);
    throw error;
  }
};
