'use client';

import { useEffect, useState } from 'react';

import Calendar from 'react-calendar';
import 'react-calendar/dist/Calendar.css';
import { GoDotFill } from 'react-icons/go';
import { HiChevronLeft, HiChevronRight } from 'react-icons/hi';

import { useUserSchedulesQuery } from '@hooks/api/useUserSchedulesQuery';

import { useAuthStore } from '@stores/authStore';

import { Schedule } from '@/types/api';

import './studyCalendar.css';

interface StudyCalendarProps {
  className?: string;
}

type ValuePiece = Date | null;
type Value = ValuePiece | [ValuePiece, ValuePiece];

const StudyCalendar = ({ className = '' }: StudyCalendarProps) => {
  const [userId, setUserId] = useState('');

  useEffect(() => {
    setUserId(useAuthStore.getState().user?.userId || '');
  }, []);

  const { data } = useUserSchedulesQuery({
    userId,
    enabled: !!userId,
  });

  const markedDates =
    data?.schedules.map((schedule: Schedule) => new Date(schedule.startTime)) || [];

  const activeDate = new Date();
  const [value, onChange] = useState<Value>(activeDate);
  const [currentMonth, setCurrentMonth] = useState<Date>(activeDate);

  const showYears = Array.from({ length: 5 }, (_, i) => currentMonth.getFullYear() - 2 + i);

  const months = [
    '1월',
    '2월',
    '3월',
    '4월',
    '5월',
    '6월',
    '7월',
    '8월',
    '9월',
    '10월',
    '11월',
    '12월',
  ];

  const weekDays = ['일', '월', '화', '수', '목', '금', '토'];

  // 일정이 있는 날짜인지 확인
  const isStudyDate = (date: Date) => {
    return markedDates.some(
      (studyDate: Date) =>
        studyDate.getDate() === date.getDate() &&
        studyDate.getMonth() === date.getMonth() &&
        studyDate.getFullYear() === date.getFullYear(),
    );
  };

  // 현재 보고 있는 월 변경 핸들러
  const handleActiveStartDateChange = ({ activeStartDate }: { activeStartDate: Date | null }) => {
    if (activeStartDate) {
      setCurrentMonth(activeStartDate);
    }
  };

  const handleMonthChange = (e: React.ChangeEvent<HTMLSelectElement>) => {
    const newMonth = new Date(currentMonth);
    newMonth.setMonth(parseInt(e.target.value));
    setCurrentMonth(newMonth);
  };

  const handleYearChange = (e: React.ChangeEvent<HTMLSelectElement>) => {
    const newYear = new Date(currentMonth);
    newYear.setFullYear(parseInt(e.target.value));
    setCurrentMonth(newYear);
  };

  const handleStudyDateClick = (date: Date) => {
    console.log('선택한 일정 상세:', date);
  };

  return (
    <div className={className}>
      <div className="mb-6 flex items-center justify-between">
        <div className="flex items-center space-x-4">
          <select
            value={currentMonth.getFullYear()}
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
            value={currentMonth.getMonth()}
            onChange={handleMonthChange}
            className="rounded border border-gray-300 bg-white px-3 py-2 text-base"
          >
            {months.map((month, index) => (
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
            onClick={() => {
              const prevMonth = new Date(currentMonth);
              prevMonth.setMonth(prevMonth.getMonth() - 1);
              setCurrentMonth(prevMonth);
            }}
          >
            <HiChevronLeft className="h-5 w-5" />
          </button>
          <button
            className="rounded-full border border-gray-300 p-2 hover:bg-gray-100"
            aria-label="다음 달 버튼"
            onClick={() => {
              const nextMonth = new Date(currentMonth);
              nextMonth.setMonth(nextMonth.getMonth() + 1);
              setCurrentMonth(nextMonth);
            }}
          >
            <HiChevronRight className="h-5 w-5" />
          </button>
        </div>
      </div>

      <div className="calendar-container w-full">
        <Calendar
          onClickDay={(date) => {
            handleStudyDateClick(date);
          }}
          onChange={onChange}
          value={value}
          activeStartDate={currentMonth}
          onActiveStartDateChange={handleActiveStartDateChange}
          className="w-full rounded-lg border-none text-base"
          formatShortWeekday={(locale, date) => weekDays[date.getDay()]}
          tileClassName={({ date }) => {
            const classes = [];

            if (isStudyDate(date)) {
              classes.push('study-date');
            }

            if (
              date.getDate() === activeDate.getDate() &&
              date.getMonth() === activeDate.getMonth() &&
              date.getFullYear() === activeDate.getFullYear()
            ) {
              classes.push('bg-blue-500 text-white rounded-full');
            } else {
              classes.push('rounded-full');
            }

            return classes.join(' ');
          }}
          tileContent={({ date }) => {
            if (isStudyDate(date)) {
              return <GoDotFill className="study-indicator-dot" />;
            }
            return null;
          }}
        />
      </div>
    </div>
  );
};

export default StudyCalendar;
