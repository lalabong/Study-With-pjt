import { AxiosResponse } from 'axios';

import { AUTH_ENDPOINTS } from '@/constants/api';
import { TOKEN_STORAGE } from '@/utils/auth';

import { axiosInstance } from '../axiosInstance';

export interface SignupRequest {
  userId: string;
  password: string;
  nickname: string;
}

export interface SignupResponse {
  status: string;
  message: string;
  user: {
    id: string;
    userId: string;
    nickname: string;
    profileImage: string | null;
  };
  accessToken: string;
}

export const postSignup = async (data: SignupRequest): Promise<SignupResponse> => {
  try {
    const response: AxiosResponse<SignupResponse> = await axiosInstance.post(
      AUTH_ENDPOINTS.SIGNUP,
      data,
    );
    console.log('회원가입 응답:', response.data);
    const { accessToken } = response.data;
    TOKEN_STORAGE.setAccessToken(accessToken);

    return response.data;
  } catch (error) {
    console.error('회원가입 에러:', error);
    throw error;
  }
};
