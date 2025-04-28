import { AUTH_ENDPOINTS } from '@constants/api';

import { ApiResponse, SignupRequest } from '@/types/api';

import { axiosInstance } from '../axiosInstance';

export const postSignup = async ({
  userId,
  nickname,
  password,
}: SignupRequest): Promise<ApiResponse<null>> => {
  const response = await axiosInstance.post(AUTH_ENDPOINTS.SIGNUP, {
    userId,
    nickname,
    password,
  });
  console.log('회원가입 응답:', response.data);

  return response.data;
};
