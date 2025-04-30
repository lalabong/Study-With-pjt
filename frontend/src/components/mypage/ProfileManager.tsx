'use client';

import { useMemo } from 'react';

import { toast } from 'react-toastify';

import { useUserInfoQuery } from '@hooks/api/useUserInfoQuery';

import { useAuthStore } from '@stores/authStore';

import StatusMessage from '../common/StatusMessage';

import ProfileSection from './ProfileSection';

// import { useUpdateUserProfileMutation } from '@hooks/api/useUpdateUserProfileMutation';

interface ProfileManagerProps {
  userId: string;
  isCurrentUser: boolean;
}

const ProfileManager = ({ userId, isCurrentUser }: ProfileManagerProps) => {
  // const updateProfileMutation = useUpdateUserProfileMutation();

  const loginUser = useAuthStore((state) => state.user);

  // 현재 사용자인 경우에는 쿼리를 비활성화
  const {
    data: profileUser,
    isPending,
    isError,
  } = useUserInfoQuery({
    userId,
    enabled: !isCurrentUser,
  });

  const user = useMemo(() => {
    if (isCurrentUser) {
      return loginUser;
    }

    return profileUser;
  }, [isCurrentUser, loginUser, profileUser]);

  // 상태별 분기 처리
  if (!isCurrentUser) {
    if (isPending) {
      return <StatusMessage status="loading" />;
    }

    if (isError) {
      return <StatusMessage status="error" />;
    }
  }

  // 사용자 정보가 없는 경우
  if (!user) {
    return <StatusMessage status="empty" message="사용자 정보를 찾을 수 없습니다." />;
  }

  const handleNicknameUpdate = async (newNickname: string) => {
    try {
      // await updateProfileMutation.mutateAsync({ nickname: newNickname });
      // 필수 속성이 있는 완전한 User 객체 생성
      const updatedUser = {
        ...loginUser!, // loginUser가 null이 아님을 명시
        nickname: newNickname,
      };

      useAuthStore.setState({
        user: updatedUser,
      });

      toast.success('닉네임이 성공적으로 변경되었습니다.');
    } catch (error) {
      toast.error('닉네임 변경에 실패했습니다.');
      console.error('닉네임 업데이트 오류:', error);
    }
  };

  const handleProfileImageUpdate = async (newImage: string | File) => {
    try {
      // const formData = new FormData();
      // if (newImage instanceof File) {
      //   formData.append('profileImage', newImage);
      // }
      // await updateProfileMutation.mutateAsync(formData);

      let imageUrl: string | null = null;

      if (typeof newImage === 'string') {
        imageUrl = newImage;
      } else if (newImage instanceof File) {
        // 실제로는 서버에서 받은 URL을 사용해야 함
        imageUrl = URL.createObjectURL(newImage);
      }

      // 필수 속성이 있는 완전한 User 객체 생성
      const updatedUser = {
        ...loginUser!, // loginUser가 null이 아님을 명시
        profileImage: imageUrl,
      };

      useAuthStore.setState({
        user: updatedUser,
      });

      toast.success('프로필 이미지가 성공적으로 변경되었습니다.');
    } catch (error) {
      toast.error('프로필 이미지 변경에 실패했습니다.');
      console.error('프로필 이미지 업데이트 오류:', error);
    }
  };

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
              profileImage: handleProfileImageUpdate,
            }
          : undefined
      }
    />
  );
};

export default ProfileManager;
