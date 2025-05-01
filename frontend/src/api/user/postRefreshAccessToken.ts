import axios from 'axios';

import { AUTH_ENDPOINTS } from '@constants/api';

import { ApiResponse } from '@/types/api';

export interface AccessTokenResponse {
  accessToken: string;
}

export const postRefreshAccessToken = async (): Promise<ApiResponse<AccessTokenResponse>> => {
  const response = await axios.post(
    `${process.env.NEXT_PUBLIC_API_URL}${AUTH_ENDPOINTS.REFRESH_TOKEN}`,
    {},
    { withCredentials: true },
  );
  console.log('토큰 갱신 응답:', response.data);
  return response.data;
};
