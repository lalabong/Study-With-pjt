'use client';

import { useEffect, useState } from 'react';

import Calendar from 'react-calendar';
import 'react-calendar/dist/Calendar.css';
import { Value } from 'react-calendar/dist/esm/shared/types.js';
import { GoDotFill } from 'react-icons/go';
import { HiChevronLeft, HiChevronRight } from 'react-icons/hi';

import CalendarModal from '@components/mypage/StudyCalendar/CalendarModal';
import ScheduleList from '@components/mypage/StudyCalendar/ScheduleList';

import { MONTHS, WEEK_DAYS_KO } from '@constants/calendar';

import { useScheduleDatesQuery } from '@hooks/api/useScheduleDatesQuery';

import { useScheduleStore } from '@stores/scheduleStore';

import { formatDateToYYYYMMDD, getYearRange } from '@utils/date';

import '@components/mypage/StudyCalendar/studyCalendar.css';

interface StudyCalendarProps {
  userId: string;
}

const StudyCalendar = ({ userId }: StudyCalendarProps) => {
  // 초기값: 오늘
  const activeDate = new Date();

  const { selectedDate, setSelectedDate } = useScheduleStore();

  const [currentViewDate, setCurrentViewDate] = useState<Date>(activeDate); // 현재 보고 있는 날짜(연/월/일)

  // 기본 시작일과 종료일 계산 (현재 날짜 기준 전월 1일부터 다음달 마지막일까지)
  const [dateRange, setDateRange] = useState({
    startDate: formatDateToYYYYMMDD(
      new Date(activeDate.getFullYear(), activeDate.getMonth() - 1, 1),
    ),
    endDate: formatDateToYYYYMMDD(new Date(activeDate.getFullYear(), activeDate.getMonth() + 2, 0)),
  });

  // 일정 날짜들 조회 API 호출
  const { data: scheduleDatesData } = useScheduleDatesQuery({
    userId,
    startDate: dateRange.startDate,
    endDate: dateRange.endDate,
    enabled: !!userId,
  });

  // 일정이 있는 날짜 목록(시작일 기준)
  const [markedDateStrings, setMarkedDateStrings] = useState<Set<string>>(new Set());

  useEffect(() => {
    if (scheduleDatesData?.scheduleDates) {
      setMarkedDateStrings(new Set(scheduleDatesData.scheduleDates));
    }
  }, [scheduleDatesData]);

  // 드롭다운 범위 표시할 연도 목록
  const showYears = getYearRange(currentViewDate.getFullYear());

  // 일정이 있는 날짜인지 확인
  const isStudyDate = (date: Date) => {
    const dateString = formatDateToYYYYMMDD(date);
    return markedDateStrings.has(dateString);
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
  };

  // 월 기준으로 날짜 범위 업데이트 함수
  const updateDateRangeFromMonth = (date: Date) => {
    const year = date.getFullYear();
    const month = date.getMonth();

    const newStartDate = formatDateToYYYYMMDD(new Date(year, month - 1, 1)); // 지난 달 1일
    const newEndDate = formatDateToYYYYMMDD(new Date(year, month + 2, 0)); // 다음 달 말일

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
    <div className="w-full flex flex-col lg:flex-row gap-6">
      <div className="lg:w-1/2 flex flex-col min-h-[550px]">
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
            tileClassName={({ date }) => (isStudyDate(date) ? 'study-date' : '')}
            tileContent={({ date }) =>
              isStudyDate(date) ? <GoDotFill className="study-indicator-dot" /> : null
            }
          />
        </div>
      </div>

      <div className="lg:w-1/2">
        <ScheduleList />
      </div>

      <CalendarModal />
    </div>
  );
};

export default StudyCalendar;
