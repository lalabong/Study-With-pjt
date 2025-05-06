export const API_PREFIX = '/api';

export const AUTH_ENDPOINTS = {
  SIGNUP: `${API_PREFIX}/auth/signup`,
  LOGIN: `${API_PREFIX}/auth/login`,
  LOGOUT: `${API_PREFIX}/auth/logout`,
  REFRESH_TOKEN: `${API_PREFIX}/auth/refreshAccessToken`,
};

export const MYPAGE_ENDPOINTS = {
  GET_USER_INFO: (userId: string) => `${API_PREFIX}/users/${userId}`,
  GET_USER_TIMELOGS: (userId: string, period: string, date: string) =>
    `${API_PREFIX}/users/${userId}/timelogs?period=${period}&date=${date}`,
  GET_USER_TOTAL_STUDY_TIME: (userId: string) => `${API_PREFIX}/users/${userId}/totalStudyTime`,
  UPDATE_USER_NICKNAME: (userId: string) => `${API_PREFIX}/users/${userId}/nickname`,
  UPDATE_USER_PROFILE_IMG: (userId: string) => `${API_PREFIX}/users/${userId}/profileImg`,
};

export const SCHEDULE_ENDPOINTS = {
  GET_USER_SCHEDULES: (userId: string) => `${API_PREFIX}/schedules/user/${userId}`,
  CREATE_SCHEDULE: `${API_PREFIX}/schedules`,
  UPDATE_AND_DELETE_SCHEDULE: (scheduleId: string) => `${API_PREFIX}/schedules/${scheduleId}`,
  UPDATE_SCHEDULE_ORDER: (scheduleId: string) => `${API_PREFIX}/schedules/${scheduleId}/order`,
};
