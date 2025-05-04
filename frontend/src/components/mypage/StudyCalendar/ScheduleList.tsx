'use client';

import { memo } from 'react';

import { HiCalendar } from 'react-icons/hi';

import ScheduleItem from '@components/mypage/StudyCalendar/ScheduleItem';

import { ScheduleItem as ScheduleItemType } from '@/stores/scheduleStore';

const ScheduleList = memo(({ schedules }: { schedules: ScheduleItemType[] }) => {
  return (
    <section
      className="min-w-[280px] sm:min-h-[550px] sm:min-w-[300px] border border-gray-200 rounded-md p-6 lg:col-span-2"
      aria-labelledby="schedule-list-title"
    >
      <h2 id="schedule-list-title" className="text-lg font-medium mb-4 flex items-center">
        <HiCalendar className="mr-2 text-blue-500" aria-hidden="true" />
        일정 목록
      </h2>

      {schedules.length === 0 ? (
        <div className="text-center py-8 text-gray-500" aria-live="polite">
          일정이 없습니다. 새 일정을 추가해 보세요.
        </div>
      ) : (
        <ul
          className="list-none p-0 m-0 max-h-[250px] sm:max-h-[450px] overflow-y-auto pr-1 no-scrollbar"
          aria-label="일정 목록"
        >
          {schedules.map((schedule) => (
            <li key={schedule.id}>
              <ScheduleItem schedule={schedule} />
            </li>
          ))}
        </ul>
      )}
    </section>
  );
});

ScheduleList.displayName = 'ScheduleList';

export default ScheduleList;
