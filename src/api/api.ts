import axios from 'axios';

const BASE_URL = 'https://api.dev.jarvis.cx/';
const API_VERSION = 'v1';

const apiClient = axios.create({
  baseURL: BASE_URL + API_VERSION,
  timeout: 10000,
});

apiClient.interceptors.request.use(
  config => {
    // Add custom headers or token
    // config.headers['Authorization'] = 'Bearer YOUR_TOKEN';

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
  error => {
    console.error('Response Error:', error.response || error.message);
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
