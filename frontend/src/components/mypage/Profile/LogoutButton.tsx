'use client';

import { Button } from '@components/common';

import { useLogoutMutation } from '@hooks/api/useLogoutMutation';

interface LogoutButtonProps {
  size?: 'sm' | 'md' | 'lg';
  className?: string;
}

const LogoutButton = ({ size = 'sm', className }: LogoutButtonProps) => {
  const { mutate: logout } = useLogoutMutation();

  const handleLogout = () => {
    logout();
  };

  return (
    <div className={className}>
      <Button variant="secondary" size={size} onClick={handleLogout}>
        로그아웃
      </Button>
    </div>
  );
};

export default LogoutButton;
