import { AUTH_ENDPOINTS } from '@/constants/api';
import { USER_ERROR_MESSAGES } from '@/constants/errorMessages';
import { ApiResponse, SignupRequest } from '@/types/api';

import { axiosInstance } from '../axiosInstance';

export const postSignup = async (data: SignupRequest): Promise<ApiResponse<null>> => {
  try {
    const response = await axiosInstance.post(AUTH_ENDPOINTS.SIGNUP, data);
    console.log('회원가입 응답:', response.data);

    return response.data;
  } catch (error) {
    console.error(USER_ERROR_MESSAGES.SIGNUP_FAILED, error);
    throw error;
  }
};
