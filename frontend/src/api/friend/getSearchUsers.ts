import { axiosInstance } from '@api/axiosInstance';

import { FRIEND_ENDPOINTS } from '@constants/api';

import { ApiResponse, SearchedUser } from '@/types/api';

interface GetSearchUsersRequest {
  nickname: string;
}

interface GetSearchUsersResponse {
  users: SearchedUser[];
  count: number;
}

export const getSearchUsers = async (
  data: GetSearchUsersRequest,
): Promise<ApiResponse<GetSearchUsersResponse>> => {
  const { nickname } = data;

  const response = await axiosInstance.get(FRIEND_ENDPOINTS.SEARCH_USERS, {
    params: { nickname },
  });

  return response.data;
};
