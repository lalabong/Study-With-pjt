'use client';

import { useEffect, useState } from 'react';

import dynamic from 'next/dynamic';

import { HiChevronLeft, HiChevronRight } from 'react-icons/hi';

import StatusMessage from '@components/common/StatusMessage';

import { WEEK_DAYS_KO } from '@constants/calendar';

import { useUserTimeLogsQuery } from '@hooks/api/useUserTimeLogsQuery';

import { useAuthStore } from '@stores/authStore';

import { addDays, addMonths, getCurrentDateString, isFutureDate } from '@utils/date';

import { MonthlyTimeLog, WeeklyTimeLog } from '@/types/api';

const ChartComponent = dynamic(() => import('@components/mypage/Chart/ChartWrapper'), {
  ssr: false,
});

interface ChartDataItem {
  day: string;
  hours: number;
}

interface StatisticsChartProps {
  className?: string;
  chartType?: 'bar' | 'line';
  barColor?: string;
  lineColor?: string;
  title?: string;
  mode: 'week' | 'month';
  currentDate?: string;
  onPrev?: () => void;
  onNext?: () => void;
}

const StatisticsChart = ({
  className,
  chartType = 'bar',
  barColor = '#4F46E5',
  lineColor = '#3B82F6',
  title,
  mode,
  currentDate: externalCurrentDate,
  onPrev,
  onNext,
}: StatisticsChartProps) => {
  const userId = useAuthStore((state) => state.user?.userId) || '';

  // 부모 컴포넌트에서 날짜를 관리하는 경우와 컴포넌트 내부에서 관리하는 경우 분기
  const [internalCurrentDate, setInternalCurrentDate] = useState<string>(getCurrentDateString);

  // 외부에서 currentDate가 제공되면 그것을 사용, 아니면 내부 상태 사용
  const currentDate = externalCurrentDate || internalCurrentDate;

  const {
    data: timelogsData,
    isLoading,
    error,
  } = useUserTimeLogsQuery({
    userId,
    period: mode,
    date: currentDate,
    enabled: !!userId,
  });

  // 주간 데이터 파싱
  const parseWeekData = (weeklyData?: WeeklyTimeLog[]): ChartDataItem[] => {
    if (!weeklyData) return [];

    return weeklyData.map((item, index) => ({
      day: WEEK_DAYS_KO[index],
      hours: item.decimalHours,
    }));
  };

  // 월간 데이터 파싱
  const parseMonthData = (monthlyData?: MonthlyTimeLog[]): ChartDataItem[] => {
    if (!monthlyData) return [];

    return monthlyData.map((item) => {
      // eslint-disable-next-line @typescript-eslint/no-unused-vars
      const [year, month] = item.month.split('-');
      return {
        day: parseInt(month, 10).toString(),
        hours: item.totalTime.decimalHours,
      };
    });
  };

  // 날짜 범위 문자열 생성
  const getDateRangeString = () => {
    if (!timelogsData?.periodInfo) return '';

    const { startDate, endDate } = timelogsData.periodInfo;

    if (mode === 'week') {
      return `${startDate} ~ ${endDate}`;
    } else {
      const [startYear, startMonth] = startDate.split('-');
      const [endYear, endMonth] = endDate.split('-');
      return `${startYear}-${startMonth} ~ ${endYear}-${endMonth}`;
    }
  };

  // 이전 주/월 범위 버튼 클릭 시
  const handlePrev = () => {
    if (onPrev) {
      onPrev();
      return;
    }

    if (mode === 'week') {
      setInternalCurrentDate((current) => addDays(current, -7));
    } else {
      setInternalCurrentDate((current) => addMonths(current, -1));
    }
  };

  // 다음 주/월 범위 버튼 클릭 시
  const handleNext = () => {
    if (onNext) {
      onNext();
      return;
    }

    let nextDate;
    if (mode === 'week') {
      nextDate = addDays(internalCurrentDate, 7);
    } else {
      nextDate = addMonths(internalCurrentDate, 1);
    }

    // 미래 날짜는 조회하지 않도록 제한
    if (isFutureDate(nextDate)) return;

    setInternalCurrentDate(nextDate);
  };

  const [chartData, setChartData] = useState<ChartDataItem[]>([]);
  const [totalHours, setTotalHours] = useState<number>(0);

  useEffect(() => {
    if (timelogsData) {
      let newData: ChartDataItem[] = [];

      if (mode === 'week' && timelogsData.weeklyData) {
        newData = parseWeekData(timelogsData.weeklyData);
      } else if (mode === 'month' && timelogsData.monthlyData) {
        newData = parseMonthData(timelogsData.monthlyData);
      }

      setChartData(newData);
      setTotalHours(timelogsData.totalTime.decimalHours || 0);
    }
  }, [mode, timelogsData]);

  // 주간은 소수점 첫째자리까지, 월간은 반올림 -> 백엔드에서 처리할지 고민...
  const formattedTotalHours = mode === 'week' ? totalHours.toFixed(1) : Math.round(totalHours);

  if (isLoading) {
    return <StatusMessage status="loading" />;
  }

  if (error) {
    return <StatusMessage status="error" />;
  }

  return (
    <div className={`${className}`}>
      <div className="mb-2 flex items-center justify-between">
        <h3 className="text-lg font-medium">{title}</h3>
        <span className="font-medium">
          {mode === 'week' ? `${formattedTotalHours}시간` : `총 ${formattedTotalHours}시간`}
        </span>
      </div>
      <div className="mb-2 flex items-center justify-between">
        <div className="flex items-center space-x-2">
          <button
            className="rounded-full border border-gray-300 p-1.5 hover:bg-gray-100 disabled:opacity-50"
            aria-label={mode === 'week' ? '이전 주 버튼' : '이전 6개월 버튼'}
            onClick={handlePrev}
            disabled={
              mode === 'week'
                ? isFutureDate(addDays(currentDate, -7))
                : isFutureDate(addMonths(currentDate, -6))
            }
          >
            <HiChevronLeft className="h-4 w-4" />
          </button>
          <span className="text-sm text-gray-600">{getDateRangeString()}</span>
          <button
            className="rounded-full border border-gray-300 p-1.5 hover:bg-gray-100 disabled:opacity-50"
            aria-label={mode === 'week' ? '다음 주 버튼' : '다음 6개월 버튼'}
            onClick={handleNext}
            disabled={
              mode === 'week'
                ? isFutureDate(addDays(currentDate, 7))
                : isFutureDate(addMonths(currentDate, 6))
            }
          >
            <HiChevronRight className="h-4 w-4" />
          </button>
        </div>
      </div>
      <div className="h-[250px] w-full bg-white pr-8">
        <ChartComponent
          data={chartData}
          chartType={chartType}
          barColor={barColor}
          lineColor={lineColor}
        />
      </div>
    </div>
  );
};

export default StatisticsChart;
