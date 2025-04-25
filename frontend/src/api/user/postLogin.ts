import { AUTH_ENDPOINTS } from '@/constants/api';
import { ApiResponse, LoginRequest, LoginResponse } from '@/types/api';

import { axiosInstance } from '../axiosInstance';

export const postLogin = async ({
  userId,
  password,
}: LoginRequest): Promise<ApiResponse<LoginResponse>> => {
  const response = await axiosInstance.post(AUTH_ENDPOINTS.LOGIN, {
    userId,
    password,
  });

  return response.data;
};
