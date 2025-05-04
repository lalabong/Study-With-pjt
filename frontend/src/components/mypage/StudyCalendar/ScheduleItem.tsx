'use client';

import { HiTrash, HiClock, HiChevronDown } from 'react-icons/hi';

import { STATUS_OPTIONS } from '@constants/calendar';

import { useClickOutside } from '@hooks/useClickOutside';

import {
  ScheduleItem as ScheduleItemType,
  ScheduleStatus,
  useScheduleStore,
} from '@/stores/scheduleStore';

interface ScheduleItemProps {
  schedule: ScheduleItemType;
}

const ScheduleItem = ({ schedule }: ScheduleItemProps) => {
  const { openStatusDropdownId, setOpenStatusDropdownId } = useScheduleStore();

  const isStatusOpen = openStatusDropdownId === schedule.id;

  // 외부 클릭 감지 훅 사용
  useClickOutside(() => setOpenStatusDropdownId(null), {
    containerSelector: '[data-modal-container="true"]',
    exceptSelector: '[data-schedule-id',
    elementId: schedule.id,
    isOpen: isStatusOpen,
  });

  // 일정 시간 표시 함수
  const getTimeDisplay = () => {
    if (!schedule.startTime && !schedule.endTime) return null;

    if (schedule.startTime && schedule.endTime)
      return `${schedule.startTime} - ${schedule.endTime}`;

    return schedule.startTime ? `${schedule.startTime}부터` : `${schedule.endTime}까지`;
  };

  // 일정 삭제 핸들러
  const handleDelete = (e: React.MouseEvent) => {
    e.stopPropagation();
    // removeSchedule(schedule.id);
  };

  const handleDeleteKeyDown = (e: React.KeyboardEvent) => {
    if (e.key === 'Enter' || e.key === ' ') {
      e.preventDefault();
      // removeSchedule(schedule.id);
    }
  };

  // 상태 드롭다운 토글 핸들러
  const toggleStatusDropdown = (e: React.MouseEvent) => {
    e.stopPropagation();
    e.preventDefault();

    if (openStatusDropdownId === schedule.id) {
      setOpenStatusDropdownId(null);
    } else {
      setOpenStatusDropdownId(schedule.id);
    }
  };

  // 상태 변경 핸들러
  const handleStatusChange = (status: ScheduleStatus, e?: React.MouseEvent) => {
    if (e) {
      e.stopPropagation();
      e.preventDefault();
    }
    // updateScheduleStatus(schedule.id, status);
    setOpenStatusDropdownId(null);
  };

  // 상태 드롭다운 키 입력 핸들러
  const handleKeyDown = (e: React.KeyboardEvent) => {
    if (e.key === 'Enter' || e.key === ' ') {
      e.preventDefault();
      if (openStatusDropdownId === schedule.id) {
        setOpenStatusDropdownId(null);
      } else {
        setOpenStatusDropdownId(schedule.id);
      }
    } else if (e.key === 'Escape' && isStatusOpen) {
      e.preventDefault();
      setOpenStatusDropdownId(null);
    }
  };

  // 상태 옵션 키 입력 핸들러
  const handleStatusOptionKeyDown = (e: React.KeyboardEvent, status: ScheduleStatus) => {
    if (e.key === 'Enter' || e.key === ' ') {
      e.preventDefault();
      handleStatusChange(status);
    }
  };

  return (
    <div
      className={`relative p-4 sm:p-5 mb-4 m-5 rounded-md border border-gray-200 transition-transform duration-200 hover:scale-[1.02] hover:shadow-md sm:max-w-full ${getStatusClass(schedule.status)}`}
      style={{ zIndex: isStatusOpen ? 10 : 1 }}
    >
      <div className="flex flex-col sm:flex-row sm:justify-between sm:items-center w-full">
        <div className="flex-1 mb-3 sm:mb-0 sm:max-w-[calc(100%-150px)]">
          <h3
            className="font-medium text-base sm:text-lg"
            style={{ wordBreak: 'keep-all', overflowWrap: 'break-word' }}
          >
            {schedule.name}
          </h3>

          {getTimeDisplay() && (
            <div
              className="text-gray-500 text-xs sm:text-sm mt-2 flex items-center"
              aria-label="일정 시간"
            >
              <span className="inline-block mr-1 sm:mr-2" aria-hidden="true">
                <HiClock className="w-3 h-3 sm:w-4 sm:h-4" />
              </span>
              <span>{getTimeDisplay()}</span>
            </div>
          )}
        </div>

        <div className="flex items-center justify-end mt-2 sm:mt-0 sm:min-w-[140px]">
          <div className="relative mr-3 z-20">
            <button
              onClick={toggleStatusDropdown}
              onKeyDown={handleKeyDown}
              className={`px-3 sm:px-4 py-1.5 sm:py-2 border rounded-md text-xs sm:text-sm flex items-center cursor-pointer ${getStatusTextClass(schedule.status)}`}
              aria-label="일정 상태 변경"
              aria-expanded={isStatusOpen}
              aria-haspopup="listbox"
              tabIndex={0}
              data-schedule-id={schedule.id}
            >
              {schedule.status}
              <HiChevronDown className="ml-1 w-3 h-3" />
            </button>

            {isStatusOpen && (
              <div
                className="bg-white border border-gray-200 rounded-md shadow-lg w-28 sm:w-36 z-50"
                role="listbox"
                aria-label="일정 상태 옵션"
                style={{
                  position: 'absolute',
                  right: '0',
                  top: 'calc(100% + 0.5rem)',
                  pointerEvents: 'auto',
                }}
                data-schedule-id={schedule.id}
              >
                {STATUS_OPTIONS.map((status) => (
                  <div
                    key={status}
                    className={`px-3 sm:px-4 py-1.5 sm:py-2 hover:bg-gray-100 cursor-pointer text-xs sm:text-sm ${
                      status === schedule.status ? 'font-medium ' + getStatusTextClass(status) : ''
                    }`}
                    onClick={(e) => handleStatusChange(status, e)}
                    onKeyDown={(e) => handleStatusOptionKeyDown(e, status)}
                    role="option"
                    aria-selected={status === schedule.status}
                    tabIndex={0}
                    data-schedule-id={schedule.id}
                  >
                    {status}
                  </div>
                ))}
              </div>
            )}
          </div>

          <button
            onClick={handleDelete}
            onKeyDown={handleDeleteKeyDown}
            className="text-gray-400 hover:text-red-500 transition-colors cursor-pointer p-1 rounded-full hover:bg-gray-100"
            aria-label={`${schedule.name} 일정 삭제`}
            tabIndex={0}
          >
            <HiTrash className="w-4 h-4 sm:w-5 sm:h-5" />
          </button>
        </div>
      </div>
    </div>
  );
};

export default ScheduleItem;

// 상태 배경 색상 정의
const getStatusClass = (status: ScheduleStatus) => {
  const statusClassMap: Record<ScheduleStatus, string> = {
    대기중: 'bg-white',
    진행중: 'bg-blue-50',
    완료: 'bg-green-50',
    취소: 'bg-gray-50',
  };

  return statusClassMap[status];
};

// 상태 텍스트 색상 정의
const getStatusTextClass = (status: ScheduleStatus) => {
  const statusTextClassMap: Record<ScheduleStatus, string> = {
    대기중: 'text-gray-700',
    진행중: 'text-blue-600',
    완료: 'text-green-600',
    취소: 'text-gray-500',
  };

  return statusTextClassMap[status];
};
