'use client';

import { Button } from '@/components/common';

const LogoutButton = () => {
  const handleLogout = () => {
    console.log('로그아웃 버튼 클릭');
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
