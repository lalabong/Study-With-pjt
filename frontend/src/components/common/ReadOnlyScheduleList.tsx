'use client';

import { memo, useEffect } from 'react';

import { HiCalendar } from 'react-icons/hi';

import ReadOnlyScheduleItem from '@components/common/ReadOnlyScheduleItem';

import { useSchedulesByDateQuery } from '@hooks/api/useSchedulesByDateQuery';

import { useScheduleStore } from '@stores/scheduleStore';

import { formatDateToYYYYMMDD, getCurrentDateString } from '@utils/date';

interface ReadOnlyScheduleListProps {
  userId: string;
  isUserPage?: boolean;
}

const ReadOnlyScheduleList = memo(({ userId, isUserPage }: ReadOnlyScheduleListProps) => {
  const { selectedDate } = useScheduleStore();

  const formattedDate =
    selectedDate instanceof Date ? formatDateToYYYYMMDD(selectedDate) : getCurrentDateString();

  const {
    data: schedules,
    isLoading,
    refetch,
  } = useSchedulesByDateQuery({
    userId: userId || '',
    date: formattedDate,
    enabled: !!userId && !!formattedDate,
  });

  // 컴포넌트가 마운트될 때마다 최신 데이터를 가져옴
  useEffect(() => {
    console.log('📝 ReadOnlyScheduleList - 마운트됨, 최신 데이터 가져오기');
    refetch({ cancelRefetch: true });
  }, [userId, refetch]);

  if (!schedules) {
    return null;
  }

  return (
    <section
      className="rounded-md p-6 flex flex-col border border-gray-200 w-full h-full lg:col-span-2"
      aria-labelledby="schedule-list-title"
    >
      {isUserPage && (
        <h2 id="schedule-list-title" className="text-lg font-medium mb-8 flex items-center">
          <HiCalendar className="mr-2 text-blue-500" aria-hidden="true" />
          일정 목록
        </h2>
      )}
      {isLoading ? (
        <div className="text-center py-8 text-gray-500">일정을 불러오는 중...</div>
      ) : schedules.schedules.length === 0 ? (
        <div className="text-center py-8 text-gray-500" aria-live="polite">
          일정이 없습니다.
        </div>
      ) : (
        <ul className="list-none p-0 m-0 max-h-[550px] pr-1 overflow-y-auto overflow-x-hidden">
          {schedules.schedules.map((schedule) => (
            <li key={schedule.id} data-schedule-id={schedule.id}>
              <ReadOnlyScheduleItem schedule={schedule} />
            </li>
          ))}
        </ul>
      )}
    </section>
  );
});

ReadOnlyScheduleList.displayName = 'ReadOnlyScheduleList';

export default ReadOnlyScheduleList;
