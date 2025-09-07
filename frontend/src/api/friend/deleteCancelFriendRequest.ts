import { axiosInstance } from '@api/axiosInstance';

import { FRIEND_ENDPOINTS } from '@constants/api';

import { ApiResponse } from '@/types/api';

interface DeleteCancelFriendRequestRequest {
  userCuid: string;
  friendCuid: string;
}

export const deleteCancelFriendRequest = async (
  data: DeleteCancelFriendRequestRequest,
): Promise<ApiResponse<null>> => {
  const { userCuid, friendCuid } = data;

  const response = await axiosInstance.delete(FRIEND_ENDPOINTS.CANCEL_FRIEND_REQUEST(userCuid), {
    data: { friendCuid },
  });

  return response.data;
};
