/* eslint-disable prettier/prettier */
/* eslint-disable @typescript-eslint/no-non-null-assertion */
import axios from 'axios';

export const baseURL = process.env.NEXT_PUBLIC_API_URL as string;

const api = axios.create({
  baseURL,
});

api.interceptors.request.use(
  async config => {
    const accessToken = localStorage.getItem('@register:accessToken');
    if (accessToken) {
      config.headers!.Authorization = `Bearer ${accessToken}`;
    }
    return config;
  },
  error => Promise.reject(error),
);

export default api;

export async function refreshAccessToken() {
  try {
    const credentials = localStorage.getItem('@register:refreshToken');

    if (typeof credentials === 'string') {
      const { data } = await api.put('/user/session', {
        refresh_token: credentials,
      });
      localStorage.setItem('@register:accessToken', data.access_token);
      localStorage.setItem('@register:refreshToken', data.refresh_token);
      return data?.access_token;
    }
  } catch (error) {
    localStorage.clear();
    window.location.href = '/';
  }

  localStorage.clear();
  window.location.href = '/';
}

api.interceptors.response.use(
  response => response,
  async error => {
    const originalRequest = error.config;

    if (
      error.response.status === 401
      && !originalRequest.retry
      && !originalRequest.url.includes('session')
    ) {
      originalRequest.retry = true;
      const accessToken = await refreshAccessToken();
      originalRequest.headers.Authorization = `Bearer ${accessToken}`;
      return api(originalRequest);
    }
    return Promise.reject(error);
  },
);
