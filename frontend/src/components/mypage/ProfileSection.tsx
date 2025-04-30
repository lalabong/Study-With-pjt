'use client';

import { HiPlus } from 'react-icons/hi';

import { Button, UserProfile } from '@components/common';
import LoadingSpinner from '@components/common/LoadingSpinner';

import { User } from '@stores/authStore';

interface ProfileSectionProps {
  user: User;
  isCurrentUser?: boolean;
  onProfileUpdate?: {
    nickname?: (newNickname: string) => void;
    profileImage?: (newImage: string | File) => void;
  };
  onCreateRoom?: () => void;
}

const ProfileSection = ({
  user,
  isCurrentUser,
  onProfileUpdate,
  onCreateRoom,
}: ProfileSectionProps) => {
  if (!user) {
    return (
      <div className="rounded-lg mb-7 bg-white p-6 shadow-sm">
        <LoadingSpinner />
      </div>
    );
  }

  return (
    <div className="rounded-lg mb-7 bg-white p-6 shadow-sm">
      <div className="flex flex-wrap items-center justify-between gap-4">
        <UserProfile
          profileImage={user.profileImage}
          nickname={user.nickname}
          additionalInfo={user.createdAt}
          editable={isCurrentUser}
          onNicknameChange={isCurrentUser ? onProfileUpdate?.nickname : undefined}
          onProfileImageChange={isCurrentUser ? onProfileUpdate?.profileImage : undefined}
        />
        {isCurrentUser && (
          <Button size="sm" className="bg-blue-500">
            <span className="flex items-center gap-1">
              <HiPlus className="h-4 w-4" onClick={onCreateRoom} />방 생성하기
            </span>
          </Button>
        )}
      </div>
    </div>
  );
};

export default ProfileSection;
