'use client';

import Button from '@components/common/Button';
import UserProfileSmall from '@components/common/UserProfileSmall';

interface FriendRequest {
  id: string;
  nickname: string;
  profileImg?: string | null;
}

const DUMMY_FRIEND_REQUESTS: FriendRequest[] = [
  {
    id: '1',
    nickname: 'Sarah Wilson',
  },
  {
    id: '2',
    nickname: 'Sarah Wilson',
  },
];

const FriendRequestSection = () => {
  const friendRequests = DUMMY_FRIEND_REQUESTS;

  const handleFriendAccept = (friendId: string) => {
    console.log('Friend request accepted:', friendId);
  };

  const handleFriendDecline = (friendId: string) => {
    console.log('Friend request declined:', friendId);
  };

  return (
    <section>
      <h3 className="text-lg font-semibold text-gray-900 mb-4">친구 요청 목록</h3>
      <div className="space-y-1">
        {friendRequests.length === 0 ? (
          <p className="text-sm text-gray-500 text-center py-4">새로운 친구 요청이 없습니다.</p>
        ) : (
          friendRequests.map((request) => (
            <div
              key={request.id}
              className="flex items-center justify-between p-4 border-b border-gray-100 last:border-b-0"
            >
              <UserProfileSmall nickname={request.nickname} profileImg={request.profileImg} />
              <div className="flex gap-2 ml-4">
                <Button
                  variant="primary"
                  size="sm"
                  onClick={() => handleFriendAccept(request.id)}
                  className="px-3 py-1.5"
                >
                  수락
                </Button>
                <Button
                  variant="secondary"
                  size="sm"
                  onClick={() => handleFriendDecline(request.id)}
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
