'use client';

import { useState } from 'react';

import StatisticsChart from '@components/mypage/Chart/StatisticsChart';
import TotalStudyTime from '@components/mypage/TotalStudyTime';

import { addDays, addMonths, getCurrentDateString } from '@utils/date';

const TimeSection = () => {
  const [weekCurrentDate, setWeekCurrentDate] = useState<string>(getCurrentDateString);
  const [monthCurrentDate, setMonthCurrentDate] = useState<string>(getCurrentDateString);

  const handleWeekPrev = () => {
    setWeekCurrentDate((current) => addDays(current, -7));
  };

  const handleWeekNext = () => {
    const nextDate = addDays(weekCurrentDate, 7);

    setWeekCurrentDate(nextDate);
  };

  const handleMonthPrev = () => {
    setMonthCurrentDate((current) => addMonths(current, -6));
  };

  const handleMonthNext = () => {
    const nextDate = addMonths(monthCurrentDate, 6);

    setMonthCurrentDate(nextDate);
  };

  return (
    <div className="grid grid-cols-1 gap-6 md:grid-cols-3">
      <div className="rounded-lg bg-white p-5 shadow-sm">
        <StatisticsChart
          mode="week"
          chartType="line"
          lineColor="#4F46E5"
          title="주간 활동 시간"
          currentDate={weekCurrentDate}
          onPrev={handleWeekPrev}
          onNext={handleWeekNext}
        />
      </div>

      <div className="rounded-lg bg-white p-5 shadow-sm">
        <StatisticsChart
          mode="month"
          chartType="bar"
          barColor="#4F46E5"
          title="월간 활동 시간"
          currentDate={monthCurrentDate}
          onPrev={handleMonthPrev}
          onNext={handleMonthNext}
        />
      </div>

      <TotalStudyTime />
    </div>
  );
};

export default TimeSection;
