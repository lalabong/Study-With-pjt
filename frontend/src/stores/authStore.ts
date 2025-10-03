import { create } from 'zustand';
import { persist, createJSONStorage } from 'zustand/middleware';

export interface User {
  id: string;
  userId: string;
  nickname: string;
  profileImg?: string | null;
  createdAt: string;
}

interface AuthState {
  accessToken: string | null;
  user: User | null;
  isAuthenticated: boolean;

  setAccessToken: (token: string) => void;
  removeAccessToken: () => void;
  setUser: (user: User | null) => void;
  clearAuthState: () => void;
}

export const useAuthStore = create<AuthState>()(
  persist(
    (set, get) => ({
      accessToken: null,
      user: null,
      isAuthenticated: false,

      setAccessToken: (token: string) => {
        set({ accessToken: token });
        // 토큰과 사용자 정보가 모두 있으면 인증됨으로 설정
        const { user } = get();
        if (user) {
          set({ isAuthenticated: true });
        }
      },
      removeAccessToken: () => set({ accessToken: null, isAuthenticated: false }),
      setUser: (user: User | null) => {
        set({ user });
        // 사용자 정보와 토큰이 모두 있으면 인증됨으로 설정
        const { accessToken } = get();
        if (user && accessToken) {
          set({ isAuthenticated: true });
        } else if (!user) {
          set({ isAuthenticated: false });
        }
      },
      clearAuthState: () => set({ accessToken: null, user: null, isAuthenticated: false }),
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
