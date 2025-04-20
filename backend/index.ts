import 'dotenv/config';
import cors from 'cors';
import express, { Request, Response } from 'express';
import { Server } from 'http';
import cookieParser from 'cookie-parser';

import { prisma, testConnection } from './src/db.js';
import errorHandler from './src/middlewares/errorHandler.js';
import routes from './src/routes/index.js';
import { setupSwagger } from './src/utils/swagger.js';

const app = express();
const PORT = process.env.PORT || 4000;

app.use(
  cors({
    origin: process.env.CLIENT_URL,
    credentials: true,
    methods: ['GET', 'POST', 'PUT', 'DELETE', 'OPTIONS'],
    allowedHeaders: ['Content-Type', 'Authorization'],
  })
);

app.use(express.json());
app.use(express.urlencoded({ extended: true }));
app.use(cookieParser());

// Swagger 설정
setupSwagger(app);

testConnection();

app.use('/api', routes);

app.get('/', (_req: Request, res: Response) => {
  res.json({ message: 'SWith API Server' });
});

app.use((_req: Request, res: Response) => {
  res.status(404).json({
    status: 'error',
    message: '요청한 페이지를 찾을 수 없습니다.',
  });
});

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
