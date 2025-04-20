'use client';

import { HiBell, HiUserGroup } from 'react-icons/hi';

const HeaderActionButtons = () => {
  const handleNotificationClick = () => {
    console.log('알림 버튼 클릭');
  };

  const handleFriendClick = () => {
    console.log('친구 버튼 클릭');
  };

  return (
    <div className="flex items-center gap-4">
      <button
        className="rounded-full p-2 hover:bg-gray-100 cursor-pointer"
        aria-label="알림"
        onClick={() => handleNotificationClick()}
      >
        <HiBell className="h-6 w-6 text-gray-600" />
      </button>
      <button
        className="rounded-full p-2 hover:bg-gray-100 cursor-pointer"
        aria-label="친구"
        onClick={() => handleFriendClick()}
      >
        <HiUserGroup className="h-6 w-6 text-gray-600" />
      </button>
    </div>
  );
};

export default HeaderActionButtons;
