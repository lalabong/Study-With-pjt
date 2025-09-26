'use client';

import { useCallback, useEffect, useRef } from 'react';

import { usePostTimeLogMutation } from '@hooks/api/usePostTimeLogMutation';
import { StudyTimerActions } from '@hooks/useStudyTimer';

import { useRoomStore } from '@stores/roomStore';

interface UseStudyTimeSyncOptions {
  getTotalMinutes: () => number;
  reset: StudyTimerActions['reset'];
  isRunning: boolean;
}

const SYNC_INTERVAL = 10 * 60 * 1000; // 10분
const MIN_SYNC_TIME = 1; // 최소 1분 이상일 때만 동기화
const SYNC_STORAGE_KEY_PREFIX = 'study_sync_backup';

export const useStudyTimeSync = ({
  getTotalMinutes,
  reset,
  isRunning,
}: UseStudyTimeSyncOptions) => {
  const { currentRoomId } = useRoomStore();
  const { mutate: postTimeLog } = usePostTimeLogMutation();

  const intervalRef = useRef<NodeJS.Timeout | null>(null);
  const lastSyncedMinutesRef = useRef<number>(0); // 마지막으로 동기화한 분 수
  const pendingTimeRef = useRef<number>(0);
  const restoredSyncRoomRef = useRef<string | null>(null); // 동기화 상태 복원된 방 ID 추적

  // 로컬스토리지에서 동기화 상태 복원
  useEffect(() => {
    if (!currentRoomId) return;

    // 이미 복원한 방이면 중복 복원 방지
    if (restoredSyncRoomRef.current === currentRoomId) return;

    const syncStorageKey = `${SYNC_STORAGE_KEY_PREFIX}_${currentRoomId}`;

    try {
      const savedSync = localStorage.getItem(syncStorageKey);
      if (savedSync) {
        const parsed = JSON.parse(savedSync);
        lastSyncedMinutesRef.current = parsed.lastSyncedMinutes || 0;
        pendingTimeRef.current = parsed.pendingTime || 0;
        restoredSyncRoomRef.current = currentRoomId; // 복원 완료 표시
        console.log(
          `🔄 동기화 상태 복원 - 마지막 동기화: ${lastSyncedMinutesRef.current}분, 대기 중: ${pendingTimeRef.current}분 (방ID: ${currentRoomId})`,
        );
      } else {
        // 저장된 데이터가 없으면 초기화하고 복원 완료 표시
        lastSyncedMinutesRef.current = 0;
        pendingTimeRef.current = 0;
        restoredSyncRoomRef.current = currentRoomId;
        console.log(`🆕 새 동기화 상태 시작 - 마지막 동기화: 0분 (방ID: ${currentRoomId})`);
      }
    } catch (error) {
      console.warn('Failed to restore sync state:', error);
      restoredSyncRoomRef.current = currentRoomId; // 에러 시에도 중복 방지
    }
  }, [currentRoomId]);

  // 동기화 상태 저장
  const saveSyncState = useCallback(() => {
    if (!currentRoomId) return;

    const syncStorageKey = `${SYNC_STORAGE_KEY_PREFIX}_${currentRoomId}`;
    const syncState = {
      roomId: currentRoomId,
      lastSyncedMinutes: lastSyncedMinutesRef.current,
      pendingTime: pendingTimeRef.current,
      timestamp: Date.now(),
    };
    localStorage.setItem(syncStorageKey, JSON.stringify(syncState));
  }, [currentRoomId]);

  // 서버에 시간 저장
  const syncTimeToServer = useCallback(
    async (timeToSync: number, isManual = false) => {
      if (!currentRoomId || timeToSync < MIN_SYNC_TIME) return;

      try {
        postTimeLog({
          totalTime: Math.floor(timeToSync), // 분 단위로 전송
          roomId: currentRoomId,
        });

        // 성공한 시간을 기록
        lastSyncedMinutesRef.current = getTotalMinutes();
        pendingTimeRef.current = 0; // 성공 시 대기 중인 시간 초기화

        // 동기화 상태 저장
        saveSyncState();

        console.log(
          `✅ 공부 시간 동기화 완료: ${Math.floor(timeToSync)}분 ${isManual ? '(수동)' : '(자동)'}, 현재 총 시간: ${lastSyncedMinutesRef.current.toFixed(1)}분`,
        );
      } catch (error) {
        console.error('❌ 공부 시간 동기화 실패:', error);
        // 실패한 시간을 pending에 보관하여 나중에 재시도
        pendingTimeRef.current += timeToSync;
      }
    },
    [currentRoomId, postTimeLog, getTotalMinutes, saveSyncState],
  );

  // 주기적 동기화 (10분마다)
  useEffect(() => {
    if (isRunning && currentRoomId) {
      intervalRef.current = setInterval(() => {
        const totalMinutes = getTotalMinutes();
        const timeToSync = totalMinutes - lastSyncedMinutesRef.current + pendingTimeRef.current;

        if (timeToSync >= MIN_SYNC_TIME) {
          syncTimeToServer(timeToSync);
        }
      }, SYNC_INTERVAL);
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
  }, [isRunning, currentRoomId, getTotalMinutes, syncTimeToServer]);

  // 타이머 중지 시 즉시 동기화
  const handleTimerStop = useCallback(() => {
    const totalMinutes = getTotalMinutes();
    const timeToSync = totalMinutes - lastSyncedMinutesRef.current + pendingTimeRef.current;

    console.log(
      `타이머 정지 - 총 시간: ${totalMinutes.toFixed(2)}분, 마지막 동기화: ${lastSyncedMinutesRef.current}분, 동기화할 시간: ${timeToSync.toFixed(2)}분`,
    );

    if (timeToSync >= MIN_SYNC_TIME) {
      syncTimeToServer(timeToSync, true);
    }
  }, [getTotalMinutes, syncTimeToServer]);

  // 페이지 떠날 때 동기화
  useEffect(() => {
    const handleBeforeUnload = () => {
      if (isRunning) {
        const totalMinutes = getTotalMinutes();
        const timeToSync = totalMinutes - lastSyncedMinutesRef.current + pendingTimeRef.current;

        if (timeToSync >= MIN_SYNC_TIME) {
          // beforeunload에서는 동기 요청만 가능하므로 navigator.sendBeacon 사용
          const data = JSON.stringify({
            totalTime: Math.floor(timeToSync),
            roomId: currentRoomId,
          });

          navigator.sendBeacon('/api/users/timelogs', data);
        }
      }
    };

    window.addEventListener('beforeunload', handleBeforeUnload);
    return () => {
      window.removeEventListener('beforeunload', handleBeforeUnload);
    };
  }, [isRunning, getTotalMinutes, currentRoomId]);

  // 타이머 리셋 시 동기화 상태도 리셋
  const handleTimerReset = useCallback(() => {
    lastSyncedMinutesRef.current = 0;
    pendingTimeRef.current = 0;

    // 로컬스토리지에서도 동기화 상태 삭제
    if (currentRoomId) {
      const syncStorageKey = `${SYNC_STORAGE_KEY_PREFIX}_${currentRoomId}`;
      localStorage.removeItem(syncStorageKey);
    }

    reset();
  }, [reset, currentRoomId]);

  return {
    handleTimerStop,
    handleTimerReset,
    syncTimeToServer,
  };
};
