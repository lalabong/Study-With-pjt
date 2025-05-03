import { axiosInstance } from '@api/axiosInstance';

import { MYPAGE_ENDPOINTS } from '@constants/api';

import { ApiResponse } from '@/types/api';

interface UpdateNicknameRequest {
  nickname: string;
}

interface UpdateNicknameResponse {
  nickname: string;
}

export const updateUserNickname = async (
  userId: string,
  data: UpdateNicknameRequest,
): Promise<ApiResponse<UpdateNicknameResponse>> => {
  const response = await axiosInstance.patch(MYPAGE_ENDPOINTS.UPDATE_USER_NICKNAME(userId), data);
  console.log('닉네임 업데이트 응답:', response.data);

  return response.data;
};
