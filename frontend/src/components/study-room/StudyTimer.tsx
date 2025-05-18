'use client';

import { useEffect, useState } from 'react';

import { formatToTwoDigits } from '@utils/date';

interface StudyTimerProps {
  isRunning: boolean;
}

const StudyTimer = ({ isRunning }: StudyTimerProps) => {
  const [seconds, setSeconds] = useState(0);
  const [minutes, setMinutes] = useState(0);
  const [hours, setHours] = useState(0);

  useEffect(() => {
    let interval: NodeJS.Timeout | null = null;

    if (isRunning) {
      interval = setInterval(() => {
        setSeconds((prevSeconds) => {
          const newSeconds = prevSeconds + 1;

          if (newSeconds === 60) {
            setMinutes((prevMinutes) => {
              const newMinutes = prevMinutes + 1;

              if (newMinutes === 60) {
                setHours((prevHours) => prevHours + 1);
                return 0;
              }

              return newMinutes;
            });
            return 0;
          }

          return newSeconds;
        });
      }, 1000);
    }

    return () => {
      if (interval) {
        clearInterval(interval);
      }
    };
  }, [isRunning]);

  return (
    <div className="flex flex-col items-center">
      <h2
        className="text-7xl font-bold text-gray-800 font-mono tracking-wider"
        aria-live="polite"
        aria-label="스터디 타이머"
      >
        {formatToTwoDigits(hours)}:{formatToTwoDigits(minutes)}:{formatToTwoDigits(seconds)}
      </h2>
    </div>
  );
};

export default StudyTimer;
