import { axiosInstance } from '@api/axiosInstance';

import { AUTH_ENDPOINTS } from '@constants/api';

import { ApiResponse } from '@/types/api';

import { PostLoginRequest } from './postLogin';

export interface SignupRequest extends PostLoginRequest {
  nickname: string;
}

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
