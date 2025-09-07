import { axiosInstance } from '@api/axiosInstance';

import { FRIEND_ENDPOINTS } from '@constants/api';

import { ApiResponse } from '@/types/api';

interface PostAcceptFriendRequestRequest {
  userCuid: string;
  friendCuid: string;
}

export const postAcceptFriendRequest = async (
  data: PostAcceptFriendRequestRequest,
): Promise<ApiResponse<null>> => {
  const { userCuid, friendCuid } = data;

  const response = await axiosInstance.post(FRIEND_ENDPOINTS.ACCEPT_FRIEND_REQUEST(userCuid), {
    friendCuid,
  });

  return response.data;
};
