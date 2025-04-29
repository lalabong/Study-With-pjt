import axios, { AxiosError, AxiosResponse, InternalAxiosRequestConfig } from 'axios';

import { postRefreshAccessToken } from '@api/user/postRefreshAccessToken';

import { AUTH_ENDPOINTS } from '@constants/api';
import { AUTH_ERROR_MESSAGES, API_ERROR_MESSAGES } from '@constants/errorMessages';

import { useAuthStore } from '@stores/authStore';

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

const redirectToLogin = () => {
  if (typeof window !== 'undefined') {
    window.location.href = '/login';
  }
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
  if (
    error.response?.status === 401 &&
    originalRequest &&
    !originalRequest._retry &&
    !isAuthRequest &&
    !originalRequest.skipAuthRetry
  ) {
    originalRequest._retry = true;

    try {
      const response = await postRefreshAccessToken();
      const accessToken = response.data?.accessToken;

      if (accessToken) {
        useAuthStore.getState().setAccessToken(accessToken);
      }

      // 원래 요청의 헤더에 새 토큰 설정
      if (originalRequest.headers) {
        originalRequest.headers.Authorization = `Bearer ${accessToken}`;
      }

      // 실패했던 요청 다시 실행
      return axios({
        ...originalRequest,
        withCredentials: true,
      });
    } catch (refreshError) {
      useAuthStore.getState().clearAuthState();

      redirectToLogin();

      if (refreshError instanceof AxiosError) {
        if (refreshError.response?.status === 400) {
          return Promise.reject(AUTH_ERROR_MESSAGES.TOKEN_NOT_FOUND);
        }
        if (refreshError.response?.status === 401) {
          return Promise.reject(AUTH_ERROR_MESSAGES.INVALID_TOKEN);
        }
      }

      return Promise.reject(error);
    }
  }

  if (error.response?.status === 401 && !isAuthRequest) {
    useAuthStore.getState().clearAuthState();
    redirectToLogin();
  }

  if (error.response) {
    logErrorByStatus(error.response.status, error);
  }

  return Promise.reject(error);
};

axiosInstance.interceptors.request.use(handleRequestSuccess, handleRequestError);
axiosInstance.interceptors.response.use(handleResponseSuccess, handleResponseError);
