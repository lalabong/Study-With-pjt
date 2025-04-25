import { create } from 'zustand';
import { persist, createJSONStorage } from 'zustand/middleware';

import { postLogin } from '@/api/user/postLogin';
import { LoginRequest } from '@/types/api';

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

            if (accessToken && user) {
              set({ isAuthenticated: true });
            }
          }
        } catch (error) {
          throw error;
        }
      },
    }),
    {
      name: 'auth-storage',
      storage: createJSONStorage(() => {
        // 서버 사이드 렌더링 시 localStorage가 없으므로 빈 객체 반환
        if (typeof window === 'undefined') {
          return {
            getItem: () => null,
            setItem: () => null,
            removeItem: () => null,
          };
        }
        return localStorage;
      }),
      skipHydration: true, // 서버 렌더링 중에는 hydration 건너뛰기 (클라이언트에서 명시적으로 처리)
      partialize: (state) => ({
        accessToken: state.accessToken,
        user: state.user,
        isAuthenticated: state.isAuthenticated,
      }),
    },
  ),
);
