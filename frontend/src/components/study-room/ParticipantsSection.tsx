'use client';

import { useEffect, useState } from 'react';

import { HiUsers } from 'react-icons/hi';

import { Modal } from '@components/common';
import ReadOnlyScheduleList from '@components/common/ReadOnlyScheduleList';

import { useRoomParticipantsQuery } from '@hooks/api/useRoomParticipantsQuery';

import { useRoomStore } from '@stores/roomStore';

import ParticipantItem, { Participant } from './ParticipantItem';

const ParticipantsSection = () => {
  const [isModalOpen, setIsModalOpen] = useState<boolean>(false);
  const [selectedParticipant, setSelectedParticipant] = useState<Participant | null>(null);

  const { currentRoomId, participants, setParticipants } = useRoomStore();

  const { data, isLoading, error } = useRoomParticipantsQuery({
    roomId: currentRoomId || '',
    enabled: !!currentRoomId,
  });

  useEffect(() => {
    if (data?.participants) {
      setParticipants(data.participants);
    }
  }, [data, setParticipants]);

  const handleViewDetails = (participant: Participant): void => {
    setSelectedParticipant(participant);
    setIsModalOpen(true);
  };

  const handleCloseModal = (): void => {
    setIsModalOpen(false);
    setSelectedParticipant(null);
  };

  if (!currentRoomId) {
    return (
      <div className="bg-white rounded-lg shadow-sm p-6 max-h-[750px] overflow-auto">
        <h2 className="text-xl font-medium mb-10 flex items-center">
          <HiUsers className="mr-2 text-blue-500" aria-hidden="true" />
          참가자
        </h2>
        <div className="text-center py-8 text-gray-500">참가 중인 방이 없습니다.</div>
      </div>
    );
  }

  return (
    <>
      <div className="bg-white rounded-lg shadow-sm p-6 max-h-[750px] overflow-auto">
        <h2 className="text-xl font-medium mb-10 flex items-center">
          <HiUsers className="mr-2 text-blue-500" aria-hidden="true" />
          참가자
        </h2>

        {isLoading ? (
          <div className="text-center py-8 text-gray-500">참가자 목록을 불러오는 중...</div>
        ) : error ? (
          <div className="text-center py-8 text-red-500">
            참가자 목록을 불러오는데 실패했습니다.
          </div>
        ) : participants.length === 0 ? (
          <div className="text-center py-8 text-gray-500">현재 참가자가 없습니다.</div>
        ) : (
          <ul className="space-y-6">
            {participants.map((participant) => (
              <ParticipantItem
                key={participant.id}
                participant={participant}
                onViewDetails={handleViewDetails}
              />
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
          <ReadOnlyScheduleList userId={selectedParticipant.userId} isUserPage={false} />
        </Modal>
      )}
    </>
  );
};

export default ParticipantsSection;
