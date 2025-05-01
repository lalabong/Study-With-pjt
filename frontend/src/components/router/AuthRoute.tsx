'use client';

import { useEffect, useRef, useState } from 'react';

import { useRouter } from 'next/navigation';

import StatusMessage from '@components/common/StatusMessage';

import { useAuthStore } from '@stores/authStore';

interface AuthRouteProps {
  children: React.ReactNode;
}

// 로그인 시 로그인, 회원가입 페이지 접근 못하게 막는 라우트
const AuthRoute = ({ children }: AuthRouteProps) => {
  const router = useRouter();
  const [isLoading, setIsLoading] = useState(true);
  const { isAuthenticated, user } = useAuthStore();
  const isRedirecting = useRef(false);

  useEffect(() => {
    if (typeof window !== 'undefined') {
      if (isAuthenticated && user && !isRedirecting.current) {
        isRedirecting.current = true;
        router.push('/mypage');
      } else {
        setIsLoading(false);
      }
    }
  }, [isAuthenticated, user, router]);

  if (isLoading) {
    return <StatusMessage status="loading" message="페이지 준비 중..." className="h-screen" />;
  }

  return children;
};

export default AuthRoute;
