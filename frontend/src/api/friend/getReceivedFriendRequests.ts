import { axiosInstance } from '@api/axiosInstance';

import { FRIEND_ENDPOINTS } from '@constants/api';

import { ApiResponse, ReceivedFriendRequest } from '@/types/api';

interface GetReceivedFriendRequestsRequest {
  userCuid: string;
}

interface GetReceivedFriendRequestsResponse {
  receivedFriendRequests: ReceivedFriendRequest[];
}

export const getReceivedFriendRequests = async (
  data: GetReceivedFriendRequestsRequest,
): Promise<ApiResponse<GetReceivedFriendRequestsResponse>> => {
  const { userCuid } = data;

  const response = await axiosInstance.get(FRIEND_ENDPOINTS.GET_RECEIVED_FRIEND_REQUESTS(userCuid));

  return response.data;
};
