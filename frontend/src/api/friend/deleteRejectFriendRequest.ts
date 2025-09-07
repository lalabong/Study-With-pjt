import { axiosInstance } from '@api/axiosInstance';

import { FRIEND_ENDPOINTS } from '@constants/api';

import { ApiResponse } from '@/types/api';

interface DeleteRejectFriendRequestRequest {
  userCuid: string;
  friendCuid: string;
}

export const deleteRejectFriendRequest = async (
  data: DeleteRejectFriendRequestRequest,
): Promise<ApiResponse<null>> => {
  const { userCuid, friendCuid } = data;

  const response = await axiosInstance.delete(FRIEND_ENDPOINTS.REJECT_FRIEND_REQUEST(userCuid), {
    data: { friendCuid },
  });

  return response.data;
};
