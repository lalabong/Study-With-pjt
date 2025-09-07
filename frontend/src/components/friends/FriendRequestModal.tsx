'use client';

import { useState } from 'react';

import { HiSearch } from 'react-icons/hi';

import { Modal, Button, UserProfileSmall, SearchInput } from '@components/common';

import { useAcceptFriendRequestMutation } from '@hooks/api/useAcceptFriendRequestMutation';
import { useCancelFriendRequestMutation } from '@hooks/api/useCancelFriendRequestMutation';
import { useRejectFriendRequestMutation } from '@hooks/api/useRejectFriendRequestMutation';
import { useSearchUsersQuery } from '@hooks/api/useSearchUsersQuery';
import { useSendFriendRequestMutation } from '@hooks/api/useSendFriendRequestMutation';

import { useAuthStore } from '@stores/authStore';
import { useModalStore } from '@stores/modalStore';

import { SearchedUser } from '@/types/api';

const FriendRequestModal = () => {
  const [searchQuery, setSearchQuery] = useState('');
  const [hasSearched, setHasSearched] = useState(false);

  const { user } = useAuthStore();
  const { isFriendRequestModalOpen, setIsFriendRequestModalOpen, setIsFriendsModalOpen } =
    useModalStore();

  const {
    data: searchData,
    isLoading: isSearching,
    error: searchError,
  } = useSearchUsersQuery({
    nickname: searchQuery,
    enabled: searchQuery.trim().length >= 2 && hasSearched,
  });

  const sendFriendRequestMutation = useSendFriendRequestMutation();
  const cancelFriendRequestMutation = useCancelFriendRequestMutation();
  const acceptFriendRequestMutation = useAcceptFriendRequestMutation();
  const rejectFriendRequestMutation = useRejectFriendRequestMutation();

  const searchResults = searchData?.users || [];

  const handleSearch = (): void => {
    const trimmedQuery = searchQuery.trim();

    if (!trimmedQuery) return;

    if (trimmedQuery.length < 2) {
      console.error('검색어는 2자 이상 입력해주세요.');
      return;
    }

    setHasSearched(true);
  };

  const handleSendFriendRequest = async (targetUserId: string): Promise<void> => {
    if (!user?.id) return;

    const targetUser = searchResults.find((u: SearchedUser) => u.id === targetUserId);
    if (!targetUser) return;

    sendFriendRequestMutation.mutate({
      userCuid: user.id,
      friendCuid: targetUserId,
    });
  };

  const handleCancelFriendRequest = async (targetUserId: string): Promise<void> => {
    if (!user?.id) return;

    const targetUser = searchResults.find((u: SearchedUser) => u.id === targetUserId);
    if (!targetUser) return;

    cancelFriendRequestMutation.mutate({
      userCuid: user.id,
      friendCuid: targetUserId,
    });
  };

  const handleAcceptFriendRequest = async (targetUserId: string): Promise<void> => {
    if (!user?.id) return;

    const targetUser = searchResults.find((u: SearchedUser) => u.id === targetUserId);
    if (!targetUser) return;

    acceptFriendRequestMutation.mutate({
      userCuid: user.id,
      friendCuid: targetUserId,
    });
  };

  const handleRejectFriendRequest = async (targetUserId: string): Promise<void> => {
    if (!user?.id) return;

    const targetUser = searchResults.find((u: SearchedUser) => u.id === targetUserId);
    if (!targetUser) return;

    rejectFriendRequestMutation.mutate({
      userCuid: user.id,
      friendCuid: targetUserId,
    });
  };

  const handleCloseModal = (): void => {
    setSearchQuery('');
    setHasSearched(false);
    setIsFriendRequestModalOpen(false);
    setIsFriendsModalOpen(true);
  };

  // 상태에 따른 버튼 렌더링
  const renderActionButton = (searchUser: SearchedUser) => {
    switch (searchUser.status) {
      case 'accepted':
        return null;
      case 'pending_sent':
        return (
          <Button
            onClick={() => handleCancelFriendRequest(searchUser.id)}
            variant="secondary"
            size="sm"
            disabled={cancelFriendRequestMutation.isPending}
            aria-label={`${searchUser.nickname}에게 보낸 친구 신청 취소`}
          >
            요청 취소
          </Button>
        );
      case 'pending_received':
        return (
          <div className="flex gap-2">
            <Button
              onClick={() => handleAcceptFriendRequest(searchUser.id)}
              variant="primary"
              size="sm"
              disabled={acceptFriendRequestMutation.isPending}
              aria-label={`${searchUser.nickname}의 친구 요청 수락`}
            >
              수락
            </Button>
            <Button
              onClick={() => handleRejectFriendRequest(searchUser.id)}
              variant="secondary"
              size="sm"
              disabled={rejectFriendRequestMutation.isPending}
              aria-label={`${searchUser.nickname}의 친구 요청 거절`}
            >
              거절
            </Button>
          </div>
        );
      case null:
        return (
          <Button
            onClick={() => handleSendFriendRequest(searchUser.id)}
            variant="primary"
            size="sm"
            disabled={sendFriendRequestMutation.isPending}
            aria-label={`${searchUser.nickname}에게 친구 신청 보내기`}
          >
            친구 요청
          </Button>
        );
      default:
        return null;
    }
  };

  return (
    <Modal
      isOpen={isFriendRequestModalOpen}
      onClose={handleCloseModal}
      title="친구 찾기"
      width="w-[550px]"
    >
      <div className="h-[500px] flex flex-col">
        <div className="flex gap-2 mb-6">
          <div className="flex-1">
            <SearchInput
              placeholder="유저의 이름을 입력하세요"
              value={searchQuery}
              onChange={setSearchQuery}
              onSearch={handleSearch}
            />
          </div>
          <Button
            onClick={handleSearch}
            variant="primary"
            size="md"
            disabled={searchQuery.trim().length < 2 || isSearching}
            aria-label="유저 검색하기"
            className="px-6"
          >
            <div className="flex items-center gap-2">
              <HiSearch size={16} />
              검색
            </div>
          </Button>
        </div>

        <div className="flex-1 overflow-hidden">
          {isSearching ? (
            <div className="flex items-center justify-center h-full text-center text-gray-500">
              검색 중...
            </div>
          ) : searchError ? (
            <div className="flex items-center justify-center h-full text-center text-red-500">
              검색 중 오류가 발생했습니다.
            </div>
          ) : searchResults.length === 0 ? (
            <div className="flex items-center justify-center h-full text-center text-gray-500">
              {hasSearched ? '검색 결과가 없습니다.' : '검색할 유저의 이름을 입력해보세요.'}
            </div>
          ) : (
            <div className="h-full overflow-y-auto pr-2">
              <ul className="space-y-3">
                {searchResults.map((searchUser: SearchedUser) => (
                  <li
                    key={searchUser.id}
                    className="border-b border-gray-100 pb-3 last:border-b-0 last:pb-0"
                  >
                    <div className="flex items-center justify-between gap-3">
                      <div className="flex-1">
                        <UserProfileSmall
                          nickname={searchUser.nickname}
                          profileImg={searchUser.profileImg}
                          additionalInfo={
                            searchUser.status === 'pending_sent'
                              ? '친구 신청 중'
                              : searchUser.status === 'accepted'
                                ? '친구'
                                : undefined
                          }
                        />
                      </div>
                      <div className="flex gap-2">{renderActionButton(searchUser)}</div>
                    </div>
                  </li>
                ))}
              </ul>
            </div>
          )}
        </div>
      </div>
    </Modal>
  );
};

export default FriendRequestModal;
