export const AUTH_ERROR = {
  INVALID_CREDENTIALS: '사용자명 또는 비밀번호가 올바르지 않습니다.',
  REQUIRED_FIELDS: '모든 필수 정보를 입력해주세요.',
  USER_ID_EXISTS: '이미 사용 중인 아이디입니다.',
  NICKNAME_EXISTS: '이미 사용 중인 닉네임입니다.',
  UNAUTHORIZED: '로그인이 필요한 서비스입니다.',
  ACCESS_TOKEN_SECRET_MISSING: 'ACCESS_TOKEN_SECRET이 설정되지 않았습니다.',
  REFRESH_SECRET_MISSING: 'REFRESH_SECRET이 설정되지 않았습니다.',
  TOKEN_EXPIRED: '로그인 세션이 만료되었습니다. 다시 로그인해주세요.',
  INVALID_TOKEN: '유효하지 않은 인증 토큰입니다.',
  INVALID_REFRESH_TOKEN: '유효하지 않은 리프레시 토큰입니다.',
  REFRESH_TOKEN_EXPIRED: '리프레시 토큰이 만료되었습니다. 다시 로그인해주세요.',
  TOKEN_REQUIRED: '토큰이 필요합니다.',
};

export const SERVER_ERROR = {
  INTERNAL_ERROR: '서버 내부 오류가 발생했습니다.',
};
