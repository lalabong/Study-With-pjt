'use client';

import { useState, useEffect } from 'react';

import StatusMessage from '@components/common/StatusMessage';

interface TotalStudyTimeProps {
  initialValue?: number;
  className?: string;
}

const TotalStudyTime = ({ initialValue, className = '' }: TotalStudyTimeProps) => {
  const [mounted, setMounted] = useState(false);
  const [totalHours, setTotalHours] = useState<number>(initialValue || 0);

  const fetchTotalHours = async () => {
    return Math.floor(Math.random() * 100) + 500;
  };

  // 임시 더미 코드
  useEffect(() => {
    if (mounted && !initialValue) {
      fetchTotalHours().then((hours) => {
        setTotalHours(hours);
      });
    }
  }, [mounted, initialValue]);

  useEffect(() => {
    setMounted(true);
    return () => {};
  }, []);

  return (
    <div className={`${className} rounded-lg bg-white p-6 shadow-sm`}>
      <div className="flex items-center justify-between mb-4">
        <h3 className="text-lg font-medium">총 활동 시간</h3>
      </div>
      {!mounted ? (
        <StatusMessage
          status="loading"
          message="활동 시간 정보를 불러오는 중..."
          className="h-[300px]"
        />
      ) : (
        <div className="flex flex-col items-center justify-center h-[300px]">
          <div className="text-7xl font-bold text-center">{totalHours}</div>
          <div className="text-gray-500 mt-2">시간</div>
        </div>
      )}
    </div>
  );
};

export default TotalStudyTime;
