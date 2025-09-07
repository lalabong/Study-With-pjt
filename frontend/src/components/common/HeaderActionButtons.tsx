'use client';

import { useRouter } from 'next/navigation';

import { HiBell, HiUserGroup } from 'react-icons/hi';

import Button from '@components/common/Button';
import FriendRequestModal from '@components/friends/FriendRequestModal';
import FriendsModal from '@components/friends/FriendsModal';
import LogoutButton from '@components/mypage/Profile/LogoutButton';
import NotificationModal from '@components/notification/NotificationModal';

import { useAuthStore } from '@stores/authStore';
import { useModalStore } from '@stores/modalStore';

interface HeaderActionButtonsProps {
  isHome?: boolean;
}

const HeaderActionButtons = ({ isHome = false }: HeaderActionButtonsProps) => {
  const router = useRouter();
  const isAuthenticated = useAuthStore((state) => state.isAuthenticated);
  const setIsFriendsModalOpen = useModalStore((state) => state.setIsFriendsModalOpen);
  const isNotificationModalOpen = useModalStore((state) => state.isNotificationModalOpen);
  const setIsNotificationModalOpen = useModalStore((state) => state.setIsNotificationModalOpen);

  const handleNotificationClick = (): void => {
    setIsNotificationModalOpen(true);
  };

  const handleFriendClick = (): void => {
    setIsFriendsModalOpen(true);
  };

  const handleStartClick = (): void => {
    router.push('/mypage');
  };

  // 홈 화면이 아닌 경우
  if (!isHome) {
    return (
      <div className="flex items-center gap-4">
        <FriendsModal />
        <FriendRequestModal />
        <NotificationModal
          isOpen={isNotificationModalOpen}
          onClose={() => setIsNotificationModalOpen(false)}
        />
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
    return (
      <>
        <LogoutButton variant="text" size="md" />
        <Button variant="primary" size="md" onClick={handleStartClick}>
          시작하기
        </Button>
      </>
    );
  }
};

export default HeaderActionButtons;
