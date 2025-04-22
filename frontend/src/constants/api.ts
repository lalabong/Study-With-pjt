export const API_PREFIX = '/api';

export const AUTH_ENDPOINTS = {
  SIGNUP: `${API_PREFIX}/auth/signup`,
  LOGIN: `${API_PREFIX}/auth/login`,
  LOGOUT: `${API_PREFIX}/auth/logout`,
  REFRESH_TOKEN: `${API_PREFIX}/auth/refreshAccessToken`,
};

export const MYPAGE_ENDPOINTS = {
  GET_USER_INFO: (userId: string) => `${API_PREFIX}/users/${userId}`,
};
