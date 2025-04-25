import { create } from 'zustand';
import { persist } from 'zustand/middleware';

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
      partialize: (state) => ({
        accessToken: state.accessToken,
        user: state.user,
        isAuthenticated: state.isAuthenticated,
      }),
    },
  ),
);
