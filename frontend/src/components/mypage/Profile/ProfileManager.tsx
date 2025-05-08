'use client';

import { useMemo } from 'react';

import StatusMessage from '@components/common/StatusMessage';
import ProfileSection from '@components/mypage/Profile/ProfileSection';

import { useUpdateNicknameMutation } from '@hooks/api/useUpdateNicknameMutation';
import { useUpdateProfileImgMutation } from '@hooks/api/useUpdateProfileImageMutation';
import { useUserInfoQuery } from '@hooks/api/useUserInfoQuery';

import { useAuthStore } from '@stores/authStore';

interface ProfileManagerProps {
  userId: string;
  isCurrentUser: boolean;
}

const ProfileManager = ({ userId, isCurrentUser }: ProfileManagerProps) => {
  const updateNicknameMutation = useUpdateNicknameMutation({ userId });
  const updateProfileImgMutation = useUpdateProfileImgMutation({ userId });

  const loginUser = useAuthStore((state) => state.user);

  // 현재 사용자인 경우에는 쿼리를 비활성화
  const {
    data: profileUserData,
    // isPending,
    // isError,
  } = useUserInfoQuery({
    userId,
    enabled: !isCurrentUser,
  });

  const user = useMemo(() => {
    if (isCurrentUser) {
      return loginUser;
    }

    return profileUserData?.user;
  }, [isCurrentUser, loginUser, profileUserData]);

  if (!user) {
    return <StatusMessage status="empty" message="사용자 정보를 찾을 수 없습니다." />;
  }

  // if (!isCurrentUser && isPending) {
  //   return <StatusMessage status="loading" />;
  // }

  // if (!isCurrentUser && isError) {
  //   return <StatusMessage status="error" />;
  // }

  // 닉네임 업데이트 함수
  const handleNicknameUpdate = async (newNickname: string) => {
    if (!isCurrentUser) {
      return;
    }

    await updateNicknameMutation.mutateAsync({ nickname: newNickname });
  };

  // 프로필 이미지 업데이트 함수
  const handleProfileImgUpdate = async (newImage: string | File) => {
    if (!isCurrentUser) {
      return;
    }

    await updateProfileImgMutation.mutateAsync(newImage);
  };

  // 방 생성 버튼 클릭 시 실행되는 함수
  const handleCreateRoom = () => {
    // 방 생성 로직 구현
    console.log('방 생성하기 버튼 클릭');
  };

  return (
    <ProfileSection
      user={user}
      isCurrentUser={isCurrentUser}
      onCreateRoom={handleCreateRoom}
      onProfileUpdate={
        isCurrentUser
          ? {
              nickname: handleNicknameUpdate,
              profileImg: handleProfileImgUpdate,
            }
          : undefined
      }
    />
  );
};

export default ProfileManager;
