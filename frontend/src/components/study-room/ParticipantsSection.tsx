'use client';

import { useState } from 'react';

import { HiUsers } from 'react-icons/hi';

import Button from '@components/common/Button';
import UserProfile from '@components/common/UserProfile';

interface Participant {
  id: string;
  nickname: string;
  profileImg?: string;
  activity: string;
}

const ParticipantsSection = () => {
  const [participants] = useState<Participant[]>([
    {
      id: '1',
      nickname: 'Sarah Chen',
      profileImg: 'https://randomuser.me/api/portraits/women/44.jpg',
      activity: '일정1 진행 중...',
    },
    {
      id: '2',
      nickname: 'Mike Johnson',
      profileImg: 'https://randomuser.me/api/portraits/men/32.jpg',
      activity: '진행 중인 일정이 없습니다.',
    },
  ]);

  const handleViewDetails = (id: string) => {
    console.log(`${id} 유저 오늘의 일정 상세정보 조회`);
  };

  return (
    <div className="bg-white rounded-lg shadow-sm p-6 max-h-[750px] overflow-auto">
      <h2 className="text-xl font-medium mb-10 flex items-center">
        <HiUsers className="mr-2 text-blue-500" aria-hidden="true" />
        참가자
      </h2>

      {participants.length === 0 ? (
        <div className="text-center py-8 text-gray-500">현재 참가자가 없습니다.</div>
      ) : (
        <ul className="space-y-6">
          {participants.map((participant) => (
            <li
              key={participant.id}
              className="border-b border-gray-100 pb-4 last:border-b-0 last:pb-0"
            >
              <div className="flex flex-wrap items-center justify-between gap-4">
                <div className="mb-3">
                  <UserProfile
                    nickname={participant.nickname}
                    profileImg={participant.profileImg}
                    additionalInfo={participant.activity}
                  />
                </div>
                <Button onClick={() => handleViewDetails(participant.id)} variant="text" size="sm">
                  자세히
                </Button>
              </div>
            </li>
          ))}
        </ul>
      )}
    </div>
  );
};

export default ParticipantsSection;
