'use client';

import { Button } from '@components/common';

import { useLogoutMutation } from '@hooks/api/useLogoutMutation';

interface LogoutButtonProps {
  size?: 'sm' | 'md' | 'lg';
  className?: string;
  variant?: 'primary' | 'secondary' | 'text';
}

const LogoutButton = ({ size = 'sm', className, variant = 'secondary' }: LogoutButtonProps) => {
  const { mutate: logout } = useLogoutMutation();

  const handleLogout = () => {
    logout();
  };

  return (
    <div className={className}>
      <Button variant={variant} size={size} onClick={handleLogout}>
        로그아웃
      </Button>
    </div>
  );
};

export default LogoutButton;
