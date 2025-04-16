import axios, { AxiosError, AxiosResponse, InternalAxiosRequestConfig } from 'axios';

import { TOKEN_STORAGE } from '@/utils/auth';

interface ExtendedAxiosRequestConfig extends InternalAxiosRequestConfig {
  _retry?: boolean;
}

export const apiClient = axios.create({
  baseURL: process.env.NEXT_PUBLIC_API_URL,
  headers: {
    'Content-Type': 'application/json',
  },
  timeout: 30000,
  withCredentials: true,
});

// 요청 인터셉터
const handleRequestSuccess = (config: InternalAxiosRequestConfig) => {
  const accessToken = TOKEN_STORAGE.getAccessToken();

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
        `${process.env.NEXT_PUBLIC_API_URL}/api/refresh`,
        {},
        { withCredentials: true },
      );

      const { accessToken } = response.data;

      TOKEN_STORAGE.setAccessToken(accessToken);

      if (originalRequest.headers) {
        originalRequest.headers.Authorization = `Bearer ${accessToken}`;
      }
      return axios({
        ...originalRequest,
        withCredentials: true,
      });
    } catch (refreshError) {
      TOKEN_STORAGE.clearTokens();
      return Promise.reject(refreshError);
    }
  }

  return Promise.reject(error);
};

apiClient.interceptors.request.use(handleRequestSuccess, handleRequestError);
apiClient.interceptors.response.use(handleResponseSuccess, handleResponseError);
