'use client';

import { useRouter } from 'next/navigation';
import { toast } from 'react-toastify';

import { postLogout } from '@/api/user/postLogout';
import { Button } from '@/components/common';
import { USER_SUCCESS_MESSAGES } from '@/constants/successMessages';
import { useAuthStore } from '@/stores/authStore';
const LogoutButton = () => {
  const { logout } = useAuthStore.getState();
  const router = useRouter();

  const handleLogout = async () => {
    try {
      await postLogout();
      logout();
      toast.success(USER_SUCCESS_MESSAGES.LOGOUT_SUCCESS);
      router.push('/');
    } catch (error) {
      console.error('로그아웃 중 오류 발생:', error);

      logout();
      router.push('/');
    }
  };

  return (
    <div className="mt-8 flex justify-end">
      <Button variant="secondary" size="sm" onClick={handleLogout}>
        로그아웃
      </Button>
    </div>
  );
};

export default LogoutButton;
