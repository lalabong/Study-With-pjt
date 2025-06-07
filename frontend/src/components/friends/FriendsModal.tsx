'use client';

import { useState, useMemo } from 'react';

import { HiUserAdd } from 'react-icons/hi';

import { Modal, Button } from '@components/common';
import SearchInput from '@components/common/SearchInput';

import useDebounce from '@hooks/useDebounce';

import { useModalStore } from '@stores/modalStore';

import FriendItem, { Friend } from './FriendItem';

const FriendsModal = () => {
  const [searchQuery, setSearchQuery] = useState('');

  const debouncedSearchQuery = useDebounce(searchQuery, 200);

  const { isFriendsModalOpen, setIsFriendsModalOpen } = useModalStore();

  // 더미 데이터 - 추후 API 연동 시 제거
  const [friends] = useState<Friend[]>([
    {
      id: '1',
      userId: 'sarah123',
      nickname: 'Sarah Wilson',
      profileImg: 'https://randomuser.me/api/portraits/women/44.jpg',
    },
    {
      id: '2',
      userId: 'michael456',
      nickname: 'Michael Chen',
      profileImg: 'https://randomuser.me/api/portraits/men/32.jpg',
    },
    {
      id: '3',
      userId: 'emma789',
      nickname: 'Emma Johnson',
      profileImg: 'https://randomuser.me/api/portraits/women/68.jpg',
    },
    {
      id: '4',
      userId: 'alex321',
      nickname: 'Alex Kim',
      profileImg: 'https://randomuser.me/api/portraits/men/55.jpg',
    },
    {
      id: '5',
      userId: 'alex321',
      nickname: 'Alex Kim',
      profileImg: 'https://randomuser.me/api/portraits/men/55.jpg',
    },
    {
      id: '6',
      userId: 'alex321',
      nickname: 'Alex Kim',
      profileImg: 'https://randomuser.me/api/portraits/men/55.jpg',
    },
  ]);

  const filteredFriends = useMemo((): Friend[] => {
    if (!debouncedSearchQuery.trim()) {
      return friends;
    }

    return friends.filter((friend) =>
      friend.nickname.toLowerCase().includes(debouncedSearchQuery.toLowerCase()),
    );
  }, [friends, debouncedSearchQuery]);

  const handleSearchChange = (value: string): void => {
    setSearchQuery(value);
  };

  const handleAddFriend = (): void => {
    console.log('친구 추가 플로팅 버튼 클릭');
  };

  const handleCloseModal = (): void => {
    setSearchQuery('');
    setIsFriendsModalOpen(false);
  };

  return (
    <Modal
      isOpen={isFriendsModalOpen}
      onClose={handleCloseModal}
      title={`친구 목록 (${filteredFriends.length})`}
      width="w-[550px]"
    >
      <div className="relative h-[500px] flex flex-col">
        <SearchInput
          placeholder="검색할 친구의 이름을 입력하세요."
          value={searchQuery}
          onChange={handleSearchChange}
        />

        <div className="flex-1 mt-6 overflow-hidden">
          {filteredFriends.length === 0 ? (
            <div className="flex items-center justify-center h-full text-center text-gray-500">
              {debouncedSearchQuery ? '검색 결과가 없습니다.' : '새로운 친구를 추가해보세요!'}
            </div>
          ) : (
            <div className="h-full overflow-y-auto pr-2 pb-16">
              <ul className="space-y-3">
                {filteredFriends.map((friend) => (
                  <FriendItem key={friend.id} friend={friend} />
                ))}
              </ul>
            </div>
          )}
        </div>

        <div className="absolute bottom-0 right-0">
          <Button
            onClick={handleAddFriend}
            variant="primary"
            size="md"
            className="!rounded-full !p-3 shadow-lg hover:shadow-xl transition-shadow duration-200"
            aria-label="친구 추가"
          >
            <HiUserAdd size={20} className="text-white" />
          </Button>
        </div>
      </div>
    </Modal>
  );
};

export default FriendsModal;
