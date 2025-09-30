import WebSocket from 'ws';
import { prisma } from '../db.js';

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

// 방 초대 관련 메시지 타입들
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

// 참가자 변경 관련 메시지 타입들
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

// 일정 변경 관련 메시지 타입들
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
    scheduleTitle: string | null; // 진행중인 일정이 없으면 null
    action: 'started' | 'stopped' | 'reordered'; // 진행중으로 변경, 진행중에서 다른 상태로 변경, 순서 변경으로 인한 최상단 변경
    message: string;
  };
}

// 룸별 타이머 상태 저장소
const roomTimerStates = new Map<string, RoomTimerState>();

// 룸별 클라이언트 연결 관리
const roomConnections = new Map<string, Map<string, any>>();

// 사용자별 웹소켓 연결 관리 (방 초대 알림용)
const userConnections = new Map<string, any>();

// 타이머 인터벌 관리
const roomIntervals = new Map<string, NodeJS.Timeout>();

export class WebSocketTimerService {
  // 룸에 클라이언트 연결 추가
  static async addClientToRoom(roomId: string, userId: string, ws: any): Promise<void> {
    if (!roomConnections.has(roomId)) {
      roomConnections.set(roomId, new Map());
    }

    const roomClients = roomConnections.get(roomId)!;
    const isNewParticipant = !roomClients.has(userId);
    roomClients.set(userId, ws);

    // 사용자별 연결도 관리 (방 초대 알림용)
    userConnections.set(userId, ws);

    console.log(`👤 클라이언트 ${userId} 룸 ${roomId}에 연결됨 (총 ${roomClients.size}명)`);

    // 새로운 참가자인 경우 다른 참가자들에게 알림
    if (isNewParticipant && roomClients.size > 1) {
      await this.broadcastParticipantJoined(roomId, userId);
    }

    // 현재 타이머 상태 전송
    const currentState = this.getRoomTimerState(roomId);
    this.sendToClient(ws, {
      type: 'TIMER_STATE',
      data: currentState,
      timestamp: Date.now(),
    });
  }

