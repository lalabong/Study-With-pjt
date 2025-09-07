'use client';

import { useRouter } from 'next/navigation';

import { Button } from '@components/common';

import { useCurrentRoomQuery } from '@hooks/api/useCurrentRoomQuery';

interface CurrentRoomToastProps {
  show: boolean;
  onClose: () => void;
}

const CurrentRoomToast = ({ show, onClose }: CurrentRoomToastProps) => {
  const router = useRouter();

  const { data: currentRoomData } = useCurrentRoomQuery();

  if (!show || !currentRoomData?.currentRoom) {
    return null;
  }

  const handleEnterRoom = () => {
    router.push(`/study-room/${currentRoomData.currentRoom?.id}`);
    onClose();
  };

  return (
    <div className="fixed top-20 left-1/2 transform -translate-x-1/2 z-40">
      <div className="bg-white border border-gray-200 rounded-lg shadow-lg p-5 min-w-[420px] max-w-[500px] animate-slide-down">
        <div className="flex items-start gap-4">
          <div className="flex-shrink-0 mt-1">
            <div className="w-3 h-3 bg-blue-500 rounded-full animate-pulse"></div>
          </div>

          <div className="flex-1 min-w-0">
            <p className="text-sm text-gray-700 mb-2 leading-relaxed">
              현재 참여 중인 방이 있습니다. 입장하시겠습니까?
            </p>
            <div className="bg-gray-50 rounded-md px-3 py-2 mb-4">
              <p className="text-sm font-semibold text-gray-900 truncate">
                {currentRoomData.currentRoom.name}
              </p>
            </div>

            <div className="flex justify-end gap-2">
              <Button variant="secondary" size="sm" onClick={onClose}>
                나중에
              </Button>
              <Button variant="primary" size="sm" onClick={handleEnterRoom}>
                입장하기
              </Button>
            </div>
          </div>

          <button
            onClick={onClose}
            className="flex-shrink-0 text-gray-400 hover:text-gray-600 transition-colors"
          >
            <svg className="w-4 h-4" fill="none" stroke="currentColor" viewBox="0 0 24 24">
              <path
                strokeLinecap="round"
                strokeLinejoin="round"
                strokeWidth={2}
                d="M6 18L18 6M6 6l12 12"
              />
            </svg>
          </button>
        </div>
      </div>
    </div>
  );
};

export default CurrentRoomToast;
