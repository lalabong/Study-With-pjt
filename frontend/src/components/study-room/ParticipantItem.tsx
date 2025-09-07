'use client';

import { Button } from '@components/common';
import UserProfile from '@components/common/UserProfile';

import { useTopRunningScheduleQuery } from '@hooks/api/useTopRunningScheduleQuery';

import { getCurrentDateString } from '@utils/date';

export interface Participant {
  id: string;
  userId: string;
  nickname: string;
  profileImg: string | null;
}

interface ParticipantItemProps {
  participant: Participant;
  onViewDetails: (participant: Participant) => void;
}

const ParticipantItem = ({ participant, onViewDetails }: ParticipantItemProps) => {
  const { data: topRunningScheduleData } = useTopRunningScheduleQuery({
    userId: participant.userId,
    date: getCurrentDateString(),
  });

  const getAdditionalInfo = (): string => {
    if (!topRunningScheduleData?.topRunningSchedule) {
      return '진행 중인 일정이 없습니다.';
    }
    return `${topRunningScheduleData.topRunningSchedule.title} 진행 중...`;
  };

  return (
    <li className="border-b border-gray-100 pb-4 last:border-b-0 last:pb-0">
      <div className="flex flex-wrap items-center justify-between gap-4">
        <div className="mb-3">
          <UserProfile
            nickname={participant.nickname}
            profileImg={participant.profileImg}
            additionalInfo={getAdditionalInfo()}
          />
        </div>
        <Button onClick={() => onViewDetails(participant)} variant="text" size="sm">
          자세히
        </Button>
      </div>
    </li>
  );
};

export default ParticipantItem;
