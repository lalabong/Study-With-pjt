'use client';

import { useEffect, useState, useRef } from 'react';

import { useRouter } from 'next/navigation';

import StatusMessage from '@components/common/StatusMessage';

import { useAuthStore } from '@stores/authStore';

interface ProtectedRouteProps {
  children: React.ReactNode;
}

const ProtectedRoute = ({ children }: ProtectedRouteProps) => {
  const router = useRouter();
  const [isLoading, setIsLoading] = useState(true);
  const { isAuthenticated, user } = useAuthStore();
  const isRedirecting = useRef(false);

  useEffect(() => {
    if (typeof window !== 'undefined') {
      if ((!isAuthenticated || !user) && !isRedirecting.current) {
        isRedirecting.current = true;
        router.replace(`/login?redirect=${encodeURIComponent(window.location.pathname)}`);
      } else if (isAuthenticated && user) {
        setIsLoading(false);
      }
    }
  }, [isAuthenticated, user, router]);

  if (isLoading) {
    return <StatusMessage status="loading" message="인증 확인 중..." className="h-screen" />;
  }

  return children;
};

export default ProtectedRoute;
