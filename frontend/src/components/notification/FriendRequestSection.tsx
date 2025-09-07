'use client';

import Button from '@components/common/Button';
import UserProfileSmall from '@components/common/UserProfileSmall';

import { useAcceptFriendRequestMutation } from '@hooks/api/useAcceptFriendRequestMutation';
import { useReceivedFriendRequestsQuery } from '@hooks/api/useReceivedFriendRequestsQuery';
import { useRejectFriendRequestMutation } from '@hooks/api/useRejectFriendRequestMutation';

import { useAuthStore } from '@stores/authStore';

const FriendRequestSection = () => {
  const { user } = useAuthStore();

  const {
    data: friendRequestsData,
    isLoading,
    error,
  } = useReceivedFriendRequestsQuery({
    userCuid: user?.id || '',
    enabled: !!user?.id,
  });

  const acceptFriendRequestMutation = useAcceptFriendRequestMutation();
  const rejectFriendRequestMutation = useRejectFriendRequestMutation();

  const friendRequests = friendRequestsData?.receivedFriendRequests || [];

  const handleFriendAccept = (friendCuid: string) => {
    if (!user?.id) return;

    acceptFriendRequestMutation.mutate({
      userCuid: user.id,
      friendCuid,
    });
  };

  const handleFriendDecline = (friendCuid: string) => {
    if (!user?.id) return;

    rejectFriendRequestMutation.mutate({
      userCuid: user.id,
      friendCuid,
    });
  };

  return (
    <section>
      <h3 className="text-lg font-semibold text-gray-900 mb-4">친구 요청 목록</h3>
      <div className="space-y-1">
        {isLoading ? (
          <p className="text-sm text-gray-500 text-center py-4">친구 요청을 불러오는 중...</p>
        ) : error ? (
          <p className="text-sm text-red-500 text-center py-4">
            친구 요청을 불러오는 중 오류가 발생했습니다.
          </p>
        ) : friendRequests.length === 0 ? (
          <p className="text-sm text-gray-500 text-center py-4">새로운 친구 요청이 없습니다.</p>
        ) : (
          friendRequests.map((request) => (
            <div
              key={request.userCuid}
              className="flex items-center justify-between p-4 border-b border-gray-100 last:border-b-0"
            >
              <UserProfileSmall
                nickname={request.user.nickname}
                profileImg={request.user.profileImg}
              />
              <div className="flex gap-2 ml-4">
                <Button
                  variant="primary"
                  size="sm"
                  onClick={() => handleFriendAccept(request.userCuid)}
                  disabled={
                    acceptFriendRequestMutation.isPending || rejectFriendRequestMutation.isPending
                  }
                  className="px-3 py-1.5"
                >
                  수락
                </Button>
                <Button
                  variant="secondary"
                  size="sm"
                  onClick={() => handleFriendDecline(request.userCuid)}
                  disabled={
                    acceptFriendRequestMutation.isPending || rejectFriendRequestMutation.isPending
                  }
                  className="px-3 py-1.5"
                >
                  거절
                </Button>
              </div>
            </div>
          ))
        )}
      </div>
    </section>
  );
};

export default FriendRequestSection;
