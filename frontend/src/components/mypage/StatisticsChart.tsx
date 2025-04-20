'use client';

import dynamic from 'next/dynamic';
import { useEffect, useState } from 'react';
import { HiChevronLeft, HiChevronRight } from 'react-icons/hi';

const ChartComponent = dynamic(() => import('./ChartWrapper'), {
  ssr: false,
});

interface StatisticsChartProps {
  data?: Array<{ day: string; hours: number }>;
  className?: string;
  chartType?: 'bar' | 'line';
  barColor?: string;
  lineColor?: string;
  title?: string;
  mode?: 'week' | 'month';
  initialStartDate?: Date;
}

const StatisticsChart = ({
  data: initialData,
  className,
  chartType = 'bar',
  barColor = '#4F46E5',
  lineColor = '#3B82F6',
  title,
  mode,
  initialStartDate,
}: StatisticsChartProps) => {
  const [mounted, setMounted] = useState(false);
  const [chartData, setChartData] = useState<Array<{ day: string; hours: number }>>([]);
  const [totalHours, setTotalHours] = useState<number>(0);

  // 시작 날짜 관리 (주간 또는 월간)
  const [startDate, setStartDate] = useState<Date>(() => {
    if (initialStartDate) return initialStartDate;

    const now = new Date();

    if (mode === 'week') {
      const day = now.getDay();
      const diff = day === 0 ? 6 : day - 1;
      return new Date(now.getFullYear(), now.getMonth(), now.getDate() - diff); // 주간 모드 시작 날짜(오늘기준 이번주 월요일 ~ 일요일)
    } else {
      return new Date(now.getFullYear(), now.getMonth() - 5, 1); // 월간 모드 시작 날짜(6개월 전 1일 ~ 오늘)
    }
  });

  // 주간 데이터 생성
  const generateWeekData = (date: Date) => {
    const weekData = [];
    const days = ['월', '화', '수', '목', '금', '토', '일'];

    for (let i = 0; i < 7; i++) {
      const currentDate = new Date(date);
      currentDate.setDate(date.getDate() + i);

      weekData.push({
        day: days[i],
        hours: Math.round(Math.random() * 5 * 10) / 10,
      });
    }

    return weekData;
  };

  // 월간 데이터 생성
  const generateMonthData = (date: Date) => {
    const monthData = [];

    for (let i = 0; i < 6; i++) {
      const currentDate = new Date(date);
      currentDate.setMonth(date.getMonth() + i);

      monthData.push({
        day: `${currentDate.getMonth() + 1}월`,
        hours: Math.round(Math.random() * 100),
      });
    }

    return monthData;
  };

  // 날짜 범위 문자열 생성 (ex: 주간의 경우 2025-04-20 ~ 2025-04-26, 월간의 경우 2025-01 ~ 2025-06)
  const getDateRangeString = () => {
    if (mode === 'week') {
      const endDate = new Date(startDate);
      endDate.setDate(startDate.getDate() + 6);

      return `${startDate.getFullYear()}-${String(startDate.getMonth() + 1).padStart(2, '0')}-${String(startDate.getDate()).padStart(2, '0')} ~ ${endDate.getFullYear()}-${String(endDate.getMonth() + 1).padStart(2, '0')}-${String(endDate.getDate()).padStart(2, '0')}`;
    } else {
      const endDate = new Date(startDate);
      endDate.setMonth(startDate.getMonth() + 5);

      return `${startDate.getFullYear()}-${String(startDate.getMonth() + 1).padStart(2, '0')} ~ ${endDate.getFullYear()}-${String(endDate.getMonth() + 1).padStart(2, '0')}`;
    }
  };

  const handlePrev = () => {
    const newStartDate = new Date(startDate);

    if (mode === 'week') {
      newStartDate.setDate(startDate.getDate() - 7);
    } else {
      newStartDate.setMonth(startDate.getMonth() - 6);
    }

    setStartDate(newStartDate);
  };

  const handleNext = () => {
    const newStartDate = new Date(startDate);

    if (mode === 'week') {
      newStartDate.setDate(startDate.getDate() + 7);
    } else {
      newStartDate.setMonth(startDate.getMonth() + 6);
    }

    setStartDate(newStartDate);
  };

  useEffect(() => {
    if (mounted) {
      let newData;
      if (initialData) {
        newData = initialData;
      } else if (mode === 'week') {
        newData = generateWeekData(startDate);
      } else {
        newData = generateMonthData(startDate);
      }

      setChartData(newData);

      const total = newData.reduce((sum, item) => sum + item.hours, 0);
      setTotalHours(total);
    }
  }, [mounted, mode, startDate, initialData]);

  useEffect(() => {
    setMounted(true);
    return () => {};
  }, []);

  const emptyData =
    mode === 'week'
      ? Array(7)
          .fill(0)
          .map((_, i) => ({ day: ['월', '화', '수', '목', '금', '토', '일'][i], hours: 0 }))
      : Array(6)
          .fill(0)
          .map((_, i) => ({ day: `${i + 1}월`, hours: 0 }));

  // 주간은 소수점 첫째자리까지, 월간은 반올림
  const formattedTotalHours = mode === 'week' ? totalHours.toFixed(1) : Math.round(totalHours);

  return (
    <div className={`${className}`}>
      <div className="flex items-center justify-between mb-2">
        <h3 className="text-lg font-medium">{title}</h3>
        <span className="font-medium">
          {mode === 'week' ? `${formattedTotalHours}시간` : `총 ${formattedTotalHours}시간`}
        </span>
      </div>
      <div className="flex items-center justify-between mb-2">
        <div className="flex space-x-2 items-center">
          <button
            className="rounded-full border border-gray-300 p-1.5 hover:bg-gray-100"
            aria-label={mode === 'week' ? '이전 주 버튼' : '이전 6개월 버튼'}
            onClick={handlePrev}
          >
            <HiChevronLeft className="h-4 w-4" />
          </button>
          <span className="text-sm text-gray-600">{getDateRangeString()}</span>
          <button
            className="rounded-full border border-gray-300 p-1.5 hover:bg-gray-100"
            aria-label={mode === 'week' ? '다음 주 버튼' : '다음 6개월 버튼'}
            onClick={handleNext}
          >
            <HiChevronRight className="h-4 w-4" />
          </button>
        </div>
      </div>
      <div className="h-[250px] w-full bg-white">
        {mounted && (
          <ChartComponent
            data={chartData.length > 0 ? chartData : emptyData}
            chartType={chartType}
            barColor={barColor}
            lineColor={lineColor}
          />
        )}
      </div>
    </div>
  );
};

export default StatisticsChart;
