'use client';

import { useEffect, useState } from 'react';

import { usePathname } from 'next/navigation';

import { useCurrentRoomQuery } from '@hooks/api/useCurrentRoomQuery';

export const useCurrentRoomToast = () => {
  const [showToast, setShowToast] = useState(false);
  const pathname = usePathname();
  const { data: currentRoomData } = useCurrentRoomQuery();

  useEffect(() => {
    // mypage 또는 user 페이지에 있고, 현재 참여 중인 방이 있을 때만 toast를 보여줌
    const isUserPage = pathname === '/mypage' || pathname.startsWith('/user/');
    const hasCurrentRoom = !!currentRoomData?.currentRoom;

    if (isUserPage && hasCurrentRoom) {
      const timer = setTimeout(() => {
        setShowToast(true);
      }, 1000);

      return () => clearTimeout(timer);
    } else {
      setShowToast(false);
    }
  }, [pathname, currentRoomData]);

  const hideToast = () => {
    setShowToast(false);
  };

  return {
    showToast,
    hideToast,
    currentRoom: currentRoomData?.currentRoom,
  };
};
