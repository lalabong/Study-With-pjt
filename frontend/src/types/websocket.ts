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

// 방 초대 알림 메시지
export interface RoomInviteMessage extends WebSocketMessage {
  type: 'ROOM_INVITE';
  data: {
    inviteId: string;
    roomId: string;
    roomName: string;
    inviterName: string;
    inviterUserId: string;
    message: string;
  };
}

// 참가자 변경 알림 메시지
export interface RoomParticipantMessage extends WebSocketMessage {
  type: 'PARTICIPANT_JOINED' | 'PARTICIPANT_LEFT';
  data: {
    roomId: string;
    userId: string;
    nickname: string;
    profileImg?: string;
    message: string;
  };
}

// 일정 변경 알림 메시지
export interface ScheduleUpdateMessage extends WebSocketMessage {
  type: 'SCHEDULE_UPDATED' | 'SCHEDULE_CREATED' | 'SCHEDULE_DELETED';
  data: {
    roomId: string;
    userId: string;
    nickname: string;
    scheduleId: string;
    scheduleTitle: string;
    action: 'created' | 'updated' | 'deleted' | 'status_changed';
    message: string;
  };
}

// 진행중 일정 상태 변경 알림 메시지
export interface RunningScheduleUpdateMessage extends WebSocketMessage {
  type: 'RUNNING_SCHEDULE_UPDATED';
  data: {
    roomId: string;
    userId: string;
    nickname: string;
    scheduleTitle: string | null;
    action: 'started' | 'stopped';
    message: string;
  };
}

// 전체 웹소켓 메시지 유니온 타입
export type RoomWebSocketMessage =
  | TimerActionMessage
  | TimerStateMessage
  | TimerSyncMessage
  | ChatMessage
  | TimerNotificationMessage
  | RoomInviteMessage
  | RoomParticipantMessage
  | ScheduleUpdateMessage
  | RunningScheduleUpdateMessage;
