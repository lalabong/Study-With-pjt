'use client';

import { Button } from '@components/common';
import UserProfileSmall from '@components/common/UserProfileSmall';

import { User } from '@stores/authStore';
import { useRoomStore } from '@stores/roomStore';

export type Friend = Omit<User, 'createdAt'>;

interface FriendItemProps {
  friend: Friend;
}

const FriendItem = ({ friend }: FriendItemProps) => {
  const { currentRoomId } = useRoomStore();

  const handleInviteClick = (): void => {
    console.log('친구 초대:', friend);
  };

  const handleRemoveClick = (): void => {
    console.log('친구 삭제:', friend);
  };

  return (
    <li className="border-b border-gray-100 pb-3 last:border-b-0 last:pb-0">
      <div className="flex items-center justify-between gap-3">
        <div className="flex-1">
          <UserProfileSmall nickname={friend.nickname} profileImg={friend.profileImg} />
        </div>
        <div className="flex gap-2">
          {currentRoomId && (
            <Button
              onClick={handleInviteClick}
              variant="primary"
              size="sm"
              aria-label={`${friend.nickname}을(를) 방에 초대`}
            >
              초대
            </Button>
          )}
          <Button
            onClick={handleRemoveClick}
            variant="secondary"
            size="sm"
            aria-label={`${friend.nickname}을(를) 친구 목록에서 삭제`}
          >
            삭제
          </Button>
        </div>
      </div>
    </li>
  );
};

export default FriendItem;
