import { MYPAGE_ENDPOINTS } from '@constants/api';

import { User } from '@/stores/authStore';
import { ApiResponse } from '@/types/api';

import { axiosInstance } from '../axiosInstance';

export const getUserInfo = async (userId: string): Promise<ApiResponse<User>> => {
  const response = await axiosInstance.get(MYPAGE_ENDPOINTS.GET_USER_INFO(userId));
  console.log('사용자 정보 조회 응답:', response.data);

  return response.data;
};
