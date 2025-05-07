import { axiosInstance } from '@api/axiosInstance';

import { AUTH_ENDPOINTS } from '@constants/api';

import { User } from '@stores/authStore';

import { ApiResponse } from '@/types/api';

export interface PostLoginRequest {
  userId: string;
  password: string;
}

export interface PostLoginResponse {
  accessToken: string;
  user: User;
}

export const postLogin = async (
  data: PostLoginRequest,
): Promise<ApiResponse<PostLoginResponse>> => {
  const { userId, password } = data;

  const response = await axiosInstance.post(AUTH_ENDPOINTS.LOGIN, {
    userId,
    password,
  });
  console.log('로그인 응답:', response.data);

  return response.data;
};
