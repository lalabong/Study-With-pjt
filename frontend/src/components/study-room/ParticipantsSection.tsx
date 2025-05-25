'use client';

import { useState } from 'react';

import { HiUsers } from 'react-icons/hi';

import { Modal } from '@components/common';
import Button from '@components/common/Button';
import ReadOnlyScheduleList from '@components/common/ReadOnlyScheduleList';
import UserProfile from '@components/common/UserProfile';

import { Schedule } from '@/types/api';

interface Participant {
  id: string;
  nickname: string;
  profileImg?: string;
  schedules: Schedule[];
}

const ParticipantsSection = () => {
  const [isModalOpen, setIsModalOpen] = useState<boolean>(false);
  const [selectedParticipant, setSelectedParticipant] = useState<Participant | null>(null);

  const dummyData = {
    topRunningSchedule: {
      id: 'string',
      userCuid: 'string',
      title: '알고리즘 문제 풀이',
      date: '2025-05-25',
      startTime: '2025-05-25T12:49:56.154Z',
      endTime: '2025-05-25T12:49:56.154Z',
      status: '진행중',
      order: 0,
      createdAt: '2025-05-25T12:49:56.154Z',
    },
  };
  // 임시 데이터 - 추후 API 연동 시 제거
  const [participants] = useState<Participant[]>([
    {
      id: '1',
      nickname: 'Sarah Chen',
      profileImg: 'https://randomuser.me/api/portraits/women/44.jpg',
      schedules: [
        {
          id: '1',
          userCuid: '1',
          createdAt: '2024-01-01',
          title: '알고리즘 문제 풀이',
          date: '2024-01-01',
          startTime: '2025-05-25T11:44:27.735Z',
          endTime: '2025-05-25T11:44:27.735Z',
          status: '진행중',
          order: 1,
        },
        {
          id: '2',
          userCuid: '1',
          createdAt: '2024-01-01',
          title: 'React 프로젝트 개발',
          date: '2024-01-01',
          startTime: '2025-05-25T11:44:27.735Z',
          endTime: '2025-05-25T11:44:27.735Z',
          status: '대기중',
          order: 2,
        },
        {
          id: '3',
          userCuid: '1',
          createdAt: '2024-01-01',
          title: '영어 공부',
          date: '2024-01-01',
          startTime: '2025-05-25T11:44:27.735Z',
          endTime: '2025-05-25T11:44:27.735Z',
          status: '완료',
          order: 3,
        },
        {
          id: '4',
          userCuid: '1',
          createdAt: '2024-01-01',
          title: '영어 공부',
          date: '2024-01-01',
          startTime: '2025-05-25T11:44:27.735Z',
          endTime: '2025-05-25T11:44:27.735Z',
          status: '완료',
          order: 4,
        },
        {
          id: '5',
          userCuid: '1',
          createdAt: '2024-01-01',
          title: '영어 공부',
          date: '2024-01-01',
          startTime: '2025-05-25T11:44:27.735Z',
          endTime: '2025-05-25T11:44:27.735Z',
          status: '완료',
          order: 5,
        },
      ],
    },
    {
      id: '2',
      nickname: 'Mike Johnson',
      profileImg: 'https://randomuser.me/api/portraits/men/32.jpg',
      schedules: [
        {
          id: '4',
          userCuid: '2',
          createdAt: '2024-01-01',
          title: '데이터베이스 설계',
          date: '2024-01-01',
          startTime: '2025-05-25T11:44:27.735Z',
          endTime: '2025-05-25T11:44:27.735Z',
          status: '완료',
          order: 1,
        },
      ],
    },
  ]);

  const handleViewDetails = (participant: Participant): void => {
    setSelectedParticipant(participant);
    setIsModalOpen(true);
  };

  const handleCloseModal = (): void => {
    setIsModalOpen(false);
    setSelectedParticipant(null);
  };

  return (
    <>
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
                      additionalInfo={
                        dummyData.topRunningSchedule === null
                          ? '진행 중인 일정이 없습니다.'
                          : dummyData.topRunningSchedule.title + ' ' + '진행 중...'
                      }
                    />
                  </div>
                  <Button onClick={() => handleViewDetails(participant)} variant="text" size="sm">
                    자세히
                  </Button>
                </div>
              </li>
            ))}
          </ul>
        )}
      </div>

      {isModalOpen && selectedParticipant && (
        <Modal
          isOpen={isModalOpen}
          onClose={handleCloseModal}
          title={`${selectedParticipant.nickname}의 일정`}
          width="w-[35%] min-w-[400px]"
        >
          <ReadOnlyScheduleList userId={selectedParticipant.id} isUserPage={false} />
        </Modal>
      )}
    </>
  );
};

export default ParticipantsSection;
