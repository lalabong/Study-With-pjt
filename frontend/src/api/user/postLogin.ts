import { AUTH_ENDPOINTS } from '@/constants/api';
import { USER_ERROR_MESSAGES } from '@/constants/errorMessages';
import { ApiResponse, LoginRequest, LoginResponse } from '@/types/api';

import { axiosInstance } from '../axiosInstance';

export const postLogin = async (data: LoginRequest): Promise<ApiResponse<LoginResponse>> => {
  try {
    const response = await axiosInstance.post(AUTH_ENDPOINTS.LOGIN, data);
    console.log('로그인 응답:', response.data);

    return response.data;
  } catch (error) {
    console.error(USER_ERROR_MESSAGES.LOGIN_FAILED, error);
    throw error;
  }
};
