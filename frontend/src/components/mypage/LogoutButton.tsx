'use client';

import { useRouter } from 'next/navigation';

import { Button } from '@/components/common';
import { useAuthStore } from '@/stores/authStore';
const LogoutButton = () => {
  const { logout } = useAuthStore.getState();
  const router = useRouter();

  const handleLogout = () => {
    logout();
    router.push('/');
  };

  return (
    <div className="mt-8 flex justify-end">
      <Button variant="secondary" size="sm" onClick={() => handleLogout()}>
        로그아웃
      </Button>
    </div>
  );
};

export default LogoutButton;
