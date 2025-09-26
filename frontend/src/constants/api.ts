export const API_PREFIX = '/api';

export const AUTH_ENDPOINTS = {
  SIGNUP: `${API_PREFIX}/auth/signup`,
  LOGIN: `${API_PREFIX}/auth/login`,
  LOGOUT: `${API_PREFIX}/auth/logout`,
  REFRESH_TOKEN: `${API_PREFIX}/auth/refreshAccessToken`,
};

export const MYPAGE_ENDPOINTS = {
  GET_USER_INFO: (userId: string) => `${API_PREFIX}/users/${userId}`,
  GET_USER_TIMELOGS: (userId: string, period?: string, date?: string) =>
    `${API_PREFIX}/users/${userId}/timelogs?period=${period}&date=${date}`,
  GET_USER_TOTAL_STUDY_TIME: (userId: string) => `${API_PREFIX}/users/${userId}/totalStudyTime`,
  UPDATE_USER_NICKNAME: (userId: string) => `${API_PREFIX}/users/${userId}/nickname`,
  UPDATE_USER_PROFILE_IMG: (userId: string) => `${API_PREFIX}/users/${userId}/profileImg`,
  POST_TIME_LOG: (userId: string) => `${API_PREFIX}/users/${userId}/timelogs`,
};

export const SCHEDULE_ENDPOINTS = {
  GET_SCHEDULE_DATES: (userId: string, startDate?: string, endDate?: string) =>
    `${API_PREFIX}/schedules/user/${userId}/dates?startDate=${startDate}&endDate=${endDate}`,
  GET_SCHEDULES_BY_DATE: (userId: string, date: string) =>
    `${API_PREFIX}/schedules/user/${userId}/byDate?date=${date}`,
  GET_TOP_RUNNING_SCHEDULE: (userId: string, date: string) =>
    `${API_PREFIX}/schedules/user/${userId}/topRunningSchedule?date=${date}`,
  CREATE_SCHEDULE: `${API_PREFIX}/schedules`,
  UPDATE_AND_DELETE_SCHEDULE: (scheduleId: string) => `${API_PREFIX}/schedules/${scheduleId}`,
  UPDATE_SCHEDULE_ORDER: `${API_PREFIX}/schedules/order`,
};

export const ROOM_ENDPOINTS = {
  CREATE_ROOM: `${API_PREFIX}/rooms`,
  GET_ROOM_INFO: (roomId: string) => `${API_PREFIX}/rooms/${roomId}`,
  GET_PARTICIPANTS: (roomId: string) => `${API_PREFIX}/rooms/${roomId}/participants`,
  LEAVE_ROOM: (roomId: string) => `${API_PREFIX}/rooms/${roomId}/leave`,
  CHECK_LAST_PARTICIPANT: (roomId: string) =>
    `${API_PREFIX}/rooms/${roomId}/check-last-participant`,
  CURRENT: `${API_PREFIX}/rooms/current`,
};

export const FRIEND_ENDPOINTS = {
  SEARCH_USERS: `${API_PREFIX}/friends/search`,
  GET_FRIENDS: (userCuid: string) => `${API_PREFIX}/friends/${userCuid}`,
  GET_RECEIVED_FRIEND_REQUESTS: (userCuid: string) =>
    `${API_PREFIX}/friends/${userCuid}/requests/received`,
  SEND_FRIEND_REQUEST: (userCuid: string) => `${API_PREFIX}/friends/${userCuid}/request`,
  CANCEL_FRIEND_REQUEST: (userCuid: string) => `${API_PREFIX}/friends/${userCuid}/request`,
  ACCEPT_FRIEND_REQUEST: (userCuid: string) => `${API_PREFIX}/friends/${userCuid}/request/accept`,
  REJECT_FRIEND_REQUEST: (userCuid: string) => `${API_PREFIX}/friends/${userCuid}/request/reject`,
  DELETE_FRIEND: (userCuid: string) => `${API_PREFIX}/friends/${userCuid}`,
};
