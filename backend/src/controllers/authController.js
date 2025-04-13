import bcrypt from 'bcrypt';
import jwt from 'jsonwebtoken';

import { pool } from '#db';

const login = async (req, res, next) => {
  try {
    const { userId, password } = req.body;

    console.log('로그인 시도:', { userId, passwordProvided: !!password });

    const [users] = await pool.query('SELECT * FROM user WHERE userId = ?', [userId]);

    if (users.length === 0) {
      console.log('사용자를 찾을 수 없음:', userId);
      return res.status(401).json({
        status: 'error',
        message: '사용자명 또는 비밀번호가 올바르지 않습니다.',
      });
    }

    const user = users[0];

    const passwordMatch = await bcrypt.compare(password, user.password);

    if (!passwordMatch) {
      console.log('비밀번호 불일치:', userId);
      return res.status(401).json({
        status: 'error',
        message: '사용자명 또는 비밀번호가 올바르지 않습니다.',
      });
    }

    const token = jwt.sign(
      {
        id: user.id,
        userId: user.userId,
        nickname: user.nickname,
      },
      process.env.JWT_SECRET,
      { expiresIn: process.env.JWT_EXPIRES_IN }
    );

    console.log('로그인 성공:', userId);

    res.status(200).json({
      status: 'success',
      token,
      user: {
        id: user.id,
        userId: user.userId,
        nickname: user.nickname,
        profileImg: user.profileImg,
      },
    });
  } catch (error) {
    console.error('로그인 에러:', error);
    next(error);
  }
};

const signup = async (req, res, next) => {
  try {
    const { userId, password, nickname } = req.body;

    if (!userId || !password || !nickname) {
      return res.status(400).json({
        status: 'error',
        message: '모든 필수 정보를 입력해주세요.',
      });
    }

    const [existingUsers] = await pool.query('SELECT * FROM user WHERE userId = ?', [userId]);
    if (existingUsers.length > 0) {
      return res.status(400).json({
        status: 'error',
        message: '이미 사용 중인 아이디입니다.',
      });
    }

    const [existingNicknames] = await pool.query('SELECT * FROM user WHERE nickname = ?', [
      nickname,
    ]);
    if (existingNicknames.length > 0) {
      return res.status(400).json({
        status: 'error',
        message: '이미 사용 중인 닉네임입니다.',
      });
    }

    const hashedPassword = await hashPassword(password);

    const [result] = await pool.query(
      'INSERT INTO user (userId, password, nickname) VALUES (?, ?, ?)',
      [userId, hashedPassword, nickname]
    );

    const newUserId = result.insertId;

    const token = jwt.sign(
      {
        id: newUserId,
        userId,
        nickname,
      },
      process.env.JWT_SECRET,
      { expiresIn: process.env.JWT_EXPIRES_IN }
    );

    res.status(201).json({
      status: 'success',
      message: '회원가입이 완료되었습니다.',
      token,
      user: {
        id: newUserId,
        userId,
        nickname,
      },
    });
  } catch (error) {
    console.error('회원가입 에러:', error);
    next(error);
  }
};

const hashPassword = async (password) => {
  const salt = await bcrypt.genSalt(10);
  return bcrypt.hash(password, salt);
};

export { login, signup, hashPassword };
