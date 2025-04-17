import { AUTH_ENDPOINTS } from '@/constants/api';
import { USER_ERROR_MESSAGES } from '@/constants/errorMessages';
import { ApiResponse, LoginRequest } from '@/types/api';
import { TOKEN_STORAGE } from '@/utils/auth';

import { axiosInstance } from '../axiosInstance';

export const postLogin = async (data: LoginRequest): Promise<ApiResponse<null>> => {
  try {
    const response = await axiosInstance.post(AUTH_ENDPOINTS.LOGIN, data);
    console.log('로그인 응답:', response.data);

    const { accessToken } = response.data;
    if (accessToken) {
      TOKEN_STORAGE.setAccessToken(accessToken);
    }

    return response.data;
  } catch (error) {
    console.error(USER_ERROR_MESSAGES.LOGIN_FAILED, error);
    throw error;
  }
};
