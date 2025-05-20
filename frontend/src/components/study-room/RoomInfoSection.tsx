'use client';

import { HiOutlineLogout } from 'react-icons/hi';

interface RoomInfoSectionProps {
  roomTitle: string;
  creationTime: string;
  isActive: boolean;
}

const RoomInfoSection = ({ roomTitle, creationTime, isActive }: RoomInfoSectionProps) => {
  const handleExitRoom = () => {
    // 방 나가기 로직 구현
    console.log('방 나가기 버튼 클릭');
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
      <button
        className="rounded-full p-2 hover:bg-gray-100 cursor-pointer"
        aria-label="방 나가기"
        onClick={handleExitRoom}
      >
        <HiOutlineLogout className="h-8 w-8 text-gray-600" />
      </button>
    </section>
  );
};

export default RoomInfoSection;
