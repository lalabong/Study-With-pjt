import { axiosInstance } from '@api/axiosInstance';

import { MYPAGE_ENDPOINTS } from '@constants/api';

import { User } from '@stores/authStore';

import { ApiResponse } from '@/types/api';

interface GetUserInfoRequest {
  userId: string;
}

interface GetUserInfoResponse {
  user: User;
}

export const getUserInfo = async (
  data: GetUserInfoRequest,
): Promise<ApiResponse<GetUserInfoResponse>> => {
  const { userId } = data;

  const response = await axiosInstance.get(MYPAGE_ENDPOINTS.GET_USER_INFO(userId));
  console.log('사용자 정보 조회 응답:', response.data);

  return response.data;
};
