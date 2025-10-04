'use client';

import { useEffect } from 'react';

import { useStudyTimeSync } from '@hooks/useStudyTimeSync';
import { WebSocketTimerReturn } from '@hooks/useWebSocketTimer';

import { formatToTwoDigits } from '@utils/date';

interface StudyTimerProps {
  timer: WebSocketTimerReturn;
  onTimerStateChange?: (state: { isRunning: boolean; totalMinutes: number }) => void;
}

const StudyTimer = ({ timer, onTimerStateChange }: StudyTimerProps) => {
  const sync = useStudyTimeSync({
    getTotalMinutes: timer.getTotalMinutes,
    reset: timer.reset,
    isRunning: timer.isRunning,
  });

  // 타이머 정지 시 동기화 처리
  useEffect(() => {
    if (!timer.isRunning) {
      sync.handleTimerStop();
    }
  }, [timer.isRunning, sync]);

  // 타이머 상태 변화를 부모 컴포넌트에 알림
  useEffect(() => {
    if (onTimerStateChange) {
      onTimerStateChange({
        isRunning: timer.isRunning,
        totalMinutes: timer.getTotalMinutes(),
      });
    }
  }, [timer.isRunning, timer.seconds, onTimerStateChange, timer.getTotalMinutes]);

  return (
    <div className="flex flex-col items-center">
      <h2
        className="text-7xl font-bold text-gray-800 font-mono tracking-wider"
        aria-live="polite"
        aria-label="스터디 타이머"
      >
        {formatToTwoDigits(timer.hours)}:{formatToTwoDigits(timer.minutes)}:
        {formatToTwoDigits(timer.seconds)}
      </h2>

      <div className="mt-4 text-sm text-center">
        <div className="flex items-center justify-center gap-2">
          <div
            className={`w-2 h-2 rounded-full ${timer.isConnected ? 'bg-green-500' : 'bg-red-500'}`}
          ></div>
          <span className={timer.isConnected ? 'text-green-600' : 'text-red-600'}>
            {timer.isConnected ? '실시간 동기화' : '오프라인 모드'}
          </span>
        </div>
      </div>
    </div>
  );
};

export default StudyTimer;
