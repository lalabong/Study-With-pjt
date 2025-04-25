'use client';

import { useEffect, useState } from 'react';

import LoadingSpinner from '@/components/common/LoadingSpinner';
import { useAuthStore } from '@/stores/authStore';

export default function StoreHydrationProvider({ children }: { children: React.ReactNode }) {
  const [isHydrated, setIsHydrated] = useState(false);

  useEffect(() => {
    (async () => {
      try {
        // localStorage에서 직접 auth 데이터 가져오기(안전성 강화)

        // 서버 환경인지, 클라이언트 환경인지 확인
        if (typeof window !== 'undefined') {
          const authData = localStorage.getItem('auth-storage');

          if (authData) {
            const parsedData = JSON.parse(authData);

            if (parsedData.state?.user) {
              useAuthStore.getState().setUser(parsedData.state.user);
            }

            if (parsedData.state?.accessToken) {
              useAuthStore.getState().setAccessToken(parsedData.state.accessToken);
            }

            if (parsedData.state?.isAuthenticated) {
              useAuthStore.setState({ isAuthenticated: true });
            }
          }
        }

        await useAuthStore.persist.rehydrate();

        setIsHydrated(true);
      } catch {
        setIsHydrated(true);
      }
    })();

    return () => {};
  }, []);

  if (!isHydrated) {
    return (
      <div className="flex h-screen w-full items-center justify-center">
        <LoadingSpinner />
      </div>
    );
  }

  return <>{children}</>;
}
