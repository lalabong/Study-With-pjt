import { axiosInstance } from '@api/axiosInstance';

import { FRIEND_ENDPOINTS } from '@constants/api';

import { ApiResponse } from '@/types/api';

interface PostSendFriendRequestRequest {
  userCuid: string;
  friendCuid: string;
}

export const postSendFriendRequest = async (
  data: PostSendFriendRequestRequest,
): Promise<ApiResponse<null>> => {
  const { userCuid, friendCuid } = data;

  const response = await axiosInstance.post(FRIEND_ENDPOINTS.SEND_FRIEND_REQUEST(userCuid), {
    friendCuid,
  });

  return response.data;
};
