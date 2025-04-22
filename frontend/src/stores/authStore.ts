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

  setAccessToken: (token: string) => void;
  removeAccessToken: () => void;
  setUser: (user: User | null) => void;
  logout: () => void;

  login: (
    data: LoginRequest,
    onSuccess?: () => void,
    onError?: (errorMessage: string) => void,
  ) => Promise<void>;
  signup: (
    data: SignupRequest,
    onSuccess?: () => void,
    onError?: (errorMessage: string) => void,
  ) => Promise<void>;

  isAuthenticated: () => boolean;
}

export const useAuthStore = create<AuthState>()(
  persist(
    (set, get) => ({
      accessToken: null,
      user: null,

      setAccessToken: (token: string) => set({ accessToken: token }),
      removeAccessToken: () => set({ accessToken: null }),
      setUser: (user: User | null) => set({ user }),
      logout: () => set({ accessToken: null, user: null }),

      login: async (data: LoginRequest, onSuccess, onError) => {
        try {
          const response = await postLogin(data);
          if (response.data) {
            const { accessToken, user } = response.data;

            if (accessToken) {
              get().setAccessToken(accessToken);
            }

            if (user) {
              get().setUser(user);
            }
          }

          if (onSuccess) {
            onSuccess();
          }
        } catch (error) {
          const axiosError = error as AxiosError<{ message: string }>;
          const errorMessage =
            axiosError.response?.data?.message || USER_ERROR_MESSAGES.LOGIN_FAILED;

          if (onError) {
            onError(errorMessage);
          }

          throw error;
        }
      },

      signup: async (data: SignupRequest, onSuccess, onError) => {
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

          if (onSuccess) {
            onSuccess();
          }
        } catch (error) {
          const axiosError = error as AxiosError<{ message: string }>;
          const errorMessage =
            axiosError.response?.data?.message || USER_ERROR_MESSAGES.SIGNUP_FAILED;

          if (onError) {
            onError(errorMessage);
          }

          throw error;
        }
      },

      isAuthenticated: () => !!get().accessToken && !!get().user,
    }),
    {
      name: 'auth-storage',
      partialize: (state) => ({
        accessToken: state.accessToken,
        user: state.user,
      }),
    },
  ),
);
