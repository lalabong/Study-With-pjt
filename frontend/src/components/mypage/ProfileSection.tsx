'use client';

import { HiPlus } from 'react-icons/hi';

import { Button, UserProfile } from '@/components/common';

interface ProfileSectionProps {
  nickname: string;
  additionalInfo: string;
}

const ProfileSection = ({ nickname, additionalInfo }: ProfileSectionProps) => {
  const handleAddSession = () => {
    console.log('방 생성하기 버튼 클릭');
  };

  return (
    <div className="rounded-lg mb-7 bg-white p-6 shadow-sm">
      <div className="flex flex-wrap items-center justify-between gap-4">
        <UserProfile nickname={nickname} additionalInfo={additionalInfo} />
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
