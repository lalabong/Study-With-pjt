'use client';

import { useState } from 'react';

import { HiOutlineLogout } from 'react-icons/hi';

import { Modal, Button } from '@components/common';

import { useCheckLastParticipantQuery } from '@hooks/api/useCheckLastParticipantQuery';
import { useLeaveRoomMutation } from '@hooks/api/useLeaveRoomMutation';

import { useRoomStore } from '@stores/roomStore';

interface RoomInfoSectionProps {
  roomTitle: string;
  creationTime: string;
  isActive: boolean;
}

const RoomInfoSection = ({ roomTitle, creationTime, isActive }: RoomInfoSectionProps) => {
  const [isLeaveModalOpen, setIsLeaveModalOpen] = useState(false);

  const { currentRoomId } = useRoomStore();
  const leaveRoomMutation = useLeaveRoomMutation();

  const { data: lastParticipantData } = useCheckLastParticipantQuery({
    roomId: currentRoomId || '',
    enabled: !!currentRoomId && isLeaveModalOpen,
  });

  const handleExitRoom = () => {
    setIsLeaveModalOpen(true);
  };

  const handleConfirmLeave = () => {
    if (currentRoomId) {
      leaveRoomMutation.mutate(currentRoomId);
    }
    setIsLeaveModalOpen(false);
  };

  const handleCancelLeave = () => {
    setIsLeaveModalOpen(false);
  };

  return (
    <section className="flex justify-between items-center mb-6">
      <div className="flex items-center flex-wrap">
        <div className="flex-row">
          <h1 className="text-2xl font-bold mr-4">{roomTitle}</h1>
          <div className="flex">
            <div className="text-sm text-gray-500 mr-4">{creationTime}</div>
            {isActive ? (
              <div className="flex items-center">
                <span className="h-2 w-2 rounded-full bg-green-500 mr-2"></span>
                <span className="text-sm text-gray-600">진행 중</span>
              </div>
            ) : (
              <div className="flex items-center">
                <span className="h-2 w-2 rounded-full bg-red-500 mr-2"></span>
                <span className="text-sm text-gray-600">종료됨</span>
              </div>
            )}
          </div>
        </div>
      </div>
      <div className="flex gap-2">
        <button
          className="rounded-full p-2 hover:bg-gray-100 cursor-pointer"
          aria-label="방 나가기"
          onClick={handleExitRoom}
        >
          <HiOutlineLogout className="h-8 w-8 text-gray-600" />
        </button>
      </div>

      <Modal
        isOpen={isLeaveModalOpen}
        onClose={handleCancelLeave}
        title="방 나가기"
        width="w-[400px]"
      >
        <div className="p-4">
          {lastParticipantData?.isLastParticipant ? (
            <div className="mb-6">
              <div className="text-red-600 font-medium mb-2">⚠️ 주의</div>
              <p className="text-gray-700 mb-2">당신이 이 방의 마지막 참여자입니다.</p>
              <p className="text-gray-700 mb-2">
                방을 나가면 <strong>방이 영구적으로 삭제</strong>됩니다.
              </p>
              <p className="text-gray-600 text-sm">이 작업은 되돌릴 수 없습니다.</p>
            </div>
          ) : (
            <div className="mb-6">
              <p className="text-gray-700">정말로 이 방에서 나가시겠습니까?</p>
            </div>
          )}

          <div className="flex gap-3 justify-end">
            <Button
              variant="text"
              onClick={handleCancelLeave}
              disabled={leaveRoomMutation.isPending}
            >
              취소
            </Button>
            <Button
              variant="secondary"
              onClick={handleConfirmLeave}
              disabled={leaveRoomMutation.isPending}
            >
              {leaveRoomMutation.isPending ? '나가는 중...' : '나가기'}
            </Button>
          </div>
        </div>
      </Modal>
    </section>
  );
};

export default RoomInfoSection;
