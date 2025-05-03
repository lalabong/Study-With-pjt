export const USER_ERROR_MESSAGES = {
  ID_MIN_LENGTH: '아이디는 4자 이상이어야 합니다.',
  NICKNAME_MIN_LENGTH: '닉네임은 1자 이상이어야 합니다.',
  NICKNAME_MAX_LENGTH: '닉네임은 50자 이하여야 합니다.',
  PASSWORD_MIN_LENGTH: '비밀번호는 8자 이상이어야 합니다.',
  PASSWORD_FORMAT: '비밀번호는 문자와 숫자를 모두 포함해야 합니다.',
  USER_NOT_FOUND: '존재하지 않는 사용자입니다.',
  PASSWORD_MISMATCH: '비밀번호가 일치하지 않습니다.',

  LOGIN_FAILED: '로그인에 실패했습니다. 아이디와 비밀번호를 확인해주세요.',
  UNAUTHORIZED: '인증되지 않은 사용자입니다. 다시 로그인해주세요.',

  SIGNUP_FAILED: '회원가입에 실패했습니다. 잠시 후 다시 시도해주세요.',
  USER_ALREADY_EXISTS: '이미 존재하는 사용자입니다.',

  // 회원가입 관련 에러 메시지 추가
  INVALID_FORM: '모든 필드를 올바르게 입력해주세요.',
  USER_EXISTS: '이미 사용 중인 아이디입니다.',
  NICKNAME_EXISTS: '이미 사용 중인 닉네임입니다.',

  UNKNOWN_ERROR: '알 수 없는 오류가 발생했습니다.',
  SERVER_ERROR: '서버 오류가 발생했습니다. 잠시 후 다시 시도해주세요.',
  NETWORK_ERROR: '네트워크 연결을 확인해주세요.',
  TIMEOUT_ERROR: '요청 시간이 초과되었습니다. 다시 시도해주세요.',

  GET_USER_INFO_FAILED: '사용자 정보 조회에 실패했습니다.',
  FETCH_SCHEDULES_FAILED: '사용자 일정 조회에 실패했습니다.',
  FETCH_TIMELOGS_FAILED: '시간 기록 조회에 실패했습니다.',
  FETCH_TOTAL_STUDY_TIME_FAILED: '총 학습 시간 조회에 실패했습니다.',

  UPDATE_NICKNAME_FAILED: '닉네임 업데이트에 실패했습니다.',
  UPDATE_PROFILE_IMAGE_FAILED: '프로필 이미지 업데이트에 실패했습니다.',
};

export const AUTH_ERROR_MESSAGES = {
  TOKEN_EXPIRED: '인증이 만료되었습니다. 다시 로그인해주세요.',
  TOKEN_NOT_FOUND: '리프레쉬 토큰이 존재하지 않습니다.',
  INVALID_TOKEN: '유효하지 않은 리프레쉬 토큰입니다다.',
  REFRESH_TOKEN_FAILED: '토큰 갱신에 실패했습니다.',
};

export const API_ERROR_MESSAGES = {
  REQUEST_FAILED: '요청 처리에 실패했습니다.',
  BAD_REQUEST: '잘못된 요청입니다.',
  NOT_FOUND: '요청한 정보를 찾을 수 없습니다.',
  FORBIDDEN: '접근 권한이 없습니다.',
};
