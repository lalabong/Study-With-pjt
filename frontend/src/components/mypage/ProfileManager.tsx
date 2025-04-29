'use client';

import { useState } from 'react';

import { toast } from 'react-toastify';

import { useAuthStore } from '@stores/authStore';
import { User } from '@stores/authStore';

import LoadingSpinner from '../common/LoadingSpinner';

import ProfileSection from './ProfileSection';

// import { useUpdateUserProfileMutation } from '@hooks/api/useUpdateUserProfileMutation';

interface ProfileManagerProps {
  profileUser?: User | null;
  forceCurrentUser?: boolean;
}

const ProfileManager = ({ profileUser, forceCurrentUser }: ProfileManagerProps) => {
  const currentUser = useAuthStore.getState().user;
  // const updateProfileMutation = useUpdateUserProfileMutation();
  const [isUpdating, setIsUpdating] = useState(false);

  const user = profileUser || currentUser;

  const isCurrentUser = forceCurrentUser || (!!currentUser && !!user && currentUser.id === user.id);

  const handleNicknameUpdate = async (newNickname: string) => {
    if (!isCurrentUser || !currentUser) return;

    try {
      setIsUpdating(true);
      // await updateProfileMutation.mutateAsync({ nickname: newNickname });
      useAuthStore.setState({
        user: {
          ...currentUser,
          nickname: newNickname,
        },
      });

      toast.success('닉네임이 성공적으로 변경되었습니다.');
    } catch (error) {
      toast.error('닉네임 변경에 실패했습니다.');
      console.error('닉네임 업데이트 오류:', error);
    } finally {
      setIsUpdating(false);
    }
  };

  const handleProfileImageUpdate = async (newImage: string | File) => {
    if (!isCurrentUser || !currentUser) return;

    try {
      setIsUpdating(true);
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

      useAuthStore.setState({
        user: {
          ...currentUser,
          profileImage: imageUrl,
        },
      });

      toast.success('프로필 이미지가 성공적으로 변경되었습니다.');
    } catch (error) {
      toast.error('프로필 이미지 변경에 실패했습니다.');
      console.error('프로필 이미지 업데이트 오류:', error);
    } finally {
      setIsUpdating(false);
    }
  };

  const handleCreateRoom = () => {
    // 방 생성 로직 구현
    console.log('방 생성하기 버튼 클릭');
  };

  if (isUpdating || !user) {
    return <LoadingSpinner />;
  }

  return (
    <ProfileSection
      profileUser={user}
      isCurrentUser={isCurrentUser}
      showCreateRoomButton={isCurrentUser}
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
