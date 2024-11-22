import axios from 'axios';
import APIEndpoint from 'constant/APIEndPoint';
import {reduxStorage} from 'store/store';

const BASE_URL = 'https://api.dev.jarvis.cx/api/';
const API_VERSION = 'v1';

const apiClient = axios.create({
  baseURL: BASE_URL + API_VERSION,
  timeout: 10000,
});

apiClient.interceptors.request.use(
  async config => {
    // Add custom headers or token
    const accessToken = await reduxStorage.getItem('accessToken');

    console.log(accessToken);

    if (accessToken) {
      config.headers['Authorization'] = `Bearer ${accessToken}`;
    }

    return config;
  },
  error => {
    // Handle request errors
    console.error('Request Error:', error);
    return Promise.reject(error);
  },
);

apiClient.interceptors.response.use(
  response => {
    console.log('Response:', response);
    return response.data;
  },
  async error => {
    console.error('Response Error:', error.response || error.message);

    const originalRequest = error.config;

    // Handle unauthorized error
    if (error.response?.status === 401 && !originalRequest._retry) {
      originalRequest._retry = true;

      const refreshToken = reduxStorage.getItem('refreshToken');

      if (refreshToken) {
        try {
          const response = await apiClient.post(APIEndpoint.GetRefreshToken, {
            refreshToken,
          });

          reduxStorage.setItem('accessToken', response.data.token?.accessToken);

          return apiClient(originalRequest);
        } catch (error: any) {
          console.error('Refresh token error:', error);
          return Promise.reject(error.response || error.message);
        }
      }
    }

    return Promise.reject(error.response || error.message);
  },
);

// Wrapper functions for HTTP methods
const api = {
  get: (url: string, params = {}, customHeaders = {}) =>
    apiClient.get(url, {
      params,
      headers: {...apiClient.defaults.headers.common, ...customHeaders},
    }),

  post: (url: string, data = {}, customHeaders = {}) =>
    apiClient.post(url, data, {
      headers: {...apiClient.defaults.headers.common, ...customHeaders},
    }),

  put: (url: string, data = {}, customHeaders = {}) =>
    apiClient.put(url, data, {
      headers: {...apiClient.defaults.headers.common, ...customHeaders},
    }),

  patch: (url: string, data = {}, customHeaders = {}) =>
    apiClient.patch(url, data, {
      headers: {...apiClient.defaults.headers.common, ...customHeaders},
    }),

  delete: (url: string, customHeaders = {}) =>
    apiClient.delete(url, {
      headers: {...apiClient.defaults.headers.common, ...customHeaders},
    }),
};

export default api;
