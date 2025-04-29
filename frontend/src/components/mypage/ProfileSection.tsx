'use client';

import { HiPlus } from 'react-icons/hi';

import { Button, UserProfile } from '@components/common';
import LoadingSpinner from '@components/common/LoadingSpinner';

import { useAuthStore } from '@stores/authStore';
import { User } from '@stores/authStore';

interface ProfileSectionProps {
  profileUser?: User | null;
  isCurrentUser?: boolean;
  onProfileUpdate?: {
    nickname?: (newNickname: string) => void;
    profileImage?: (newImage: string | File) => void;
  };
  showCreateRoomButton?: boolean;
  onCreateRoom?: () => void;
}

const ProfileSection = ({
  profileUser,
  isCurrentUser,
  onProfileUpdate,
  showCreateRoomButton = true,
  onCreateRoom,
}: ProfileSectionProps) => {
  const currentUser = useAuthStore.getState().user;

  const user = profileUser || currentUser;

  const isOwner =
    isCurrentUser !== undefined
      ? isCurrentUser
      : !!currentUser && !!user && currentUser.id === user.id;

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
          editable={isOwner}
          onNicknameChange={isOwner ? onProfileUpdate?.nickname : undefined}
          onProfileImageChange={isOwner ? onProfileUpdate?.profileImage : undefined}
        />
        {isOwner && showCreateRoomButton && (
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
