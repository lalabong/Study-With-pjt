import { axiosInstance } from '@api/axiosInstance';

import { FRIEND_ENDPOINTS } from '@constants/api';

import { ApiResponse } from '@/types/api';

interface DeleteFriendRequest {
  userCuid: string;
  friendCuid: string;
}

export const deleteFriend = async (data: DeleteFriendRequest): Promise<ApiResponse<null>> => {
  const { userCuid, friendCuid } = data;

  const response = await axiosInstance.delete(FRIEND_ENDPOINTS.DELETE_FRIEND(userCuid), {
    data: { friendCuid },
  });

  return response.data;
};
