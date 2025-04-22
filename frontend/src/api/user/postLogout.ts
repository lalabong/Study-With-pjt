import { AUTH_ENDPOINTS } from '@/constants/api';
import { USER_ERROR_MESSAGES } from '@/constants/errorMessages';
import { ApiResponse } from '@/types/api';

import { axiosInstance } from '../axiosInstance';

export const postLogout = async (): Promise<ApiResponse<null>> => {
  try {
    const response = await axiosInstance.post(AUTH_ENDPOINTS.LOGOUT);
    console.log('로그아웃 응답:', response.data);

    return response.data;
  } catch (error) {
    console.error(USER_ERROR_MESSAGES.UNKNOWN_ERROR, error);
    throw error;
  }
};
