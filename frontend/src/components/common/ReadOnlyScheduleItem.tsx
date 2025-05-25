'use client';

import { HiClock } from 'react-icons/hi';

import { getScheduleTimeDisplay, getStatusClass, getStatusTextClass } from '@utils/schedule';

import { Schedule } from '@/types/api';

interface ReadOnlyScheduleItemProps {
  schedule: Schedule;
}

const ReadOnlyScheduleItem = ({ schedule }: ReadOnlyScheduleItemProps) => {
  const timeDisplay = getScheduleTimeDisplay(schedule);

  return (
    <div
      className={`relative p-4 mb-4 sm:p-5 rounded-md border border-gray-200 sm:max-w-full ${getStatusClass(schedule.status)}`}
    >
      <div className="flex flex-col sm:flex-row sm:justify-between sm:items-center w-full">
        <div className="flex-1 mb-3 sm:mb-0">
          <div className="flex items-center">
            <h3
              className="font-medium text-base sm:text-lg"
              style={{ wordBreak: 'keep-all', overflowWrap: 'break-word' }}
            >
              {schedule.title}
            </h3>
          </div>

          {timeDisplay && (
            <div
              className="text-gray-500 text-xs sm:text-sm mt-2 flex items-center"
              aria-label="일정 시간"
            >
              <span className="inline-block mr-1 sm:mr-2" aria-hidden="true">
                <HiClock className="w-3 h-3 sm:w-4 sm:h-4" />
              </span>
              <span>{timeDisplay}</span>
            </div>
          )}
        </div>

        <div className="flex items-center justify-end mt-2 sm:mt-0">
          <div className="relative">
            <div
              className={`px-3 sm:px-4 py-1.5 sm:py-2 border rounded-md text-xs sm:text-sm ${getStatusTextClass(schedule.status)}`}
              aria-label="일정 상태"
            >
              {schedule.status}
            </div>
          </div>
        </div>
      </div>
    </div>
  );
};

export default ReadOnlyScheduleItem;
