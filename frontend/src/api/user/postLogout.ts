import { AUTH_ENDPOINTS } from '@/constants/api';
import { USER_ERROR_MESSAGES } from '@/constants/errorMessages';
import { useAuthStore } from '@/stores/authStore';
import { ApiResponse } from '@/types/api';

import { axiosInstance } from '../axiosInstance';

export const postLogout = async (): Promise<ApiResponse<null>> => {
  try {
    const response = await axiosInstance.post(AUTH_ENDPOINTS.LOGOUT);
    console.log('로그아웃 응답:', response.data);

    // Zustand 스토어에서 로그아웃 액션 실행
    useAuthStore.getState().logout();

    return response.data;
  } catch (error) {
    console.error(USER_ERROR_MESSAGES.UNKNOWN_ERROR, error);

    // API 실패해도 클라이언트에서 로그아웃 처리
    useAuthStore.getState().logout();

    throw error;
  }
};
