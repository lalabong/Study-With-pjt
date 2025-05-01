import { axiosInstance } from '@api/axiosInstance';

import { MYPAGE_ENDPOINTS } from '@constants/api';

import { ApiResponse } from '@/types/api';

interface GetUserTotalStudyTimeResponse {
  totalStudyTime: number;
}

export const getUserTotalStudyTime = async (
  userId: string,
): Promise<ApiResponse<GetUserTotalStudyTimeResponse>> => {
  const response = await axiosInstance.get(MYPAGE_ENDPOINTS.GET_USER_TOTAL_STUDY_TIME(userId));
  console.log('사용자 총 학습 시간 조회 응답:', response.data);

  return response.data;
};
