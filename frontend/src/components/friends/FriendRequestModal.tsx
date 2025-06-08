'use client';

import { useState } from 'react';

import { HiSearch } from 'react-icons/hi';

import { Modal, Button, UserProfileSmall, SearchInput } from '@components/common';

import { useModalStore } from '@stores/modalStore';

type FriendStatus = '친구' | '신청중' | null;

interface SearchedUser {
  id: string;
  userId: string;
  nickname: string;
  profileImg?: string | null;
  status: FriendStatus;
}

const FriendRequestModal = () => {
  const [searchQuery, setSearchQuery] = useState('');

  const [searchResults, setSearchResults] = useState<SearchedUser[]>([]); // 임시 상태
  const [isSearching, setIsSearching] = useState(false); // 임시 상태

  const [hasSearched, setHasSearched] = useState(false); // 검색을 한번이라도 했는지 여부

  const { isFriendRequestModalOpen, setIsFriendRequestModalOpen, setIsFriendsModalOpen } =
    useModalStore();

  const handleSearch = async (): Promise<void> => {
    const trimmedQuery = searchQuery.trim();

    if (!trimmedQuery) return;

    if (trimmedQuery.length < 2) {
      console.error('검색어는 2자 이상 입력해주세요.');
      return;
    }

    setIsSearching(true);
    setHasSearched(true);

    try {
      // 검색 api 호출
      const mockResults: SearchedUser[] = [
        {
          id: '1',
          userId: 'emily123',
          nickname: 'Emily Wilson',
          profileImg: 'https://randomuser.me/api/portraits/women/44.jpg',
          status: null,
        },
        {
          id: '2',
          userId: 'sarah456',
          nickname: 'Sarah Wilson',
          profileImg: 'https://randomuser.me/api/portraits/women/68.jpg',
          status: '신청중',
        },
        {
          id: '3',
          userId: 'mike789',
          nickname: 'Mike Johnson',
          profileImg: 'https://randomuser.me/api/portraits/men/32.jpg',
          status: '친구',
        },
      ];

      setSearchResults(mockResults);
    } catch (error) {
      console.error('친구 검색에 실패했습니다.', error);
      setSearchResults([]);
    } finally {
      setIsSearching(false);
    }
  };

  const handleSendFriendRequest = async (userId: string): Promise<void> => {
    try {
      // 친구 요청 API 호출

      setSearchResults((prev) =>
        prev.map((user) => (user.userId === userId ? { ...user, status: '신청중' } : user)),
      );
    } catch (error) {
      console.error('친구 신청 전송에 실패했습니다:', error);
    }
  };

  const handleCancelFriendRequest = async (userId: string): Promise<void> => {
    try {
      // 친구 요청 취소 api 호출

      setSearchResults((prev) =>
        prev.map((user) => (user.userId === userId ? { ...user, status: null } : user)),
      );
    } catch (error) {
      console.error('친구 신청 취소에 실패했습니다:', error);
    }
  };

  const handleCloseModal = (): void => {
    setSearchQuery('');
    setSearchResults([]);
    setHasSearched(false);
    setIsFriendRequestModalOpen(false);
    setIsFriendsModalOpen(true);
  };

  // 상태에 따른 버튼 렌더링
  const renderActionButton = (user: SearchedUser) => {
    switch (user.status) {
      case '친구':
        return null;
      case '신청중':
        return (
          <Button
            onClick={() => handleCancelFriendRequest(user.userId)}
            variant="secondary"
            size="sm"
            aria-label={`${user.nickname}에게 보낸 친구 신청 취소`}
          >
            요청 취소
          </Button>
        );
      case null:
        return (
          <Button
            onClick={() => handleSendFriendRequest(user.userId)}
            variant="primary"
            size="sm"
            aria-label={`${user.nickname}에게 친구 신청 보내기`}
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
            disabled={!searchQuery.trim() || isSearching}
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
          ) : searchResults.length === 0 ? (
            <div className="flex items-center justify-center h-full text-center text-gray-500">
              {hasSearched ? '검색 결과가 없습니다.' : '검색할 유저의 이름을 입력해보세요.'}
            </div>
          ) : (
            <div className="h-full overflow-y-auto pr-2">
              <ul className="space-y-3">
                {searchResults.map((user) => (
                  <li
                    key={user.id}
                    className="border-b border-gray-100 pb-3 last:border-b-0 last:pb-0"
                  >
                    <div className="flex items-center justify-between gap-3">
                      <div className="flex-1">
                        <UserProfileSmall
                          nickname={user.nickname}
                          profileImg={user.profileImg}
                          additionalInfo={user.status === '신청중' ? '친구 신청 중' : undefined}
                        />
                      </div>
                      <div className="flex gap-2">{renderActionButton(user)}</div>
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
