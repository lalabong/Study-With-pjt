'use client';

import { useEffect } from 'react';

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
  const { data: topRunningScheduleData, refetch } = useTopRunningScheduleQuery({
    userId: participant.userId,
    date: getCurrentDateString(),
  });

  // 진행중 일정 변경 이벤트 리스너
  useEffect(() => {
    const handleRunningScheduleChanged = (event: CustomEvent) => {
      const { userId: changedUserId } = event.detail;

      // 이 ParticipantItem이 표시하는 참가자의 일정이 변경된 경우 refetch
      // userId가 다른 형식일 수 있으므로 문자열로 비교
      const participantUserId = String(participant.userId); // 이 컴포넌트가 표시하는 참가자 ID
      const eventUserId = String(changedUserId); // 일정이 변경된 사용자 ID

      if (eventUserId === participantUserId) {
        refetch({ cancelRefetch: true });
      }
    };

    window.addEventListener(
      'running-schedule-changed',
      handleRunningScheduleChanged as EventListener,
    );

    return () => {
      window.removeEventListener(
        'running-schedule-changed',
        handleRunningScheduleChanged as EventListener,
      );
    };
  }, [participant.userId, refetch]);

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
