import WebSocket from 'ws';

// 웹소켓 메시지 타입 정의
export interface WebSocketMessage {
  type: string;
  data: any;
  timestamp: number;
}

// 타이머 관련 메시지 타입들
export interface RoomTimerState {
  isRunning: boolean;
  totalSeconds: number;
  startedBy?: string;
  startedAt?: number;
  lastUpdated: number;
  roomId: string;
}

export interface TimerActionMessage extends WebSocketMessage {
  type: 'TIMER_ACTION';
  data: {
    action: 'START' | 'STOP' | 'RESET';
    roomId: string;
    userId: string;
    userName?: string;
  };
}

export interface TimerStateMessage extends WebSocketMessage {
  type: 'TIMER_STATE';
  data: RoomTimerState;
}

// 룸별 타이머 상태 저장소
const roomTimerStates = new Map<string, RoomTimerState>();

// 룸별 클라이언트 연결 관리
const roomConnections = new Map<string, Map<string, any>>();

// 타이머 인터벌 관리
const roomIntervals = new Map<string, NodeJS.Timeout>();

export class WebSocketTimerService {
  // 룸에 클라이언트 연결 추가
  static addClientToRoom(roomId: string, userId: string, ws: any): void {
    if (!roomConnections.has(roomId)) {
      roomConnections.set(roomId, new Map());
    }

    const roomClients = roomConnections.get(roomId)!;
    roomClients.set(userId, ws);

    console.log(`👤 클라이언트 ${userId} 룸 ${roomId}에 연결됨 (총 ${roomClients.size}명)`);

    // 현재 타이머 상태 전송
    const currentState = this.getRoomTimerState(roomId);
    this.sendToClient(ws, {
      type: 'TIMER_STATE',
      data: currentState,
      timestamp: Date.now(),
    });
  }

  // 룸에서 클라이언트 연결 제거
  static removeClientFromRoom(roomId: string, userId: string): void {
    const roomClients = roomConnections.get(roomId);
    if (roomClients) {
      roomClients.delete(userId);
      console.log(`👋 클라이언트 ${userId} 룸 ${roomId}에서 연결 해제됨`);

      // 룸에 클라이언트가 없으면 타이머 정리
      if (roomClients.size === 0) {
        this.cleanupRoom(roomId);
      }
    }
  }

  // 룸 타이머 상태 가져오기
  static getRoomTimerState(roomId: string): RoomTimerState {
    if (!roomTimerStates.has(roomId)) {
      // 새 룸의 기본 상태
      const initialState: RoomTimerState = {
        isRunning: false,
        totalSeconds: 0,
        lastUpdated: Date.now(),
        roomId,
      };
      roomTimerStates.set(roomId, initialState);
    }
    
    const state = roomTimerStates.get(roomId)!;
    
    // 타이머가 실행 중이면 현재까지의 경과 시간을 계산
    if (state.isRunning && state.startedAt) {
      const currentTime = Date.now();
      const elapsedSeconds = Math.floor((currentTime - state.startedAt) / 1000);
      
      // 현재 상태를 복사하여 실시간 totalSeconds 반영
      return {
        ...state,
        totalSeconds: state.totalSeconds + elapsedSeconds,
        lastUpdated: currentTime,
      };
    }
    
    return state;
  }

  // 타이머 시작
  static startTimer(roomId: string, userId: string, userName: string): void {
    // 실제 저장된 상태를 직접 가져오기 (계산된 값이 아닌)
    const storedState = roomTimerStates.get(roomId);
    if (!storedState) {
      // 새 룸이면 초기화
      const initialState: RoomTimerState = {
        isRunning: false,
        totalSeconds: 0,
        lastUpdated: Date.now(),
        roomId,
      };
      roomTimerStates.set(roomId, initialState);
    }
    
    const state = roomTimerStates.get(roomId)!;

    if (state.isRunning) {
      console.log(`⚠️ 룸 ${roomId} 타이머가 이미 실행 중입니다`);
      return;
    }

    state.isRunning = true;
    state.startedBy = userName;
    state.startedAt = Date.now();
    state.lastUpdated = Date.now();

    // 1초마다 타이머 상태 브로드캐스트 (실시간 계산된 값)
    const interval = setInterval(() => {
      if (!state.isRunning) {
        clearInterval(interval);
        roomIntervals.delete(roomId);
        return;
      }

      // getRoomTimerState를 사용하여 실시간 계산된 상태를 브로드캐스트
      const currentState = this.getRoomTimerState(roomId);
      this.broadcastToRoom(roomId, {
        type: 'TIMER_STATE',
        data: currentState,
        timestamp: Date.now(),
      });
    }, 1000);

    roomIntervals.set(roomId, interval);

    console.log(`▶️ 룸 ${roomId} 타이머 시작됨 (${userName})`);

    // 시작 알림 브로드캐스트
    this.broadcastToRoom(roomId, {
      type: 'TIMER_NOTIFICATION',
      data: {
        message: `${userName}님이 타이머를 시작했습니다`,
        action: 'START',
        userName,
        roomId,
      },
      timestamp: Date.now(),
    });

    // 상태 브로드캐스트 (실시간 계산된 값)
    const currentState = this.getRoomTimerState(roomId);
    this.broadcastToRoom(roomId, {
      type: 'TIMER_STATE',
      data: currentState,
      timestamp: Date.now(),
    });
  }

