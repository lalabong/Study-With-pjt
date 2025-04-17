import axios, { AxiosError, AxiosResponse, InternalAxiosRequestConfig } from 'axios';

import { AUTH_ENDPOINTS } from '@/constants/api';
import { AUTH_ERROR_MESSAGES, API_ERROR_MESSAGES } from '@/constants/errorMessages';
import { useAuthStore } from '@/stores/authStore';

interface ExtendedAxiosRequestConfig extends InternalAxiosRequestConfig {
  _retry?: boolean;
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

  if (error.response?.status === 401 && originalRequest && !originalRequest._retry) {
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

      console.error(AUTH_ERROR_MESSAGES.REFRESH_TOKEN_FAILED, refreshError);
      return Promise.reject(refreshError);
    }
  }

  if (error.response) {
    logErrorByStatus(error.response.status, error);
  }

  return Promise.reject(error);
};

axiosInstance.interceptors.request.use(handleRequestSuccess, handleRequestError);
axiosInstance.interceptors.response.use(handleResponseSuccess, handleResponseError);
