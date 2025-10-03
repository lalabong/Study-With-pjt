import 'dotenv/config';
import cors from 'cors';
import express, { Request, Response } from 'express';
import { Server } from 'http';
import WebSocket, { WebSocketServer } from 'ws';
import { URL } from 'url';
import cookieParser from 'cookie-parser';

import { prisma, testConnection } from './src/db.js';
import errorHandler from './src/middlewares/errorHandler.js';
import routes from './src/routes/index.js';
import { setupSwagger } from './src/utils/swagger.js';
import path from 'path';

import { handleFileUploadErrors } from './src/middlewares/fileMiddleware.js';
import {
  WebSocketTimerService,
  TimerActionMessage,
  ChatMessageSent,
} from './src/services/webSocketTimer.js';

const app = express();
const PORT = process.env.PORT || 4000;

app.use(
  cors({
    origin: process.env.CLIENT_URL,
    credentials: true,
    methods: ['GET', 'POST', 'PUT', 'DELETE', 'PATCH', 'OPTIONS'],
    allowedHeaders: ['Content-Type', 'Authorization'],
  })
);
app.use(express.json());
app.use(express.urlencoded({ extended: true }));
app.use(cookieParser());

app.use('/uploads', express.static(path.join(process.cwd(), 'uploads')));

setupSwagger(app);

testConnection();

app.use('/api', routes);

app.get('/', (_req: Request, res: Response) => {
  res.json({ message: 'SWith API Server' });
});

// 헬스 체크 엔드포인트 (Docker 배포용)
app.get('/health', (_req: Request, res: Response) => {
  res.status(200).json({
    status: 'OK',
    timestamp: new Date().toISOString(),
    uptime: process.uptime(),
  });
});

app.use(handleFileUploadErrors);
app.use(errorHandler);

app.use((_req: Request, res: Response) => {
  res.status(404).json({
    status: 'error',
    message: '요청한 페이지를 찾을 수 없습니다.',
  });
});

const server: Server = app.listen(PORT, () => {
  console.log(`🚀 HTTP Server is running on port ${PORT}`);
});

// WebSocket 서버 설정
const wss = new WebSocketServer({
  server,
});

wss.on('connection', (ws: WebSocket, request: Request) => {
  const url = new URL(request.url!, `http://${request.headers.host}`);
  const pathParts = url.pathname.split('/');

  // URL 파싱: /ws/room/roomId?userId=userId
  if (pathParts[1] !== 'ws' || pathParts[2] !== 'room' || !pathParts[3]) {
    console.log('❌ 잘못된 웹소켓 경로:', url.pathname);
    ws.close(1008, 'Invalid path');
    return;
  }

  const roomId = pathParts[3];
  const userId = url.searchParams.get('userId');

  if (!userId) {
    console.log('❌ userId가 없습니다');
    ws.close(1008, 'Missing userId');
    return;
  }

  console.log(`🔌 웹소켓 연결: 룸 ${roomId}, 사용자 ${userId}`);

  // 사용자 정보를 포함하여 룸에 클라이언트 추가
  WebSocketTimerService.addClientToRoom(roomId, userId, ws).catch((error) => {
    console.error('클라이언트 추가 중 오류:', error);
  });

  // 메시지 처리
  ws.on('message', (message) => {
    try {
      const data = JSON.parse(message.toString());

      switch (data.type) {
        case 'TIMER_ACTION':
          const timerAction = data as TimerActionMessage;
          const { action, userName } = timerAction.data;

          switch (action) {
            case 'START':
              WebSocketTimerService.startTimer(roomId, userId, userName || 'Unknown');
              break;
            case 'STOP':
              WebSocketTimerService.stopTimer(roomId, userId, userName || 'Unknown');
              break;
            case 'RESET':
              WebSocketTimerService.resetTimer(roomId, userId, userName || 'Unknown');
              break;
          }
          break;

        case 'GET_TIMER_STATE':
          // 현재 타이머 상태 전송
          const currentState = WebSocketTimerService.getRoomTimerState(roomId);
          WebSocketTimerService.sendToClient(ws, {
            type: 'TIMER_STATE',
            data: currentState,
            timestamp: Date.now(),
          });
          break;

        case 'PING':
          // heartbeat ping에 대한 pong 응답
          WebSocketTimerService.sendToClient(ws, {
            type: 'PONG',
            data: { timestamp: Date.now() },
            timestamp: Date.now(),
          });
          break;

        case 'CHAT_MESSAGE_SENT':
          // 채팅 메시지 전송 처리
          const chatMessage = data as ChatMessageSent;
          const { content, tempId } = chatMessage.data;

          // 비동기 처리 (응답 지연 방지)
          WebSocketTimerService.handleChatMessageSent(roomId, userId, content, tempId).catch(
            (error) => {
              console.error('채팅 메시지 처리 중 오류:', error);
            }
          );
          break;

        default:
          console.log('알 수 없는 메시지 타입:', data.type);
      }
    } catch (error) {
      console.error('메시지 파싱 에러:', error);
    }
  });

  // 연결 해제 처리
  ws.on('close', () => {
    console.log(`🔌 웹소켓 연결 해제: 룸 ${roomId}, 사용자 ${userId}`);
    WebSocketTimerService.removeClientFromRoom(roomId, userId).catch((error) => {
      console.error('클라이언트 제거 중 오류:', error);
    });
  });

  // 에러 처리
  ws.on('error', (error) => {
    console.error('웹소켓 에러:', error);
  });
});

console.log(`🔌 WebSocket Server is running on ws://localhost:${PORT}/ws`);

process.on('SIGINT', async () => {
  console.log('Server shutting down...');
  await prisma.$disconnect();
  server.close(() => {
    console.log('Server closed');
    process.exit(0);
  });
});

process.on('SIGTERM', async () => {
  console.log('Server shutting down...');
  await prisma.$disconnect();
  server.close(() => {
    console.log('Server closed');
    process.exit(0);
  });
});
