import { axiosInstance } from '@api/axiosInstance';

import { MYPAGE_ENDPOINTS } from '@constants/api';

import { ApiResponse } from '@/types/api';

interface PatchUserNicknameRequest {
  nickname: string;
}

interface PatchUserNicknameResponse {
  nickname: string;
}

export const patchUserNickname = async (
  userId: string,
  data: PatchUserNicknameRequest,
): Promise<ApiResponse<PatchUserNicknameResponse>> => {
  const response = await axiosInstance.patch(MYPAGE_ENDPOINTS.UPDATE_USER_NICKNAME(userId), data);
  console.log('닉네임 업데이트 응답:', response.data);

  return response.data;
};
