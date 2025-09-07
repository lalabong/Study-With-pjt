import { axiosInstance } from '@api/axiosInstance';

import { FRIEND_ENDPOINTS } from '@constants/api';

import { ApiResponse, FriendUser } from '@/types/api';

interface GetFriendsRequest {
  userCuid: string;
}

interface GetFriendsResponse {
  friends: FriendUser[];
}

export const getFriends = async (
  data: GetFriendsRequest,
): Promise<ApiResponse<GetFriendsResponse>> => {
  const { userCuid } = data;

  const response = await axiosInstance.get(FRIEND_ENDPOINTS.GET_FRIENDS(userCuid));

  return response.data;
};
