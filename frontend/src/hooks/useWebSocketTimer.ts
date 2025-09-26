'use client';

import { useCallback, useEffect, useRef, useState } from 'react';

import { useAuthStore } from '@stores/authStore';
import { useRoomStore } from '@stores/roomStore';

import { RoomTimerState, TimerActionMessage, RoomWebSocketMessage } from '@/types/websocket';

export interface WebSocketTimerState {
  seconds: number;
  minutes: number;
  hours: number;
  isRunning: boolean;
  isConnected: boolean;
  startedBy?: string;
  lastSync: number;
}

export interface WebSocketTimerActions {
  start: () => void;
  stop: () => void;
  reset: () => void;
  getTotalMinutes: () => number;
  connect: () => void;
  disconnect: () => void;
}

export interface WebSocketTimerReturn extends WebSocketTimerState, WebSocketTimerActions {}

// 기존 useStudyTimer와 호환성을 위한 타입 정의
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

const WEBSOCKET_URL = process.env.NEXT_PUBLIC_WS_URL || 'ws://localhost:4000';
const FALLBACK_SYNC_INTERVAL = 30000; // 30초마다 동기화 요청

export const useWebSocketTimer = (): WebSocketTimerReturn => {
  // 표시용 상태 (서버 상태 반영)
  const [seconds, setSeconds] = useState(0);
  const [minutes, setMinutes] = useState(0);
  const [hours, setHours] = useState(0);
  const [isRunning, setIsRunning] = useState(false);
  const [isConnected, setIsConnected] = useState(false);
  const [startedBy, setStartedBy] = useState<string | undefined>();
  const [lastSync, setLastSync] = useState(0);

  // 백업용 클라이언트 타이머
  const [, setBackupSeconds] = useState(0);
  const [backupIsRunning, setBackupIsRunning] = useState(false);

  const wsRef = useRef<WebSocket | null>(null);
  const backupIntervalRef = useRef<NodeJS.Timeout | null>(null);
  const syncIntervalRef = useRef<NodeJS.Timeout | null>(null);
  const reconnectTimeoutRef = useRef<NodeJS.Timeout | null>(null);
  const lastServerTimeRef = useRef<number>(0);

  const { currentRoomId } = useRoomStore();
  const { user } = useAuthStore();

  // 시간을 시/분/초로 분해하는 유틸리티
  const parseTime = useCallback((totalSeconds: number) => {
    const h = Math.floor(totalSeconds / 3600);
    const m = Math.floor((totalSeconds % 3600) / 60);
    const s = totalSeconds % 60;
    return { hours: h, minutes: m, seconds: s };
  }, []);

  // 서버 타이머 상태를 UI에 반영
  const updateFromServerState = useCallback(
    (timerState: RoomTimerState) => {
      const { hours: h, minutes: m, seconds: s } = parseTime(timerState.totalSeconds);

      setHours(h);
      setMinutes(m);
      setSeconds(s);
      setIsRunning(timerState.isRunning);
      setStartedBy(timerState.startedBy);
      setLastSync(Date.now());

      // 백업 타이머도 동기화
      setBackupSeconds(timerState.totalSeconds);
      setBackupIsRunning(timerState.isRunning);
      lastServerTimeRef.current = timerState.totalSeconds;

      console.log(`⏰ 서버 타이머 동기화: ${h}:${m}:${s}, 실행중: ${timerState.isRunning}`);
    },
    [parseTime],
  );

  // 백업 타이머 (웹소켓 연결 끊김 시 작동)
  useEffect(() => {
    if (!isConnected && backupIsRunning) {
      backupIntervalRef.current = setInterval(() => {
        setBackupSeconds((prev) => {
          const newSeconds = prev + 1;
          const { hours: h, minutes: m, seconds: s } = parseTime(newSeconds);
          setHours(h);
          setMinutes(m);
          setSeconds(s);
          return newSeconds;
        });
      }, 1000);
    } else {
      if (backupIntervalRef.current) {
        clearInterval(backupIntervalRef.current);
        backupIntervalRef.current = null;
      }
    }

    return () => {
      if (backupIntervalRef.current) {
        clearInterval(backupIntervalRef.current);
      }
    };
  }, [isConnected, backupIsRunning, parseTime]);

  // 웹소켓 메시지 처리
  const handleWebSocketMessage = useCallback(
    (event: MessageEvent) => {
      try {
        const message: RoomWebSocketMessage = JSON.parse(event.data);

        switch (message.type) {
          case 'TIMER_STATE':
          case 'TIMER_SYNC':
            if (message.data.roomId === currentRoomId) {
              updateFromServerState(message.data);
            }
            break;

          case 'TIMER_NOTIFICATION':
            if (message.data.roomId === currentRoomId) {
              console.log(
                `📢 ${message.data.userName}님이 타이머를 ${message.data.action}했습니다`,
              );
            }
            break;
        }
      } catch (error) {
        console.error('웹소켓 메시지 파싱 에러:', error);
      }
    },
    [currentRoomId, updateFromServerState],
  );

  // 웹소켓 연결
  const connect = useCallback(() => {
    if (!currentRoomId || !user) return;

    // 기존 연결이 있다면 먼저 정리
    if (wsRef.current) {
      if (
        wsRef.current.readyState === WebSocket.OPEN ||
        wsRef.current.readyState === WebSocket.CONNECTING
      ) {
        wsRef.current.close();
      }
      wsRef.current = null;
    }

    // 재연결 타이머 정리
    if (reconnectTimeoutRef.current) {
      clearTimeout(reconnectTimeoutRef.current);
      reconnectTimeoutRef.current = null;
    }

    try {
      console.log(`🔗 웹소켓 연결 시도: ${currentRoomId}`);
      const wsUrl = `${WEBSOCKET_URL}/ws/room/${currentRoomId}?userId=${user.id}`;
      wsRef.current = new WebSocket(wsUrl);

      wsRef.current.onopen = () => {
        setIsConnected(true);
        console.log('✅ 웹소켓 연결됨');

        // 연결 후 즉시 현재 타이머 상태 요청
        wsRef.current?.send(
          JSON.stringify({
            type: 'GET_TIMER_STATE',
            data: { roomId: currentRoomId },
          }),
        );
      };

      wsRef.current.onmessage = handleWebSocketMessage;

      wsRef.current.onclose = (event) => {
        setIsConnected(false);
        console.log('❌ 웹소켓 연결 끊김 - 백업 모드 활성화', event.code, event.reason);

        // 현재 방에 있고, 비정상적인 연결 끊김인 경우에만 재연결
        if (currentRoomId && event.code !== 1000 && event.code !== 1005) {
          reconnectTimeoutRef.current = setTimeout(() => {
            if (currentRoomId) {
              // 재연결 시도 시에도 방 확인
              console.log('🔄 웹소켓 재연결 시도');
              connect();
            }
          }, 3000);
        }
      };

      wsRef.current.onerror = (error) => {
        console.error('웹소켓 에러:', error);
        setIsConnected(false);
      };
    } catch (error) {
      console.error('웹소켓 연결 실패:', error);
    }
  }, [currentRoomId, user, handleWebSocketMessage]);

  // 웹소켓 연결 해제
  const disconnect = useCallback(() => {
    console.log('🔌 웹소켓 연결 해제');

    // 재연결 타이머 정리
    if (reconnectTimeoutRef.current) {
      clearTimeout(reconnectTimeoutRef.current);
      reconnectTimeoutRef.current = null;
    }

    // 웹소켓 연결 해제
    if (wsRef.current) {
      if (wsRef.current.readyState === WebSocket.OPEN) {
        wsRef.current.close(1000, 'User left room'); // 정상 종료 코드
      }
      wsRef.current = null;
    }

    setIsConnected(false);
  }, []);

  // 타이머 액션 전송
  const sendTimerAction = useCallback(
    (action: 'START' | 'STOP' | 'RESET') => {
      if (!currentRoomId || !user || !wsRef.current) {
        console.log('❌ 타이머 액션 전송 실패: 연결 정보 없음');
        return;
      }

      if (wsRef.current.readyState !== WebSocket.OPEN) {
        console.log('❌ 타이머 액션 전송 실패: 웹소켓 연결이 열려있지 않음');
        // 연결이 끊어진 상태라면 재연결 시도
        connect();
        return;
      }

      try {
        const message: TimerActionMessage = {
          type: 'TIMER_ACTION',
          data: {
            action,
            roomId: currentRoomId,
            userId: user.id,
            userName: user.nickname,
          },
          timestamp: Date.now(),
        };

        wsRef.current.send(JSON.stringify(message));
        console.log(`📤 타이머 액션 전송: ${action}`);
      } catch (error) {
        console.error('타이머 액션 전송 에러:', error);
      }
    },
    [currentRoomId, user, connect],
  );

  // 타이머 제어 함수들
  const start = useCallback(() => {
    if (isConnected) {
      sendTimerAction('START');
    } else {
      // 백업 모드에서는 클라이언트에서만 시작
      setBackupIsRunning(true);
      setIsRunning(true);
    }
  }, [isConnected, sendTimerAction]);

  const stop = useCallback(() => {
    if (isConnected) {
      sendTimerAction('STOP');
    } else {
      // 백업 모드에서는 클라이언트에서만 정지
      setBackupIsRunning(false);
      setIsRunning(false);
    }
  }, [isConnected, sendTimerAction]);

  const reset = useCallback(() => {
    if (isConnected) {
      sendTimerAction('RESET');
    } else {
      // 백업 모드에서는 클라이언트에서만 리셋
      setBackupSeconds(0);
      setBackupIsRunning(false);
      setSeconds(0);
      setMinutes(0);
      setHours(0);
      setIsRunning(false);
    }
  }, [isConnected, sendTimerAction]);

  const getTotalMinutes = useCallback(() => {
    const totalSeconds = hours * 3600 + minutes * 60 + seconds;
    return totalSeconds / 60;
  }, [hours, minutes, seconds]);

  // 방 변경 시 웹소켓 재연결
  useEffect(() => {
    if (currentRoomId) {
      connect();
    } else {
      disconnect();
    }

    return () => {
      disconnect();
    };
  }, [currentRoomId, connect, disconnect]);

  // 주기적 동기화 (연결 끊김 시 복구용)
  useEffect(() => {
    if (isConnected) {
      syncIntervalRef.current = setInterval(() => {
        if (wsRef.current?.readyState === WebSocket.OPEN) {
          wsRef.current.send(
            JSON.stringify({
              type: 'GET_TIMER_STATE',
              data: { roomId: currentRoomId },
            }),
          );
        }
      }, FALLBACK_SYNC_INTERVAL);
    } else {
      if (syncIntervalRef.current) {
        clearInterval(syncIntervalRef.current);
      }
    }

    return () => {
      if (syncIntervalRef.current) {
        clearInterval(syncIntervalRef.current);
      }
    };
  }, [isConnected, currentRoomId]);

  return {
    seconds,
    minutes,
    hours,
    isRunning,
    isConnected,
    startedBy,
    lastSync,
    start,
    stop,
    reset,
    getTotalMinutes,
    connect,
    disconnect,
  };
};
