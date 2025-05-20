'use client';

import { HiBell, HiUserGroup } from 'react-icons/hi';

import Button from '@components/common/Button';
import LogoutButton from '@components/mypage/Profile/LogoutButton';

import { useAuthStore } from '@stores/authStore';

interface HeaderActionButtonsProps {
  isHome?: boolean;
}

const HeaderActionButtons = ({ isHome = false }: HeaderActionButtonsProps) => {
  const isAuthenticated = useAuthStore((state) => state.isAuthenticated);

  const handleNotificationClick = () => {
    console.log('알림 버튼 클릭');
  };

  const handleFriendClick = () => {
    console.log('친구 버튼 클릭');
  };

  // 홈 화면이 아닌 경우
  if (!isHome) {
    return (
      <div className="flex items-center gap-4">
        <button
          className="rounded-full p-2 hover:bg-gray-100 cursor-pointer"
          aria-label="알림"
          onClick={handleNotificationClick}
        >
          <HiBell className="h-6 w-6 text-gray-600" />
        </button>
        <button
          className="rounded-full p-2 hover:bg-gray-100 cursor-pointer"
          aria-label="친구"
          onClick={handleFriendClick}
        >
          <HiUserGroup className="h-6 w-6 text-gray-600" />
        </button>
      </div>
    );
  }

  // 홈 화면인 경우
  if (!isAuthenticated) {
    return (
      <>
        <Button href="/login" variant="text" size="md">
          로그인
        </Button>
        <Button href="/signup" variant="primary" size="md">
          회원가입
        </Button>
      </>
    );
  } else {
    return <LogoutButton size="md" />;
  }
};

export default HeaderActionButtons;
