'use client';

import { memo } from 'react';

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

  const { data: schedules, isLoading } = useSchedulesByDateQuery({
    userId: userId || '',
    date: formattedDate,
    enabled: !!userId && !!formattedDate,
  });

  if (!schedules) {
    return null;
  }

  return (
    <section
      className="rounded-md p-6 flex flex-col border border-gray-200 w-full h-[500px] sm:h-[642px] lg:col-span-2"
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
        <ul className="list-none p-0 m-0 max-h-[450px] pr-1 overflow-y-auto overflow-x-hidden">
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
