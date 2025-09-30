import { axiosInstance } from '@api/axiosInstance';

import { MYPAGE_ENDPOINTS } from '@constants/api';

import { useAuthStore } from '@stores/authStore';

interface PostTimeLogRequest {
  totalTime: number; // 분 단위
  roomId: string;
}

interface PostTimeLogResponse {
  status: string;
  message: string;
  data: {
    savedTime: number;
    totalStudyTime: number;
    date: string;
  };
}

export const postTimeLog = async (data: PostTimeLogRequest): Promise<PostTimeLogResponse> => {
  const userId = useAuthStore.getState().user?.userId;

  if (!userId) {
    throw new Error('로그인이 필요합니다.');
  }

  const response = await axiosInstance.post(MYPAGE_ENDPOINTS.POST_TIME_LOG(userId), data);
  return response.data;
};
