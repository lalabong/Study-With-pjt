'use client';

import { useRouter } from 'next/navigation';
import { useEffect, useState } from 'react';

import { useAuthStore } from '@/stores/authStore';

interface ProtectedRouteProps {
  children: React.ReactNode;
}

const ProtectedRoute = ({ children }: ProtectedRouteProps) => {
  const router = useRouter();
  const [isLoading, setIsLoading] = useState(true);
  const isAuthenticated = useAuthStore.getState().isAuthenticated();

  useEffect(() => {
    if (!isAuthenticated) {
      router.push('/login');
    } else {
      setIsLoading(false);
    }
  }, [router, isAuthenticated]);

  if (isLoading) {
    return (
      <div className="flex h-screen w-full items-center justify-center">
        <div className="h-12 w-12 animate-spin rounded-full border-4 border-blue-500 border-t-transparent"></div>
      </div>
    );
  }

  return isAuthenticated ? children : null;
};

export default ProtectedRoute;
