'use client';

import { Button } from '@components/common';
import UserProfileSmall from '@components/common/UserProfileSmall';

import { useDeleteFriendMutation } from '@hooks/api/useDeleteFriendMutation';
import { useSendRoomInviteMutation } from '@hooks/api/useSendRoomInviteMutation';

import { useAuthStore, User } from '@stores/authStore';
import { useRoomStore } from '@stores/roomStore';

export type Friend = Omit<User, 'createdAt'>;

interface FriendItemProps {
  friend: Friend;
}

const FriendItem = ({ friend }: FriendItemProps) => {
  const { user } = useAuthStore();
  const { currentRoomId } = useRoomStore();

  const deleteFriendMutation = useDeleteFriendMutation();
  const sendInviteMutation = useSendRoomInviteMutation(currentRoomId || '');

  const handleInviteClick = (): void => {
    if (!currentRoomId) {
      console.error('현재 방 ID가 없습니다.');
      return;
    }

    sendInviteMutation.mutate({ inviteeCuid: friend.id });
  };

  const handleRemoveClick = (): void => {
    if (!user?.id) return;

    if (window.confirm(`${friend.nickname}님을 친구 목록에서 삭제하시겠습니까?`)) {
      deleteFriendMutation.mutate({
        userCuid: user.id,
        friendCuid: friend.id,
      });
    }
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
              disabled={sendInviteMutation.isPending}
              aria-label={`${friend.nickname}을(를) 방에 초대`}
            >
              {sendInviteMutation.isPending ? '초대 중...' : '초대'}
            </Button>
          )}
          <Button
            onClick={handleRemoveClick}
            variant="secondary"
            size="sm"
            disabled={deleteFriendMutation.isPending}
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
