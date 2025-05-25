import { formatTimeToKorean } from '@utils/date';

import { Schedule, ScheduleStatus } from '@/types/api';

// 상태 배경 색상 정의
export const getStatusClass = (status: ScheduleStatus): string => {
  const statusClassMap: Record<ScheduleStatus, string> = {
    대기중: 'bg-white',
    진행중: 'bg-blue-50',
    완료: 'bg-green-50',
    취소: 'bg-gray-50',
  };

  return statusClassMap[status];
};

// 상태 텍스트 색상 정의
export const getStatusTextClass = (status: ScheduleStatus): string => {
  const statusTextClassMap: Record<ScheduleStatus, string> = {
    대기중: 'text-gray-700',
    진행중: 'text-blue-600',
    완료: 'text-green-600',
    취소: 'text-gray-500',
  };

  return statusTextClassMap[status];
};

// 일정 시간 표시 함수
export const getScheduleTimeDisplay = (schedule: Schedule): string | null => {
  if (!schedule.startTime && !schedule.endTime) return null;

  if (schedule.startTime && schedule.endTime)
    return `${formatTimeToKorean(schedule.startTime)} - ${formatTimeToKorean(schedule.endTime)}`;

  return schedule.startTime
    ? `${formatTimeToKorean(schedule.startTime)}부터`
    : `${formatTimeToKorean(schedule.endTime)}까지`;
};
