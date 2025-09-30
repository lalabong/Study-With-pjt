'use client';

import { HiPlay, HiStop } from 'react-icons/hi';

import StudyTimer from '@components/study-room/StudyTimer';

import { useWebSocketTimer } from '@hooks/useWebSocketTimer';

const TimerSection = () => {
  const timer = useWebSocketTimer();

  const handleToggleTimer = () => {
    if (timer.isRunning) {
      timer.stop();
    } else {
      timer.start();
    }
  };
  return (
    <section className="flex flex-row justify-center items-center gap-3">
      <StudyTimer timer={timer} />
      <div className="flex flex-row justify-center items-center gap-4">
        {timer.isRunning ? (
          <HiStop
            className="h-15 w-15 text-red-500 hover:text-red-600 rounded-full transition-colors cursor-pointer"
            onClick={handleToggleTimer}
            aria-label="타이머 멈추기"
          />
        ) : (
          <HiPlay
            className="h-15 w-15 text-green-400 hover:text-green-500 rounded-full transition-colors cursor-pointer"
            onClick={handleToggleTimer}
            aria-label="타이머 시작하기"
          />
        )}
      </div>
    </section>
  );
};

export default TimerSection;
