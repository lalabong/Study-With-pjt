'use client';

import { HiPlus } from 'react-icons/hi';

import { Button, UserProfile } from '@/components/common';
import { useAuthStore } from '@/stores/authStore';

const ProfileSection = () => {
  const handleAddSession = () => {
    console.log('방 생성하기 버튼 클릭');
  };

  const user = useAuthStore.getState().user;

  // 로딩스피너(임시)
  if (!user) {
    return (
      <div className="rounded-lg mb-7 bg-white p-6 shadow-sm">
        <div className="flex items-center justify-center">
          <div className="h-8 w-8 animate-spin rounded-full border-4 border-blue-500 border-t-transparent"></div>
        </div>
      </div>
    );
  }

  return (
    <div className="rounded-lg mb-7 bg-white p-6 shadow-sm">
      <div className="flex flex-wrap items-center justify-between gap-4">
        <UserProfile nickname={user.nickname} additionalInfo={user.createdAt} />
        <Button size="sm" className="bg-blue-500">
          <span className="flex items-center gap-1">
            <HiPlus className="h-4 w-4" onClick={() => handleAddSession()} />방 생성하기
          </span>
        </Button>
      </div>
    </div>
  );
};

export default ProfileSection;
