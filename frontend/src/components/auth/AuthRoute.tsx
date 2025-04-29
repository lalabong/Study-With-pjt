'use client';

import { useEffect, useRef, useState } from 'react';

import { useRouter } from 'next/navigation';

import LoadingSpinner from '@components/common/LoadingSpinner';

import { useAuthStore } from '@stores/authStore';

interface AuthRouteProps {
  children: React.ReactNode;
}

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
    return (
      <div className="flex h-screen w-full items-center justify-center">
        <LoadingSpinner />
      </div>
    );
  }

  return children;
};

export default AuthRoute;
