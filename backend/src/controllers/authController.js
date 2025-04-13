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

export { login };
