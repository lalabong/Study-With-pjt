'use client';

import { useEffect, useState, useRef } from 'react';

import { useRouter } from 'next/navigation';

import LoadingSpinner from '@components/common/LoadingSpinner';

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
    return (
      <div className="flex h-screen w-full items-center justify-center">
        <LoadingSpinner />
      </div>
    );
  }

  return children;
};

export default ProtectedRoute;
