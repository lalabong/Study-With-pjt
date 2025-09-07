'use client';

import { useMemo, useState } from 'react';

import { TextField } from '@mui/material';

import { Button, Modal } from '@components/common';
import StatusMessage from '@components/common/StatusMessage';
import ProfileSection from '@components/mypage/Profile/ProfileSection';
import RoomSwitchWarningModal from '@components/room/RoomSwitchWarningModal';

import { useCreateRoomMutation } from '@hooks/api/useCreateRoomMutation';
import { useCurrentRoomQuery } from '@hooks/api/useCurrentRoomQuery';
import { useUpdateNicknameMutation } from '@hooks/api/useUpdateNicknameMutation';
import { useUpdateProfileImgMutation } from '@hooks/api/useUpdateProfileImageMutation';
import { useUserInfoQuery } from '@hooks/api/useUserInfoQuery';

import { useAuthStore, User } from '@stores/authStore';
import { useRoomStore } from '@stores/roomStore';

interface ProfileManagerProps {
  userId: string;
  isCurrentUser: boolean;
}

const ProfileManager = ({ userId, isCurrentUser }: ProfileManagerProps) => {
  const updateNicknameMutation = useUpdateNicknameMutation({ userId });
  const updateProfileImgMutation = useUpdateProfileImgMutation({ userId });
  const createRoomMutation = useCreateRoomMutation();

  const [isOpenCreateRoomModal, setIsOpenCreateRoomModal] = useState(false);
  const [isOpenWarningModal, setIsOpenWarningModal] = useState(false);
  const [roomName, setRoomName] = useState('');
  const [pendingRoomName, setPendingRoomName] = useState('');

  const loginUser = useAuthStore((state) => state.user);
  const { setCurrentRoomName, setCurrentRoomCreatedAt } = useRoomStore();

  // 현재 방 정보 조회 (현재 사용자인 경우에만)
  const { data: currentRoomData } = useCurrentRoomQuery();

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

    return profileUserData;
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
    setRoomName('');
    setIsOpenCreateRoomModal(true);
  };

  const handleInputChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    setRoomName(e.target.value);
  };

  const handleAddRoom = () => {
    if (!roomName.trim()) {
      return;
    }

    // 현재 참여 중인 방이 있는지 확인
    if (currentRoomData?.currentRoom && isCurrentUser) {
      setPendingRoomName(roomName.trim());
      setIsOpenWarningModal(true);
      return;
    }

    // 현재 방이 없거나 현재 사용자가 아닌 경우 바로 방 생성
    createRoom(roomName.trim());
  };

  const createRoom = (name: string) => {
    createRoomMutation.mutate(
      { name },
      {
        onSuccess: () => {
          setIsOpenCreateRoomModal(false);
          setRoomName('');
          setCurrentRoomName(name);
          setCurrentRoomCreatedAt(new Date().toISOString());
        },
      },
    );
  };

  const handleConfirmRoomSwitch = () => {
    setIsOpenWarningModal(false);
    createRoom(pendingRoomName);
    setPendingRoomName('');
  };

  const handleCancelRoomSwitch = () => {
    setIsOpenWarningModal(false);
    setPendingRoomName('');
  };

  const handleKeyDown = (e: React.KeyboardEvent<HTMLInputElement>) => {
    if (e.key === 'Enter' && roomName.trim()) {
      handleAddRoom();
    }
  };

  return (
    <>
      <ProfileSection
        user={user as User}
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

      <Modal
        isOpen={isOpenCreateRoomModal}
        title="방 생성하기"
        width="w-[30%] min-w-[330px]"
        onClose={() => {
          setIsOpenCreateRoomModal(false);
          setRoomName('');
        }}
      >
        <div className="flex flex-col gap-4">
          <TextField
            id="createRoom"
            variant="outlined"
            name="createRoom"
            value={roomName}
            onChange={handleInputChange}
            onKeyDown={handleKeyDown}
            placeholder="방 이름을 입력하세요"
            aria-required="true"
            autoComplete="off"
            size="small"
            sx={{
              width: '100%',
              '& .MuiInputBase-root': {
                height: '40px',
                maxWidth: '100%',
                fontSize: '0.875rem',
              },
            }}
          />
          <Button
            variant="primary"
            onClick={handleAddRoom}
            disabled={!roomName.trim() || createRoomMutation.isPending}
          >
            {createRoomMutation.isPending ? '생성 중...' : '생성하기'}
          </Button>
        </div>
      </Modal>

      <RoomSwitchWarningModal
        isOpen={isOpenWarningModal}
        onClose={handleCancelRoomSwitch}
        onConfirm={handleConfirmRoomSwitch}
        currentRoomName={currentRoomData?.currentRoom?.name || ''}
        newRoomName={pendingRoomName}
      />
    </>
  );
};

export default ProfileManager;
