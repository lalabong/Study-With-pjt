import 'dotenv/config';
import cors from 'cors';
import express from 'express';

import { testConnection } from '#db';
import errorHandler from '#middlewares/errorHandler';
import routes from '#routes/index';

const app = express();
const PORT = process.env.PORT || 4000;

app.use(cors());
app.use(express.json());
app.use(express.urlencoded({ extended: true }));

testConnection();

app.use('/api', routes);

app.get('/', (req, res) => {
  res.json({ message: 'SWith API Server' });
});

app.use((req, res) => {
  res.status(404).json({
    status: 'error',
    message: '요청한 페이지를 찾을 수 없습니다.',
  });
});

app.use(errorHandler);

app.listen(PORT, () => {
  console.log(`Server is running on port ${PORT}`);
});
