'use client';

import { Button } from '@components/common';

import { useLogoutMutation } from '@hooks/api/useLogoutMutation';

const LogoutButton = () => {
  const { mutate: logout } = useLogoutMutation();

  const handleLogout = () => {
    logout();
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
