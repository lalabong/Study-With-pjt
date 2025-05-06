'use client';

import { useEffect, useState } from 'react';

import Calendar from 'react-calendar';
import 'react-calendar/dist/Calendar.css';
import { Value } from 'react-calendar/dist/esm/shared/types.js';
import { GoDotFill } from 'react-icons/go';
import { HiChevronLeft, HiChevronRight } from 'react-icons/hi';

import CalendarModal from '@components/mypage/StudyCalendar/CalendarModal';

import { MONTHS, WEEK_DAYS_KO } from '@constants/calendar';

import { useUserSchedulesQuery } from '@hooks/api/useUserSchedulesQuery';

import { ScheduleItem, ScheduleStatus, useScheduleStore } from '@stores/scheduleStore';

import { formatDateToString, getYearRange, isSameDate } from '@utils/date';

import { Schedule } from '@/types/api';

import '@components/mypage/StudyCalendar/studyCalendar.css';

interface StudyCalendarProps {
  userId: string;
}

const StudyCalendar = ({ userId }: StudyCalendarProps) => {
  // 초기값: 오늘
  const activeDate = new Date();
  const { openCalendarModal, selectedDate, setSelectedDate } = useScheduleStore();

  const [currentViewDate, setCurrentViewDate] = useState<Date>(activeDate); // 현재 보고 있는 날짜(연/월/일)

  // 기본 시작일과 종료일 계산 (현재 날짜 기준 전월 1일부터 다음달 마지막일까지)
  // 처음만 props로 받을지 고민.
  const [dateRange, setDateRange] = useState({
    startDate: formatDateToString(new Date(activeDate.getFullYear(), activeDate.getMonth() - 1, 1)),
    endDate: formatDateToString(new Date(activeDate.getFullYear(), activeDate.getMonth() + 2, 0)),
  });

  const { data, refetch } = useUserSchedulesQuery({
    userId,
    startDate: dateRange.startDate,
    endDate: dateRange.endDate,
    enabled: !!userId,
  });

  // 날짜 범위가 변경될 때마다 데이터 다시 조회
  useEffect(() => {
    if (userId) {
      refetch();
    }
  }, [dateRange, userId, refetch]);

  // 일정이 있는 날짜 목록(시작일 기준)
  const markedDates = [
    ...(data?.schedules.map((schedule: Schedule) => new Date(schedule.startTime)) || []),
  ];

  // 드롭다운 범위 표시할 연도 목록
  const showYears = getYearRange(currentViewDate.getFullYear());

  // 일정이 있는 날짜인지 확인
  const isStudyDate = (date: Date) => {
    return markedDates.some(
      (studyDate: Date) =>
        studyDate.getDate() === date.getDate() &&
        studyDate.getMonth() === date.getMonth() &&
        studyDate.getFullYear() === date.getFullYear(),
    );
  };

  // 특정 날짜의 일정을 가져오는 함수
  const getSchedulesForDate = (date: Date): ScheduleItem[] => {
    const selectedSchedules = data?.schedules
      ? data.schedules
          .filter((schedule: Schedule) => {
            const scheduleDate = new Date(schedule.startTime);
            return isSameDate(scheduleDate, date);
          })
          .map((schedule: Schedule): ScheduleItem => {
            // 시간 부분만 추출
            const startTime = schedule.startTime
              ? new Date(schedule.startTime).toLocaleTimeString('ko-KR', {
                  hour: '2-digit',
                  minute: '2-digit',
                })
              : undefined;

            const endTime = schedule.endTime
              ? new Date(schedule.endTime).toLocaleTimeString('ko-KR', {
                  hour: '2-digit',
                  minute: '2-digit',
                })
              : undefined;

            return {
              id: schedule.id,
              name: schedule.title,
              startTime,
              endTime,
              status: (schedule.status as ScheduleStatus) || ('대기중' as ScheduleStatus),
            };
          })
      : [];

    return selectedSchedules;
  };

  // 타일 클래스 결정 함수(일정 있는 날짜 타일 클래스 추가)
  const getTileClassName = ({ date }: { date: Date }) => {
    const classes = [];

    if (isStudyDate(date)) {
      classes.push('study-date');
    }

    return classes;
  };

  // 타일 내용 결정 함수(일정 있는 날짜 타일 내용 추가)
  const getTileContent = ({ date }: { date: Date }) => {
    if (isStudyDate(date)) {
      return <GoDotFill className="study-indicator-dot" />;
    }
    return null;
  };

  // 날짜 변경 핸들러
  const handleDateChange = (value: Value) => {
    setSelectedDate(value);
  };

  // 현재 보고 있는 월 변경 핸들러
  const handleActiveStartDateChange = ({ activeStartDate }: { activeStartDate: Date | null }) => {
    if (activeStartDate) {
      setCurrentViewDate(activeStartDate);

      updateDateRangeFromMonth(activeStartDate);
    }
  };

  // 특정 날짜를 선택했을 때 핸들러
  const handleStudyDateClick = (date: Date) => {
    setSelectedDate(date);

    const schedulesForDate = getSchedulesForDate(date);
    openCalendarModal(date, schedulesForDate);
  };

  // 월 기준으로 날짜 범위 업데이트 함수
  const updateDateRangeFromMonth = (date: Date) => {
    const year = date.getFullYear();
    const month = date.getMonth();

    const newStartDate = formatDateToString(new Date(year, month - 1, 1)); // 지난 달 1일
    const newEndDate = formatDateToString(new Date(year, month + 2, 0)); // 다음 달 말일

    setDateRange({
      startDate: newStartDate,
      endDate: newEndDate,
    });
  };

  // 월 드롭다운 변경 핸들러
  const handleMonthChange = (e: React.ChangeEvent<HTMLSelectElement>) => {
    const newMonth = new Date(currentViewDate);
    newMonth.setMonth(parseInt(e.target.value));
    setCurrentViewDate(newMonth);
    updateDateRangeFromMonth(newMonth);
  };

  // 년 드롭다운 변경 핸들러
  const handleYearChange = (e: React.ChangeEvent<HTMLSelectElement>) => {
    const newYear = new Date(currentViewDate);
    newYear.setFullYear(parseInt(e.target.value));
    setCurrentViewDate(newYear);
    updateDateRangeFromMonth(newYear);
  };

  // 이전 달 버튼 클릭 핸들러
  const handlePrevMonth = () => {
    const prevMonth = new Date(currentViewDate);
    prevMonth.setMonth(prevMonth.getMonth() - 1);
    setCurrentViewDate(prevMonth);
    updateDateRangeFromMonth(prevMonth);
  };

  // 다음 달 버튼 클릭 핸들러
  const handleNextMonth = () => {
    const nextMonth = new Date(currentViewDate);
    nextMonth.setMonth(nextMonth.getMonth() + 1);
    setCurrentViewDate(nextMonth);
    updateDateRangeFromMonth(nextMonth);
  };

  return (
    <div className="w-full flex flex-col min-h-[550px]">
      {/* <div className="w-full flex flex-col"> */}
      <div className="mb-6 flex items-center justify-between">
        <div className="flex items-center space-x-4">
          <select
            value={currentViewDate.getFullYear()}
            onChange={handleYearChange}
            className="rounded border border-gray-300 bg-white px-3 py-2 text-base"
          >
            {showYears.map((year) => (
              <option key={year} value={year}>
                {year}
              </option>
            ))}
          </select>

          <select
            value={currentViewDate.getMonth()}
            onChange={handleMonthChange}
            className="rounded border border-gray-300 bg-white px-3 py-2 text-base"
          >
            {MONTHS.map((month, index) => (
              <option key={month} value={index}>
                {month}
              </option>
            ))}
          </select>
        </div>

        <div className="flex space-x-3">
          <button
            className="rounded-full border border-gray-300 p-2 hover:bg-gray-100"
            aria-label="이전 달 버튼"
            onClick={handlePrevMonth}
          >
            <HiChevronLeft className="h-5 w-5" />
          </button>

          <button
            className="rounded-full border border-gray-300 p-2 hover:bg-gray-100"
            aria-label="다음 달 버튼"
            onClick={handleNextMonth}
          >
            <HiChevronRight className="h-5 w-5" />
          </button>
        </div>
      </div>

      <div className="calendar-container w-full flex-1 flex flex-col">
        <Calendar
          onClickDay={handleStudyDateClick}
          onChange={handleDateChange}
          value={selectedDate}
          activeStartDate={currentViewDate}
          onActiveStartDateChange={handleActiveStartDateChange}
          className="w-full rounded-lg border-none text-base h-full flex-1"
          formatShortWeekday={(locale, date) => WEEK_DAYS_KO[date.getDay()]}
          formatDay={(locale, date) => date.getDate().toString()}
          tileClassName={getTileClassName}
          tileContent={getTileContent}
        />
      </div>

      <CalendarModal />
    </div>
  );
};

export default StudyCalendar;
