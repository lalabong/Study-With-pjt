import axios, { AxiosError, AxiosResponse, InternalAxiosRequestConfig } from 'axios';

import { AUTH_ENDPOINTS } from '@/constants/api';
import { AUTH_ERROR_MESSAGES, API_ERROR_MESSAGES } from '@/constants/errorMessages';
import { useAuthStore } from '@/stores/authStore';

interface ExtendedAxiosRequestConfig extends InternalAxiosRequestConfig {
  _retry?: boolean;
  skipAuthRetry?: boolean; // 인증 재시도를 건너뛰는 옵션
}

export const axiosInstance = axios.create({
  baseURL: process.env.NEXT_PUBLIC_API_URL,
  headers: {
    'Content-Type': 'application/json',
  },
  timeout: 30000,
  withCredentials: true,
});

const logErrorByStatus = (status: number, error: AxiosError): void => {
  const statusToMessageMap: Record<number, string> = {
    400: API_ERROR_MESSAGES.BAD_REQUEST,
    403: API_ERROR_MESSAGES.FORBIDDEN,
    404: API_ERROR_MESSAGES.NOT_FOUND,
  };

  const errorMessage = statusToMessageMap[status] || API_ERROR_MESSAGES.REQUEST_FAILED;
  console.error(errorMessage, error);
};

// 요청 인터셉터
const handleRequestSuccess = (config: InternalAxiosRequestConfig) => {
  const accessToken = useAuthStore.getState().accessToken;

  if (accessToken) {
    config.headers = config.headers || {};
    config.headers.Authorization = `Bearer ${accessToken}`;
  }

  return config;
};

const handleRequestError = (error: AxiosError) => {
  return Promise.reject(error);
};

// 응답 인터셉터
const handleResponseSuccess = (response: AxiosResponse) => {
  return response;
};

const handleResponseError = async (error: AxiosError) => {
  const originalRequest = error.config as ExtendedAxiosRequestConfig;

  // 로그인 및 회원가입 요청은 토큰 갱신 시도하지 않음
  const isAuthRequest =
    originalRequest.url?.includes(AUTH_ENDPOINTS.LOGIN) ||
    originalRequest.url?.includes(AUTH_ENDPOINTS.SIGNUP);

  // 401 에러이고, 원본 요청이 있고, 아직 재시도하지 않았고, 인증 관련 요청이 아닌 경우에만 토큰 갱신 시도
  // 기존엔 401에러일 경우에만 토큰 갱신 시도했음
  if (
    error.response?.status === 401 &&
    originalRequest &&
    !originalRequest._retry &&
    !isAuthRequest &&
    !originalRequest.skipAuthRetry
  ) {
    originalRequest._retry = true;

    try {
      const response = await axios.post(
        `${process.env.NEXT_PUBLIC_API_URL}${AUTH_ENDPOINTS.REFRESH_TOKEN}`,
        {},
        { withCredentials: true },
      );

      const { accessToken } = response.data;

      useAuthStore.getState().setAccessToken(accessToken);

      if (originalRequest.headers) {
        originalRequest.headers.Authorization = `Bearer ${accessToken}`;
      }

      return axios({
        ...originalRequest,
        withCredentials: true,
      });
    } catch (refreshError) {
      useAuthStore.getState().logout();

      // 토큰 갱신 실패 로그 기록 (콘솔에만 표시)
      console.error(AUTH_ERROR_MESSAGES.REFRESH_TOKEN_FAILED, refreshError);

      // 원래 에러를 그대로 반환
      return Promise.reject(error);
    }
  }

  if (error.response) {
    logErrorByStatus(error.response.status, error);
  }

  return Promise.reject(error);
};

axiosInstance.interceptors.request.use(handleRequestSuccess, handleRequestError);
axiosInstance.interceptors.response.use(handleResponseSuccess, handleResponseError);
