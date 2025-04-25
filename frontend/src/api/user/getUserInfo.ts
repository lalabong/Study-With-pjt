import { MYPAGE_ENDPOINTS } from '@/constants';
import { ApiResponse, UserInfoResponse } from '@/types/api';

import { axiosInstance } from '../axiosInstance';

export const getUserInfo = async (userId: string): Promise<ApiResponse<UserInfoResponse>> => {
  const response = await axiosInstance.get(MYPAGE_ENDPOINTS.GET_USER_INFO(userId));
  console.log('사용자 정보 조회 응답:', response.data);

  return response.data;
};
