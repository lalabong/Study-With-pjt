'use client';

import { HiPlus } from 'react-icons/hi';

import { Button } from '@components/common';
import StatusMessage from '@components/common/StatusMessage';
import UserProfile from '@components/common/UserProfile';

import { User } from '@stores/authStore';

interface ProfileSectionProps {
  user: User;
  isCurrentUser?: boolean;
  onProfileUpdate?: {
    nickname?: (newNickname: string) => void;
    profileImg?: (newImage: string | File) => void;
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
        <StatusMessage status="loading" message="프로필 정보를 불러오는 중..." />
      </div>
    );
  }

  return (
    <div className="rounded-lg mb-7 bg-white p-6 shadow-sm">
      <div className="flex flex-wrap items-center justify-between gap-4">
        <UserProfile
          profileImg={user.profileImg}
          nickname={user.nickname}
          additionalInfo={user.createdAt}
          editable={isCurrentUser}
          onNicknameChange={isCurrentUser ? onProfileUpdate?.nickname : undefined}
          onProfileImgChange={isCurrentUser ? onProfileUpdate?.profileImg : undefined}
        />
        {isCurrentUser && (
          <Button size="sm" className="bg-blue-500" onClick={onCreateRoom}>
            <span className="flex items-center gap-1">
              <HiPlus className="h-4 w-4" />방 생성하기
            </span>
          </Button>
        )}
      </div>
    </div>
  );
};

export default ProfileSection;
