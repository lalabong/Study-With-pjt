import jwt from 'jsonwebtoken';

const authMiddleware = (req, res, next) => {
  try {
    const authHeader = req.headers.authorization;

    if (!authHeader) {
      return res.status(401).json({
        status: 'error',
        message: '인증 헤더가 제공되지 않았습니다.',
      });
    }

    if (!authHeader.startsWith('Bearer ')) {
      return res.status(401).json({
        status: 'error',
        message: '유효한 인증 형식이 아닙니다. Bearer 토큰이 필요합니다.',
      });
    }

    const token = authHeader.split(' ')[1];

    if (!token) {
      return res.status(401).json({
        status: 'error',
        message: '인증 토큰이 제공되지 않았습니다.',
      });
    }

    const decoded = jwt.verify(token, process.env.JWT_SECRET);

    req.user = decoded;

    next();
  } catch (error) {
    if (error.name === 'TokenExpiredError') {
      return res.status(401).json({
        status: 'error',
        message: '토큰이 만료되었습니다.',
      });
    }

    if (error.name === 'JsonWebTokenError') {
      return res.status(401).json({
        status: 'error',
        message: '유효하지 않은 토큰입니다.',
      });
    }

    next(error);
  }
};

export default authMiddleware;
