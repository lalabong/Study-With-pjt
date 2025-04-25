import axios from 'axios';

import { AUTH_ENDPOINTS } from '@/constants/api';
import { ApiResponse, AuthResponse } from '@/types/api';

export const postRefreshAccessToken = async (): Promise<ApiResponse<AuthResponse>> => {
  const response = await axios.post(
    `${process.env.NEXT_PUBLIC_API_URL}${AUTH_ENDPOINTS.REFRESH_TOKEN}`,
    {},
    { withCredentials: true },
  );
  console.log('토큰 갱신 응답:', response.data);
  return response.data;
};
