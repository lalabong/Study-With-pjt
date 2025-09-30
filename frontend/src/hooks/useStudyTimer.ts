'use client';

import { useCallback, useEffect, useRef, useState } from 'react';

import { useRoomStore } from '@stores/roomStore';

export interface StudyTimerState {
  seconds: number;
  minutes: number;
  hours: number;
  isRunning: boolean;
}

export interface StudyTimerActions {
  start: () => void;
  stop: () => void;
  reset: () => void;
  getTotalMinutes: () => number;
}

export interface StudyTimerReturn extends StudyTimerState, StudyTimerActions {}

const STORAGE_KEY_PREFIX = 'study_timer_backup';
const RESTORE_GRACE_PERIOD = 5 * 60 * 1000; // 5분 (밀리초)

export const useStudyTimer = (): StudyTimerReturn => {
  const [seconds, setSeconds] = useState(0);
  const [minutes, setMinutes] = useState(0);
  const [hours, setHours] = useState(0);

  const [isRunning, setIsRunning] = useState(false);

  const intervalRef = useRef<NodeJS.Timeout | null>(null); // 인터벌 참조
  const startTimeRef = useRef<Date | null>(null); // 시작 시간 참조

  const restoredRoomRef = useRef<string | null>(null); // 복원된 방 ID 추적
  const previousRoomIdRef = useRef<string | null>(null); // 이전 방 ID 추적

  const { currentRoomId } = useRoomStore();

  // 방 나가기 감지 및 타이머 백업
  useEffect(() => {
    // 이전에 방에 있었는데 현재 방이 없어진 경우 (방 나가기)
    if (previousRoomIdRef.current && !currentRoomId) {
      const storageKey = `${STORAGE_KEY_PREFIX}_${previousRoomIdRef.current}`;

      // 현재 타이머 상태를 나간 시점과 함께 백업
      const backupData = {
        roomId: previousRoomIdRef.current,
        seconds,
        minutes,
        hours,
        wasRunning: isRunning,
        leftAt: Date.now(), // 방을 나간 시점 기록
      };

      localStorage.setItem(storageKey, JSON.stringify(backupData));
      console.log(
        `💾 방 나가기 - 타이머 백업 (${hours}:${minutes}:${seconds}, 방ID: ${previousRoomIdRef.current})`,
      );

      // 타이머는 계속 실행 상태 유지 (다른 참가자들을 위해)
      restoredRoomRef.current = null;
    }

    previousRoomIdRef.current = currentRoomId;
  }, [currentRoomId, seconds, minutes, hours, isRunning]);

  // 로컬스토리지에서 백업 복원
  useEffect(() => {
    if (!currentRoomId) return;

    // 이미 초기화한 방이면 중복 방지
    if (restoredRoomRef.current === currentRoomId) return;

    const storageKey = `${STORAGE_KEY_PREFIX}_${currentRoomId}`;
    const savedTimer = localStorage.getItem(storageKey);

    if (savedTimer) {
      try {
        const parsed = JSON.parse(savedTimer);
        const { seconds: s, minutes: m, hours: h, leftAt, wasRunning } = parsed;

        // 방을 나간지 5분 이내라면 복원, 그렇지 않으면 초기화
        const timeSinceLeft = Date.now() - (leftAt || 0);
        const shouldRestore = timeSinceLeft <= RESTORE_GRACE_PERIOD;

        if (shouldRestore && leftAt) {
          // 단기간 재참여: 나간 시간만큼 추가해서 복원
          const awayTimeSeconds = Math.floor(timeSinceLeft / 1000);
          let newSeconds = (s || 0) + awayTimeSeconds;
          let newMinutes = m || 0;
          let newHours = h || 0;

          // 초 단위 올림 처리
          if (newSeconds >= 60) {
            newMinutes += Math.floor(newSeconds / 60);
            newSeconds = newSeconds % 60;
          }

          // 분 단위 올림 처리
          if (newMinutes >= 60) {
            newHours += Math.floor(newMinutes / 60);
            newMinutes = newMinutes % 60;
          }

          setSeconds(newSeconds);
          setMinutes(newMinutes);
          setHours(newHours);
          setIsRunning(wasRunning || false); // 나가기 전 실행 상태로 복원

          console.log(
            `🔄 타이머 복원 - ${newHours}:${newMinutes}:${newSeconds} (나간 시간 ${awayTimeSeconds}초 추가, 방ID: ${currentRoomId})`,
          );
        } else {
          // 장기간 이탈이거나 leftAt이 없는 경우: 초기화
          setSeconds(0);
          setMinutes(0);
          setHours(0);
          setIsRunning(false);
          localStorage.removeItem(storageKey);
          console.log(
            `⏱️ 새 스터디 세션 시작 - 0:0:0 (${leftAt ? '장기간 이탈 후' : '이전 백업 무효'}, 방ID: ${currentRoomId})`,
          );
        }
      } catch (error) {
        console.warn('Failed to restore timer backup:', error);
        // 파싱 실패 시 초기화
        setSeconds(0);
        setMinutes(0);
        setHours(0);
        setIsRunning(false);
      }
    } else {
      // 백업 데이터가 없으면 초기화
      setSeconds(0);
      setMinutes(0);
      setHours(0);
      setIsRunning(false);
      console.log(`⏱️ 새 스터디 세션 시작 - 0:0:0 (방ID: ${currentRoomId})`);
    }

    restoredRoomRef.current = currentRoomId;
  }, [currentRoomId]);

  // 백업 저장 (방을 나가지 않은 상태에서만 실시간 백업)
  const saveToLocalStorage = useCallback(() => {
    if (!currentRoomId) return;

    const storageKey = `${STORAGE_KEY_PREFIX}_${currentRoomId}`;
    const backup = {
      roomId: currentRoomId,
      seconds,
      minutes,
      hours,
      timestamp: Date.now(),
      // leftAt은 방을 나갈 때만 설정됨
    };
    localStorage.setItem(storageKey, JSON.stringify(backup));
  }, [currentRoomId, seconds, minutes, hours]);

  // 타이머 업데이트 - 함수형 업데이트로 완전 분리
  useEffect(() => {
    if (isRunning) {
      intervalRef.current = setInterval(() => {
        setSeconds((prevSeconds) => prevSeconds + 1);
      }, 1000);
    } else {
      if (intervalRef.current) {
        clearInterval(intervalRef.current);
        intervalRef.current = null;
      }
    }

    return () => {
      if (intervalRef.current) {
        clearInterval(intervalRef.current);
      }
    };
  }, [isRunning]);

  // 초가 60이 되면 분으로 변환
  useEffect(() => {
    if (seconds >= 60) {
      setSeconds(0);
      setMinutes((prev) => prev + 1);
    }
  }, [seconds]);

  // 분이 60이 되면 시간으로 변환
  useEffect(() => {
    if (minutes >= 60) {
      setMinutes(0);
      setHours((prev) => prev + 1);
    }
  }, [minutes]);

  // 상태 변경시 백업 저장
  useEffect(() => {
    saveToLocalStorage();
  }, [saveToLocalStorage]);

  // 페이지 떠날 때 백업 저장
  useEffect(() => {
    const handleBeforeUnload = () => {
      saveToLocalStorage();
    };

    window.addEventListener('beforeunload', handleBeforeUnload);
    return () => {
      window.removeEventListener('beforeunload', handleBeforeUnload);
    };
  }, [saveToLocalStorage]);

  // 브라우저 포커스 변화 감지
  useEffect(() => {
    const handleVisibilityChange = () => {
      if (document.hidden && isRunning) {
        // 포커스 잃을 때 현재 시간 저장
        startTimeRef.current = new Date();
      } else if (!document.hidden && isRunning && startTimeRef.current) {
        // 포커스 돌아올 때 시간 복원 (선택적 기능)
        saveToLocalStorage();
      }
    };

    document.addEventListener('visibilitychange', handleVisibilityChange);
    return () => {
      document.removeEventListener('visibilitychange', handleVisibilityChange);
    };
  }, [isRunning, saveToLocalStorage]);

  const start = useCallback(() => {
    setIsRunning(true);
    startTimeRef.current = new Date();
  }, []);

  const stop = useCallback(() => {
    setIsRunning(false);
    startTimeRef.current = null;
    // 타이머 화면은 그대로 유지 (리셋하지 않음)
  }, []);

  const reset = useCallback(() => {
    setIsRunning(false);
    setSeconds(0);
    setMinutes(0);
    setHours(0);
    startTimeRef.current = null;

    // 로컬스토리지 정리
    if (currentRoomId) {
      const storageKey = `${STORAGE_KEY_PREFIX}_${currentRoomId}`;
      localStorage.removeItem(storageKey);
    }
  }, [currentRoomId]);

  const getTotalMinutes = useCallback(() => {
    // 현재 화면에 표시된 시간이 곧 총 시간 (누적 개념 없이)
    const currentSessionSeconds = hours * 3600 + minutes * 60 + seconds;
    const currentSessionMinutes = currentSessionSeconds / 60; // 소수점 포함
    return currentSessionMinutes;
  }, [hours, minutes, seconds]);

  return {
    seconds,
    minutes,
    hours,
    isRunning,
    start,
    stop,
    reset,
    getTotalMinutes,
  };
};
