'use client';

import { useEffect, useState } from 'react';

import Calendar from 'react-calendar';
import 'react-calendar/dist/Calendar.css';
import { GoDotFill } from 'react-icons/go';
import { HiChevronLeft, HiChevronRight } from 'react-icons/hi';

import { MONTHS, WEEK_DAYS } from '@constants/calendar';

import { useUserSchedulesQuery } from '@hooks/api/useUserSchedulesQuery';

import { formatDateToString, getYearRange } from '@utils/date';

import { Schedule } from '@/types/api';

import '@components/mypage/StudyCalendar/studyCalendar.css';

interface StudyCalendarProps {
  userId: string;
}

// 리액트 캘린더 사용을 위한 타입 정의
type ValuePiece = Date | null;
type Value = ValuePiece | [ValuePiece, ValuePiece];

const StudyCalendar = ({ userId }: StudyCalendarProps) => {
  // 초기값: 오늘
  const activeDate = new Date();

  const [selectedDate, setSelectedDate] = useState<Value>(activeDate); // 선택된 날짜
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

  // 일정이 있는 날짜들
  const markedDates =
    data?.schedules.map((schedule: Schedule) => new Date(schedule.startTime)) || [];

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

  // 현재 보고 있는 월 변경 핸들러
  const handleActiveStartDateChange = ({ activeStartDate }: { activeStartDate: Date | null }) => {
    if (activeStartDate) {
      setCurrentViewDate(activeStartDate);

      updateDateRangeFromMonth(activeStartDate);
    }
  };

  // 특정 날짜를 선택했을 때 핸들러
  const handleStudyDateClick = (date: Date) => {
    console.log('선택한 일정 상세:', date);
    setSelectedDate(date); // 선택된 날짜 업데이트
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
    <div className="w-full">
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

      <div className="calendar-container w-full">
        <Calendar
          onClickDay={handleStudyDateClick}
          onChange={setSelectedDate}
          value={selectedDate}
          activeStartDate={currentViewDate}
          onActiveStartDateChange={handleActiveStartDateChange}
          className="w-full rounded-lg border-none text-base"
          formatShortWeekday={(locale, date) => WEEK_DAYS[date.getDay()]}
          tileClassName={getTileClassName}
          tileContent={getTileContent}
        />
      </div>
    </div>
  );
};

export default StudyCalendar;
