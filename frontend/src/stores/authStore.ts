import { AxiosError } from 'axios';
import { create } from 'zustand';
import { persist } from 'zustand/middleware';

import { postLogin } from '@/api/user/postLogin';
import { USER_ERROR_MESSAGES } from '@/constants/errorMessages';
import { LoginRequest, SignupRequest } from '@/types/api';

export interface User {
  id: string;
  userId: string;
  nickname: string;
  profileImage?: string | null;
  createdAt: string;
}

interface AuthState {
  accessToken: string | null;
  user: User | null;
  isAuthenticated: boolean;

  setAccessToken: (token: string) => void;
  removeAccessToken: () => void;
  setUser: (user: User | null) => void;
  logout: () => void;

  login: (data: LoginRequest) => Promise<void>;
  signup: (data: SignupRequest) => Promise<void>;
}

export const useAuthStore = create<AuthState>()(
  persist(
    (set, get) => ({
      accessToken: null,
      user: null,
      isAuthenticated: false,

      setAccessToken: (token: string) => set({ accessToken: token }),
      removeAccessToken: () => set({ accessToken: null, isAuthenticated: false }),
      setUser: (user: User | null) => set({ user }),
      logout: () => set({ accessToken: null, user: null, isAuthenticated: false }),

      login: async ({ userId, password }: LoginRequest) => {
        try {
          const response = await postLogin({ userId, password });
          if (response.data) {
            const { accessToken, user } = response.data;

            if (accessToken) {
              get().setAccessToken(accessToken);
            }

            if (user) {
              get().setUser(user);
            }

            // 인증 상태를 true로 설정
            if (accessToken && user) {
              set({ isAuthenticated: true });
            }
          }
        } catch (error) {
          // 백엔드에서 넘겨준 메세지가 있을 경우
          if (error instanceof AxiosError && error.response?.data?.message) {
            console.log('authstore에서 넘겨준다!!', error.response.data.message);
            throw error.response.data.message;
          }

          // 상태 코드별 에러 처리
          if (error instanceof AxiosError && error.response?.status === 401) {
            throw USER_ERROR_MESSAGES.LOGIN_FAILED;
          }

          // 네트워크 에러 처리
          if (error instanceof AxiosError && error.code === 'ECONNABORTED') {
            throw USER_ERROR_MESSAGES.TIMEOUT_ERROR;
          }

          if (error instanceof AxiosError && !error.response) {
            throw USER_ERROR_MESSAGES.NETWORK_ERROR;
          }

          // 기타 에러 처리
          throw USER_ERROR_MESSAGES.UNKNOWN_ERROR;
        }
      },

      signup: async (_data: SignupRequest) => {
        try {
          // const response = await postSignup(data);
          // // 응답에서 토큰과 사용자 정보 추출 (자동 로그인의 경우)
          // const { accessToken, user } = response;
          // // 자동 로그인이 설정된 경우 상태 업데이트
          // if (accessToken) {
          //   get().setAccessToken(accessToken);
          // }
          // if (user) {
          //   get().setUser(user);
          // }
          // // 자동 로그인 시 인증 상태 true 설정
          // if (accessToken && user) {
          //   set({ isAuthenticated: true });
          // }
        } catch (error) {
          if (error instanceof AxiosError && error.response?.data?.message) {
            throw error.response.data.message;
          }

          throw USER_ERROR_MESSAGES.SIGNUP_FAILED;
        }
      },
    }),
    {
      name: 'auth-storage',
      partialize: (state) => ({
        accessToken: state.accessToken,
        user: state.user,
        isAuthenticated: state.isAuthenticated,
      }),
    },
  ),
);
