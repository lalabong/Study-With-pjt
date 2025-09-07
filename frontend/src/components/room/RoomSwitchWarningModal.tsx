'use client';

import { Button, Modal } from '@components/common';

interface RoomSwitchWarningModalProps {
  isOpen: boolean;
  onClose: () => void;
  onConfirm: () => void;
  currentRoomName: string;
  newRoomName: string;
}

const RoomSwitchWarningModal = ({
  isOpen,
  onClose,
  onConfirm,
  currentRoomName,
  newRoomName,
}: RoomSwitchWarningModalProps) => {
  return (
    <Modal isOpen={isOpen} onClose={onClose} title="방 변경 확인" width="w-[35%] min-w-[400px]">
      <div className="flex flex-col gap-6">
        <div className="flex flex-col gap-3 text-sm">
          <p className="text-gray-700">
            현재 참여 중인 방에서 나가고 새로운 방으로 이동하시겠습니까?
          </p>
          <div className="bg-gray-50 p-4 rounded-lg space-y-2">
            <div className="flex items-center gap-2">
              <span className="text-gray-600 font-medium">현재 방:</span>
              <span className="font-semibold text-gray-900">{currentRoomName}</span>
            </div>
            <div className="flex items-center gap-2">
              <span className="text-gray-600 font-medium">새로운 방:</span>
              <span className="font-semibold text-blue-600">{newRoomName}</span>
            </div>
          </div>

          <p className="text-red-600 text-xs">
            ⚠️ 이전 방에서 나가면 다시 들어가기 위해서는 초대가 필요할 수 있습니다.
          </p>
        </div>

        <div className="flex gap-2 justify-end">
          <Button variant="secondary" onClick={onClose}>
            취소
          </Button>
          <Button variant="primary" onClick={onConfirm}>
            확인
          </Button>
        </div>
      </div>
    </Modal>
  );
};

export default RoomSwitchWarningModal;
