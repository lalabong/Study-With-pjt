// 웹소켓 메시지 타입 정의
export interface WebSocketMessage {
  type: string;
  data: object;
  timestamp: number;
}

// 타이머 관련 웹소켓 메시지 타입들
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

export interface TimerSyncMessage extends WebSocketMessage {
  type: 'TIMER_SYNC';
  data: RoomTimerState;
}

// 채팅 메시지 (기존 채팅 기능과 호환)
export interface ChatMessage extends WebSocketMessage {
  type: 'CHAT_MESSAGE';
  data: {
    message: string;
    userId: string;
    userName: string;
    roomId: string;
  };
}

// 타이머 알림 메시지
export interface TimerNotificationMessage extends WebSocketMessage {
  type: 'TIMER_NOTIFICATION';
  data: {
    message: string;
    action: 'START' | 'STOP' | 'RESET';
    userName: string;
    roomId: string;
  };
}

// 전체 웹소켓 메시지 유니온 타입
export type RoomWebSocketMessage =
  | TimerActionMessage
  | TimerStateMessage
  | TimerSyncMessage
  | ChatMessage
  | TimerNotificationMessage;
