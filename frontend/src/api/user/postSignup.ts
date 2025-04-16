import { AxiosResponse } from 'axios';

import { TOKEN_STORAGE } from '@/utils/auth';
import { AUTH_ENDPOINTS } from '@/constants/api';

import { axiosInstance } from '../axiosInstance';

export interface SignupRequest {
  userId: string;
  password: string;
  nickname: string;
}

export interface SignupResponse {
  status: string;
  message: string;
  data: {
    user: {
      id: string;
      userId: string;
      nickname: string;
    };
    accessToken: string;
  };
}

export const postSignup = async (data: SignupRequest): Promise<SignupResponse> => {
  try {
    const response: AxiosResponse<SignupResponse> = await axiosInstance.post(AUTH_ENDPOINTS.SIGNUP, data);

    const { accessToken } = response.data.data;
    TOKEN_STORAGE.setAccessToken(accessToken);

    return response.data;
  } catch (error) {
    console.error('회원가입 에러:', error);
    throw error;
  }
};
