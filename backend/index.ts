import 'dotenv/config';
import cors from 'cors';
import express, { Request, Response, NextFunction } from 'express';
import { Server } from 'http';

import { prisma, testConnection } from './src/db.js';
import errorHandler from './src/middlewares/errorHandler.js';
import routes from './src/routes/index.js';

const app = express();
const PORT = process.env.PORT || 4000;

app.use(cors());
app.use(express.json());
app.use(express.urlencoded({ extended: true }));

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