  // 타이머 정지
  static stopTimer(roomId: string, userId: string, userName: string): void {
    // 실제 저장된 상태를 직접 가져오기
    const state = roomTimerStates.get(roomId);
    if (!state) {
      console.log(`⚠️ 룸 ${roomId} 상태를 찾을 수 없습니다`);
      return;
    }

    if (!state.isRunning) {
      console.log(`⚠️ 룸 ${roomId} 타이머가 이미 정지되어 있습니다`);
      return;
    }

    // 현재까지의 경과 시간을 totalSeconds에 누적
    if (state.startedAt) {
      const currentTime = Date.now();
      const elapsedSeconds = Math.floor((currentTime - state.startedAt) / 1000);
      state.totalSeconds += elapsedSeconds;
    }

    state.isRunning = false;
    state.startedAt = undefined;
    state.lastUpdated = Date.now();

    // 인터벌 정리
    const interval = roomIntervals.get(roomId);
    if (interval) {
      clearInterval(interval);
      roomIntervals.delete(roomId);
    }

    console.log(
      `⏸️ 룸 ${roomId} 타이머 정지됨 (${userName}) - 총 시간: ${this.formatTime(state.totalSeconds)}`
    );

    // 정지 알림 브로드캐스트
    this.broadcastToRoom(roomId, {
      type: 'TIMER_NOTIFICATION',
      data: {
        message: `${userName}님이 타이머를 정지했습니다`,
        action: 'STOP',
        userName,
        roomId,
      },
      timestamp: Date.now(),
    });

    // 상태 브로드캐스트 (최신 상태)
    this.broadcastToRoom(roomId, {
      type: 'TIMER_STATE',
      data: state,
      timestamp: Date.now(),
    });
  }

  // 타이머 리셋
  static resetTimer(roomId: string, userId: string, userName: string): void {
    // 실제 저장된 상태를 직접 가져오기
    const state = roomTimerStates.get(roomId);
    if (!state) {
      console.log(`⚠️ 룸 ${roomId} 상태를 찾을 수 없습니다`);
      return;
    }

    // 인터벌 정리
    const interval = roomIntervals.get(roomId);
    if (interval) {
      clearInterval(interval);
      roomIntervals.delete(roomId);
    }

    const previousTime = this.formatTime(state.totalSeconds);

    state.isRunning = false;
    state.totalSeconds = 0;
    state.startedBy = undefined;
    state.startedAt = undefined;
    state.lastUpdated = Date.now();

    console.log(`🔄 룸 ${roomId} 타이머 리셋됨 (${userName}) - 이전 시간: ${previousTime}`);

    // 리셋 알림 브로드캐스트
    this.broadcastToRoom(roomId, {
      type: 'TIMER_NOTIFICATION',
      data: {
        message: `${userName}님이 타이머를 리셋했습니다`,
        action: 'RESET',
        userName,
        roomId,
      },
      timestamp: Date.now(),
    });

    // 상태 브로드캐스트 (최신 상태)
    this.broadcastToRoom(roomId, {
      type: 'TIMER_STATE',
      data: state,
      timestamp: Date.now(),
    });
  }

  // 룸의 모든 클라이언트에게 메시지 브로드캐스트
  static broadcastToRoom(roomId: string, message: WebSocketMessage): void {
    const roomClients = roomConnections.get(roomId);
    if (!roomClients) return;

    const messageStr = JSON.stringify(message);
    let sentCount = 0;

    roomClients.forEach((ws, userId) => {
      if (ws.readyState === WebSocket.OPEN) {
        ws.send(messageStr);
        sentCount++;
      } else {
        // 연결이 끊어진 클라이언트 정리
        roomClients.delete(userId);
        console.log(`🧹 연결 끊어진 클라이언트 ${userId} 정리됨`);
      }
    });

    if (sentCount > 0) {
      console.log(`📡 룸 ${roomId}에 메시지 브로드캐스트 (${sentCount}명)`);
    }
  }

  // 특정 클라이언트에게 메시지 전송
  static sendToClient(ws: any, message: WebSocketMessage): void {
    if (ws.readyState === WebSocket.OPEN) {
      ws.send(JSON.stringify(message));
    }
  }

  // 룸 정리 (클라이언트가 모두 나갔을 때)
  static cleanupRoom(roomId: string): void {
    // 실행 중인 타이머만 정리 (상태는 보존)
    const interval = roomIntervals.get(roomId);
    if (interval) {
      clearInterval(interval);
      roomIntervals.delete(roomId);
    }

    // 타이머가 실행 중이었다면 현재까지의 시간을 저장
    const state = roomTimerStates.get(roomId);
    if (state && state.isRunning && state.startedAt) {
      const currentTime = Date.now();
      const elapsedSeconds = Math.floor((currentTime - state.startedAt) / 1000);
      state.totalSeconds += elapsedSeconds;
      state.isRunning = false;
      state.startedAt = undefined;
      state.lastUpdated = currentTime;
      console.log(`⏸️ 룸 ${roomId} 자동 정지됨 - 누적 시간: ${this.formatTime(state.totalSeconds)}`);
    }

    // 연결만 정리, 타이머 상태는 보존
    roomConnections.delete(roomId);

    console.log(`🧹 룸 ${roomId} 연결 정리 완료 (타이머 상태 보존됨)`);
  }

  // 시간 포매팅 유틸리티
  static formatTime(totalSeconds: number): string {
    const hours = Math.floor(totalSeconds / 3600);
    const minutes = Math.floor((totalSeconds % 3600) / 60);
    const seconds = totalSeconds % 60;

    if (hours > 0) {
      return `${hours}:${minutes.toString().padStart(2, '0')}:${seconds.toString().padStart(2, '0')}`;
    } else {
      return `${minutes}:${seconds.toString().padStart(2, '0')}`;
    }
  }

  // 디버깅용 상태 조회
  static getDebugInfo(): any {
    return {
      rooms: Array.from(roomTimerStates.keys()),
      connections: Array.from(roomConnections.entries()).map(([roomId, clients]) => ({
        roomId,
        clientCount: clients.size,
      })),
      activeIntervals: Array.from(roomIntervals.keys()),
    };
  }
}
