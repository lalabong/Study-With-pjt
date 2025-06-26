import 'dotenv/config';
import cors from 'cors';
import express, { Request, Response } from 'express';
import { Server } from 'http';
import cookieParser from 'cookie-parser';

import { prisma, testConnection } from './src/db.js';
import errorHandler from './src/middlewares/errorHandler.js';
import routes from './src/routes/index.js';
import { setupSwagger } from './src/utils/swagger.js';
import path from 'path';

import { handleFileUploadErrors } from './src/middlewares/fileMiddleware.js';

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
    uptime: process.uptime() 
  });
});

app.use((_req: Request, res: Response) => {
  res.status(404).json({
    status: 'error',
    message: '요청한 페이지를 찾을 수 없습니다.',
  });
});

app.use(handleFileUploadErrors);
app.use(errorHandler);

const server: Server = app.listen(PORT, () => {
  console.log(`Server is running on port ${PORT}`);
});

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
