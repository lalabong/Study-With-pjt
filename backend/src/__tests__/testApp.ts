import express from 'express';
import cors from 'cors';
import cookieParser from 'cookie-parser';
import path from 'path';

import routes from '../routes/index.js';
import errorHandler from '../middlewares/errorHandler.js';
import { handleFileUploadErrors } from '../middlewares/fileMiddleware.js';

export const createTestApp = () => {
  const app = express();

  app.use(cors({
    origin: process.env.CLIENT_URL || 'http://localhost:3001',
    credentials: true,
    methods: ['GET', 'POST', 'PUT', 'DELETE', 'PATCH', 'OPTIONS'],
    allowedHeaders: ['Content-Type', 'Authorization'],
  }));
  
  app.use(express.json());
  app.use(express.urlencoded({ extended: true }));
  app.use(cookieParser());
  app.use('/uploads', express.static(path.join(process.cwd(), 'uploads')));

  app.use('/api', routes);

  app.get('/health', (req, res) => {
    res.status(200).json({ 
      status: 'OK', 
      timestamp: new Date().toISOString(),
      uptime: process.uptime() 
    });
  });

  app.get('/', (req, res) => {
    res.json({ message: 'SWith API Server' });
  });

  app.use((req, res) => {
    res.status(404).json({
      status: 'error',
      message: '요청한 페이지를 찾을 수 없습니다.',
    });
  });

  app.use(handleFileUploadErrors);
  app.use(errorHandler);

  return app;
}; 