  // 룸에서 클라이언트 연결 제거
  static async removeClientFromRoom(roomId: string, userId: string): Promise<void> {
    const roomClients = roomConnections.get(roomId);
    if (roomClients && roomClients.has(userId)) {
      roomClients.delete(userId);
      console.log(`👋 클라이언트 ${userId} 룸 ${roomId}에서 연결 해제됨`);

      // 데이터베이스에서도 방 참여 정보 제거
      try {
        await this.removeUserFromRoomInDB(roomId, userId);
      } catch (error) {
        console.error(`❌ DB에서 사용자 ${userId} 룸 ${roomId} 퇴장 처리 실패:`, error);
      }

      // 다른 참가자들에게 퇴장 알림 (룸에 다른 사람이 있는 경우)
      if (roomClients.size > 0) {
        await this.broadcastParticipantLeft(roomId, userId);
      }

      // 룸에 클라이언트가 없으면 타이머 정리
      if (roomClients.size === 0) {
        this.cleanupRoom(roomId);
      }
    }

    // 사용자별 연결도 제거
    userConnections.delete(userId);
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

    // 500ms마다 타이머 상태 브로드캐스트 (더 빠른 동기화)
    const interval = setInterval(() => {
      const currentState = roomTimerStates.get(roomId);
      if (!currentState || !currentState.isRunning) {
        console.log(`⏹️ 룸 ${roomId} 타이머 인터벌 중지: 타이머가 실행중이지 않음`);
        clearInterval(interval);
        roomIntervals.delete(roomId);
        return;
      }

      // getRoomTimerState를 사용하여 실시간 계산된 상태를 브로드캐스트
      const liveState = this.getRoomTimerState(roomId);
      
      this.broadcastToRoom(roomId, {
        type: 'TIMER_STATE',
        data: liveState,
        timestamp: Date.now(),
      });
    }, 500); // 500ms로 더 빠른 동기화

    roomIntervals.set(roomId, interval);

    console.log(`▶️ 룸 ${roomId} 타이머 시작됨 (${userName})`);

    // 즉시 상태 브로드캐스트 (최우선)
    const currentState = this.getRoomTimerState(roomId);
    this.broadcastToRoom(roomId, {
      type: 'TIMER_STATE',
      data: currentState,
      timestamp: Date.now(),
    });

    // 시작 알림 브로드캐스트 (상태 브로드캐스트 후)
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

    // 즉시 상태 브로드캐스트 (최우선)
    this.broadcastToRoom(roomId, {
      type: 'TIMER_STATE',
      data: state,
      timestamp: Date.now(),
    });

    // 정지 알림 브로드캐스트 (상태 브로드캐스트 후)
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

  // 특정 사용자에게 방 초대 알림 전송
  static sendRoomInviteNotification(
    inviteeCuid: string,
    inviteData: {
      inviteId: string;
      roomId: string;
      roomName: string;
      inviterName: string;
      inviterUserId: string;
    }
  ): void {
    const userWs = userConnections.get(inviteeCuid);
    
    if (userWs && userWs.readyState === WebSocket.OPEN) {
      const message: RoomInviteMessage = {
        type: 'ROOM_INVITE',
        data: {
          ...inviteData,
          message: `${inviteData.inviterName}님이 "${inviteData.roomName}" 방에 초대했습니다.`,
        },
        timestamp: Date.now(),
      };

      this.sendToClient(userWs, message);
      console.log(`📨 방 초대 알림 전송: ${inviteeCuid} <- ${inviteData.inviterName}`);
    } else {
      console.log(`⚠️ 사용자 ${inviteeCuid}가 오프라인이거나 연결되지 않음`);
    }
  }

  // 참가자 입장 알림 브로드캐스트
  static async broadcastParticipantJoined(roomId: string, userId: string): Promise<void> {
    try {
      // 데이터베이스에서 사용자 정보 조회
      const user = await prisma.user.findUnique({
        where: { id: userId },
        select: { nickname: true, profileImg: true }
      });

      const nickname = user?.nickname || `User-${userId}`;
      const profileImg = user?.profileImg || undefined;

      const message: RoomParticipantMessage = {
        type: 'PARTICIPANT_JOINED',
        data: {
          roomId,
          userId,
          nickname,
          profileImg,
          message: `${nickname}님이 입장했습니다.`,
        },
        timestamp: Date.now(),
      };

      this.broadcastToRoom(roomId, message);
      console.log(`👋 참가자 입장 알림: ${nickname} (${userId}) -> 룸 ${roomId}`);
    } catch (error) {
      console.error(`❌ 참가자 입장 알림 전송 실패: ${userId}`, error);
    }
  }

  // 참가자 퇴장 알림 브로드캐스트
  static async broadcastParticipantLeft(roomId: string, userId: string): Promise<void> {
    try {
      // 데이터베이스에서 사용자 정보 조회
      const user = await prisma.user.findUnique({
        where: { id: userId },
        select: { nickname: true, profileImg: true }
      });

      const nickname = user?.nickname || `User-${userId}`;
      const profileImg = user?.profileImg || undefined;

      const message: RoomParticipantMessage = {
        type: 'PARTICIPANT_LEFT',
        data: {
          roomId,
          userId,
          nickname,
          profileImg,
          message: `${nickname}님이 퇴장했습니다.`,
        },
        timestamp: Date.now(),
      };

      this.broadcastToRoom(roomId, message);
      console.log(`👋 참가자 퇴장 알림: ${nickname} (${userId}) -> 룸 ${roomId}`);
    } catch (error) {
      console.error(`❌ 참가자 퇴장 알림 전송 실패: ${userId}`, error);
    }
  }

  // 일정 변경 알림 브로드캐스트
  static async broadcastScheduleUpdate(
    roomId: string, 
    userId: string, 
    scheduleId: string, 
    scheduleTitle: string, 
    action: 'created' | 'updated' | 'deleted' | 'status_changed'
  ): Promise<void> {
    try {
      console.log(`🔍 일정 변경 알림 준비: 룸=${roomId}, 사용자=${userId}, 액션=${action}`);
      
      // 해당 룸에 연결된 클라이언트 확인
      const roomClients = roomConnections.get(roomId);
      if (!roomClients || roomClients.size === 0) {
        console.log(`⚠️ 룸 ${roomId}에 연결된 클라이언트가 없음 - 일정 알림 스킵`);
        return;
      }
      
      console.log(`👥 룸 ${roomId}에 연결된 클라이언트 수: ${roomClients.size}`);

      // 데이터베이스에서 사용자 정보 조회
      const user = await prisma.user.findUnique({
        where: { id: userId },
        select: { nickname: true }
      });

      const nickname = user?.nickname || `User-${userId}`;
      
      let messageType: 'SCHEDULE_CREATED' | 'SCHEDULE_UPDATED' | 'SCHEDULE_DELETED';
      let messageText: string;

      switch (action) {
        case 'created':
          messageType = 'SCHEDULE_CREATED';
          messageText = `${nickname}님이 새 일정 "${scheduleTitle}"을(를) 추가했습니다.`;
          break;
        case 'updated':
          messageType = 'SCHEDULE_UPDATED';
          messageText = `${nickname}님이 일정 "${scheduleTitle}"을(를) 수정했습니다.`;
          break;
        case 'deleted':
          messageType = 'SCHEDULE_DELETED';
          messageText = `${nickname}님이 일정 "${scheduleTitle}"을(를) 삭제했습니다.`;
          break;
        case 'status_changed':
          messageType = 'SCHEDULE_UPDATED';
          messageText = `${nickname}님이 일정 "${scheduleTitle}"의 상태를 변경했습니다.`;
          break;
        default:
          messageType = 'SCHEDULE_UPDATED';
          messageText = `${nickname}님이 일정을 변경했습니다.`;
      }

      const message: ScheduleUpdateMessage = {
        type: messageType,
        data: {
          roomId,
          userId,
          nickname,
          scheduleId,
          scheduleTitle,
          action,
          message: messageText,
        },
        timestamp: Date.now(),
      };

      this.broadcastToRoom(roomId, message);
      console.log(`📅 일정 변경 알림 전송 완료: ${messageText} -> 룸 ${roomId} (${roomClients.size}명)`);
    } catch (error) {
      console.error(`❌ 일정 변경 알림 전송 실패: ${userId}`, error);
    }
  }

  // 진행중 일정 상태 변경 알림 브로드캐스트
  static async broadcastRunningScheduleUpdate(
    roomId: string, 
    scheduleOwnerUserId: string, // userId 형태
    scheduleTitle: string | null,
    action: 'started' | 'stopped' | 'reordered',
    newStatus?: string // 새로운 상태 (stopped일 때만 사용)
  ): Promise<void> {
    try {
      console.log(`🏃 진행중 일정 변경 알림 준비: 룸=${roomId}, 사용자=${scheduleOwnerUserId}, 액션=${action}`);
      
      // 해당 룸에 연결된 클라이언트 확인
      const roomClients = roomConnections.get(roomId);
      if (!roomClients || roomClients.size === 0) {
        console.log(`⚠️ 룸 ${roomId}에 연결된 클라이언트가 없음 - 진행중 일정 알림 스킵`);
        return;
      }
      
      console.log(`👥 룸 ${roomId}에 연결된 클라이언트 수: ${roomClients.size}`);

      // 데이터베이스에서 사용자 정보 조회 (userId로 조회)
      const user = await prisma.user.findUnique({
        where: { userId: scheduleOwnerUserId },
        select: { nickname: true }
      });

      const nickname = user?.nickname || `User-${scheduleOwnerUserId}`;
      
      let messageText: string;
      if (action === 'started') {
        messageText = scheduleTitle 
          ? `${nickname}님이 일정 "${scheduleTitle}"을(를) 시작했습니다.`
          : `${nickname}님이 일정을 시작했습니다.`;
      } else if (action === 'stopped') {
        // newStatus에 따라 다른 메시지 표시
        if (newStatus === '완료') {
          messageText = scheduleTitle 
            ? `${nickname}님이 일정 "${scheduleTitle}"을(를) 완료했습니다.`
            : `${nickname}님이 진행중이던 일정을 완료했습니다.`;
        } else if (newStatus === '취소') {
          messageText = scheduleTitle 
            ? `${nickname}님이 일정 "${scheduleTitle}"을(를) 취소했습니다.`
            : `${nickname}님이 진행중이던 일정을 취소했습니다.`;
        } else if (newStatus === '대기중') {
          messageText = scheduleTitle 
            ? `${nickname}님이 일정 "${scheduleTitle}"을(를) 대기중으로 변경했습니다.`
            : `${nickname}님이 진행중이던 일정을 대기중으로 변경했습니다.`;
        } else {
          messageText = scheduleTitle 
            ? `${nickname}님이 일정 "${scheduleTitle}"의 진행을 중단했습니다.`
            : `${nickname}님이 진행중이던 일정을 중단했습니다.`;
        }
      } else { // action === 'reordered'
        messageText = scheduleTitle 
          ? `${nickname}님의 최상단 진행중 일정이 "${scheduleTitle}"로 변경되었습니다.`
          : `${nickname}님의 진행중 일정 순서가 변경되었습니다.`;
      }

      const message: RunningScheduleUpdateMessage = {
        type: 'RUNNING_SCHEDULE_UPDATED',
        data: {
          roomId,
          userId: scheduleOwnerUserId, // userId 형태로 전송
          nickname,
          scheduleTitle,
          action,
          message: messageText,
        },
        timestamp: Date.now(),
      };

      this.broadcastToRoom(roomId, message);
      console.log(`🏃 진행중 일정 변경 알림 전송 완료: ${messageText} -> 룸 ${roomId} (${roomClients.size}명)`);
    } catch (error) {
      console.error(`❌ 진행중 일정 변경 알림 전송 실패: ${scheduleOwnerUserId}`, error);
    }
  }

  // 룸의 모든 참가자에게 진행중 일정 변경 알림 (룸 ID로 참가자 조회)
  static async broadcastRunningScheduleUpdateToRoom(
    scheduleOwnerUserId: string, // userId 형태로 받음
    scheduleTitle: string | null,
    action: 'started' | 'stopped' | 'reordered',
    newStatus?: string // 새로운 상태 (stopped일 때만 사용)
  ): Promise<void> {
    try {
      console.log(`🏃 진행중 일정 변경 브로드캐스트 시작: ${scheduleOwnerUserId}, 액션: ${action}, 제목: ${scheduleTitle}`);
      
      // userId로 사용자 찾기
      const user = await prisma.user.findUnique({
        where: { userId: scheduleOwnerUserId },
        select: { id: true }
      });

      if (!user) {
        console.error(`❌ 사용자를 찾을 수 없음: ${scheduleOwnerUserId}`);
        return;
      }

      const scheduleOwnerId = user.id; // userCuid

      // 일정 소유자가 참여중인 모든 룸 조회
      const userRooms = await prisma.roomParticipation.findMany({
        where: { 
          userCuid: scheduleOwnerId
        },
        select: { 
          roomCuid: true,
          room: {
            select: { 
              id: true,
              name: true 
            }
          }
        }
      });

      console.log(`🏃 사용자 ${scheduleOwnerId}가 참여중인 룸들:`, userRooms.map(r => ({ roomId: r.roomCuid, name: r.room.name })));

      // 각 룸에 알림 전송
      for (const userRoom of userRooms) {
        console.log(`🏃 룸 ${userRoom.roomCuid} (${userRoom.room.name})에 진행중 일정 변경 알림 전송`);
        await this.broadcastRunningScheduleUpdate(
          userRoom.roomCuid, 
          scheduleOwnerUserId, // userId 형태로 전송
          scheduleTitle,
          action,
          newStatus
        );
      }
    } catch (error) {
      console.error(`❌ 룸별 진행중 일정 변경 알림 실패: ${scheduleOwnerUserId}`, error);
    }
  }

  // 룸의 모든 참가자에게 일정 변경 알림 (룸 ID로 참가자 조회)
  static async broadcastScheduleUpdateToRoom(
    scheduleOwnerId: string,
    scheduleId: string,
    scheduleTitle: string,
    action: 'created' | 'updated' | 'deleted' | 'status_changed'
  ): Promise<void> {
    try {
      console.log(`📅 일정 변경 브로드캐스트 시작: ${scheduleOwnerId}, 액션: ${action}, 제목: ${scheduleTitle}`);
      
      // 일정 소유자가 참여중인 모든 룸 조회
      const userRooms = await prisma.roomParticipation.findMany({
        where: { 
          userCuid: scheduleOwnerId
        },
        select: { 
          roomCuid: true,
          room: {
            select: { 
              id: true,
              name: true 
            }
          }
        }
      });

      console.log(`📋 사용자 ${scheduleOwnerId}가 참여중인 룸들:`, userRooms.map(r => ({ roomId: r.roomCuid, name: r.room.name })));

      // 각 룸에 알림 전송
      for (const userRoom of userRooms) {
        console.log(`🔔 룸 ${userRoom.roomCuid} (${userRoom.room.name})에 일정 변경 알림 전송`);
        await this.broadcastScheduleUpdate(
          userRoom.roomCuid, 
          scheduleOwnerId, 
          scheduleId, 
          scheduleTitle, 
          action
        );
      }
    } catch (error) {
      console.error(`❌ 룸별 일정 변경 알림 실패: ${scheduleOwnerId}`, error);
    }
  }

  // 데이터베이스에서 사용자를 방에서 제거
  static async removeUserFromRoomInDB(roomId: string, userId: string): Promise<void> {
    try {
      console.log(`🗃️ DB에서 사용자 ${userId}를 룸 ${roomId}에서 제거 시도`);

      // 방 참여 정보 삭제
      const deletedParticipation = await prisma.roomParticipation.delete({
        where: {
          userCuid_roomCuid: {
            userCuid: userId,
            roomCuid: roomId,
          },
        },
      });

      console.log(`✅ DB에서 사용자 ${userId} 룸 ${roomId} 퇴장 처리 완료`);

      // 방에 남은 참여자가 있는지 확인
      const remainingParticipants = await prisma.roomParticipation.count({
        where: { roomCuid: roomId },
      });

      console.log(`📊 룸 ${roomId}에 남은 참여자 수: ${remainingParticipants}명`);

      // 방에 아무도 없으면 방 삭제
      if (remainingParticipants === 0) {
        await prisma.room.delete({
          where: { id: roomId },
        });
        console.log(`🗑️ 빈 방 ${roomId} 삭제 완료`);
      }
    } catch (error) {
      // 이미 삭제된 경우나 존재하지 않는 경우는 에러가 아님
      if (error.code === 'P2025') {
        console.log(`ℹ️ 사용자 ${userId}가 이미 룸 ${roomId}에서 제거되었거나 존재하지 않음`);
      } else {
        console.error(`❌ DB에서 사용자 ${userId} 룸 ${roomId} 제거 실패:`, error);
        throw error;
      }
    }
  }

  // 연결 끊김 감지 시 자동 퇴장 처리
  static async handleDisconnectedClient(userId: string): Promise<void> {
    try {
      console.log(`🔌 사용자 ${userId} 연결 끊김 감지 - 자동 퇴장 처리 시작`);

      // 해당 사용자가 참여 중인 모든 방 조회
      const userRooms = await prisma.roomParticipation.findMany({
        where: { userCuid: userId },
        select: { roomCuid: true },
      });

      console.log(`🏠 사용자 ${userId}가 참여 중인 방: ${userRooms.length}개`);

      // 각 방에서 자동 퇴장 처리
      for (const room of userRooms) {
        await this.removeClientFromRoom(room.roomCuid, userId);
      }

      console.log(`✅ 사용자 ${userId} 자동 퇴장 처리 완료`);
    } catch (error) {
      console.error(`❌ 사용자 ${userId} 자동 퇴장 처리 실패:`, error);
    }
  }

  // 브로드캐스트 시 연결 끊어진 클라이언트 자동 정리
  static broadcastToRoom(roomId: string, message: WebSocketMessage): void {
    const roomClients = roomConnections.get(roomId);
    if (!roomClients) {
      console.log(`❌ 룸 ${roomId}에 연결된 클라이언트가 없습니다`);
      return;
    }

    const messageStr = JSON.stringify(message);
    let sentCount = 0;
    let totalClients = roomClients.size;
    const disconnectedClients: string[] = [];

    roomClients.forEach((ws, userId) => {
      if (ws.readyState === WebSocket.OPEN) {
        try {
          ws.send(messageStr);
          sentCount++;
        } catch (error) {
          console.error(`❌ 클라이언트 ${userId}에게 메시지 전송 실패:`, error);
          disconnectedClients.push(userId);
        }
      } else {
        // 연결이 끊어진 클라이언트 추가
        disconnectedClients.push(userId);
      }
    });

    // 연결 끊어진 클라이언트들 자동 정리
    for (const userId of disconnectedClients) {
      console.log(`🧹 연결 끊어진 클라이언트 ${userId} 자동 정리 시작`);
      this.handleDisconnectedClient(userId).catch(error => {
        console.error(`❌ 클라이언트 ${userId} 자동 정리 실패:`, error);
      });
    }

    // 타이머 상태는 너무 자주 발생하므로 로그 최소화
    if (message.type !== 'TIMER_STATE' && sentCount > 0) {
      console.log(`📡 룸 ${roomId}에 ${message.type} 메시지 브로드캐스트 (${sentCount}명, ${disconnectedClients.length}명 정리)`);
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
      userConnections: Array.from(userConnections.keys()),
      activeIntervals: Array.from(roomIntervals.keys()),
    };
  }
}
