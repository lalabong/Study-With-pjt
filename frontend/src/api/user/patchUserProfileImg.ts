import { axiosInstance } from '@api/axiosInstance';

import { MYPAGE_ENDPOINTS } from '@constants/api';

import { ApiResponse } from '@/types/api';

interface PatchUserProfileImgRequest {
  userId: string;
  profileImg: string | File;
}

interface PatchUserProfileImgResponse {
  profileImg: string | null;
}

export const patchUserProfileImg = async (
  data: PatchUserProfileImgRequest,
): Promise<ApiResponse<PatchUserProfileImgResponse>> => {
  // File 객체인 경우에만 FormData 사용
  if (data.profileImg instanceof File) {
    const formData = new FormData();
    formData.append('profileImg', data.profileImg);

    const response = await axiosInstance.patch(
      MYPAGE_ENDPOINTS.UPDATE_USER_PROFILE_IMG(data.userId),
      formData,
    );
    return response.data;
  }
  // URL 문자열인 경우 JSON으로 전송
  else if (typeof data.profileImg === 'string') {
    const response = await axiosInstance.patch(
      MYPAGE_ENDPOINTS.UPDATE_USER_PROFILE_IMG(data.userId),
      { profileImg: data.profileImg },
    );
    return response.data;
  }
  // null로 설정하려는 경우 (이미지 삭제)
  else {
    const response = await axiosInstance.patch(
      MYPAGE_ENDPOINTS.UPDATE_USER_PROFILE_IMG(data.userId),
      { profileImg: null },
    );
    return response.data;
  }
};
