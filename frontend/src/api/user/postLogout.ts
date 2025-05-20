import { axiosInstance } from '@api/axiosInstance';

import { AUTH_ENDPOINTS } from '@constants/api';

import { ApiResponse } from '@/types/api';

export const postLogout = async (): Promise<ApiResponse<null>> => {
  const response = await axiosInstance.post(AUTH_ENDPOINTS.LOGOUT);
  console.log('로그아웃 응답:', response.data);

  return response.data;
};
