import axios from 'axios';
import {APIEndpoint, KB_APIEndpoint} from 'constant/APIEndPoint';

import ScreenName from 'constant/ScreenName';
import {authActions} from 'features/auth/reducer';
import {AppNavigationRef} from 'navigation/index';
import {dispatchReduxStore, reduxStorage} from 'store/store';

const prod = true;

const BASE_URL = 'https://api.dev.jarvis.cx/api/';
const BASE_URL_PROD = 'https://api.jarvis.cx/api/';
const KB_BASE_URL = 'https://knowledge-api.jarvis.cx/kb-core/';
const API_VERSION = 'v1';
const TIMEOUT = 100000;

const apiClient = axios.create({
  baseURL: (prod ? BASE_URL_PROD : BASE_URL) + API_VERSION,
  timeout: TIMEOUT,
});

const kbApiClient = axios.create({
  baseURL: KB_BASE_URL + API_VERSION,
  timeout: TIMEOUT,
});

const attachAuthorization = async (config: any) => {
  const accessToken = await reduxStorage.getItem('accessToken');
  if (accessToken) {
    config.headers['Authorization'] = `Bearer ${accessToken}`;
  }
  return config;
};

const attachAuthorization_KB = async (config: any) => {
  const accessToken = await reduxStorage.getItem('accessToken_KB');
  if (accessToken) {
    config.headers['Authorization'] = `Bearer ${accessToken}`;
  }
  return config;
};

const handleResponse = (response: any) => response.data;

const handleError = async (error: any) => {
  console.error('Response Error:', error.response || error.message);
  const originalRequest = error.config;

  if (error.response?.status === 401 && !originalRequest._retry) {
    originalRequest._retry = true;
    const refreshToken = await reduxStorage.getItem('refreshToken');
    if (refreshToken) {
      try {
        const response = await httpRequestServices.get(
          APIEndpoint.GetRefreshToken,
          {
            refreshToken,
          },
        );

        // @ts-ignore
        reduxStorage.setItem('accessToken', response.token?.accessToken);

        return apiClient(originalRequest);
      } catch (err: any) {
        console.error('Refresh token failed:', err.response || err.message);

        dispatchReduxStore(authActions.changeLoggedStatus(false));
        reduxStorage.removeItem('accessToken');
        reduxStorage.removeItem('refreshToken');
        reduxStorage.removeItem('refreshToken_KB');
        reduxStorage.removeItem('accessToken_KB');

        AppNavigationRef.current?.reset({
          index: 0,
          routes: [
            {
              name: ScreenName.AuthNavigator,
              screen: ScreenName.Login,
            },
          ],
        });

        return Promise.reject(err.response || err.message);
      }
    } else {
      AppNavigationRef.current?.reset({
        index: 0,
        routes: [
          {
            name: ScreenName.AuthNavigator,
            screen: ScreenName.Login,
          },
        ],
      });

      dispatchReduxStore(authActions.changeLoggedStatus(false));
    }
  }

  return Promise.reject(error.response || error.message);
};

const handleError_KB = async (error: any) => {
  console.error('Response Error:', error.response || error.message);
  const originalRequest = error.config;

  if (error.response?.status === 401 && !originalRequest._retry) {
    originalRequest._retry = true;
    const refreshToken = await reduxStorage.getItem('refreshToken_KB');
    if (refreshToken) {
      try {
        const response = await kb_httpRequestServices.post(
          KB_APIEndpoint.GetRefreshToken,
          {
            refreshToken,
          },
        );

        // @ts-ignore
        reduxStorage.setItem('accessToken_KB', response.token?.accessToken);
        return apiClient(originalRequest);
      } catch (err: any) {
        dispatchReduxStore(
          authActions.logoutRequest({
            action: {
              onSuccess: () => {
                console.log('Logout successfully');
                AppNavigationRef.current?.reset({
                  index: 0,
                  routes: [
                    {
                      name: ScreenName.AuthNavigator,
                      screen: ScreenName.Login,
                    },
                  ],
                });
              },
              onFailure: (error: any) => {
                dispatchReduxStore(authActions.changeLoggedStatus(false));
                reduxStorage.removeItem('accessToken');
                reduxStorage.removeItem('refreshToken');
                reduxStorage.removeItem('refreshToken_KB');
                reduxStorage.removeItem('accessToken_KB');

                AppNavigationRef.current?.reset({
                  index: 0,
                  routes: [
                    {
                      name: ScreenName.AuthNavigator,
                      screen: ScreenName.Login,
                    },
                  ],
                });

                return Promise.reject(err.response || err.message);
              },
            },
          }),
        );

        return Promise.reject(err.response || err.message);
      }
    } else {
      AppNavigationRef.current?.reset({
        index: 0,
        routes: [
          {
            name: ScreenName.AuthNavigator,
            screen: ScreenName.Login,
          },
        ],
      });

      dispatchReduxStore(authActions.changeLoggedStatus(false));
    }
  }

  return Promise.reject(error.response || error.message);
};

apiClient.interceptors.request.use(attachAuthorization);
apiClient.interceptors.response.use(handleResponse, handleError);

kbApiClient.interceptors.request.use(attachAuthorization_KB);
kbApiClient.interceptors.response.use(handleResponse, handleError_KB);

export const httpRequestServices = {
  get: (url: string, params = {}, customHeaders = {}) =>
    apiClient.get(url, {params, headers: {...customHeaders}}),

  post: (url: string, data = {}, customHeaders = {}) =>
    apiClient.post(url, data, {headers: {...customHeaders}}),

  put: (url: string, data = {}, customHeaders = {}) =>
    apiClient.put(url, data, {headers: {...customHeaders}}),

  patch: (url: string, data = {}, customHeaders = {}) =>
    apiClient.patch(url, data, {headers: {...customHeaders}}),

  delete: (url: string, customHeaders = {}) =>
    apiClient.delete(url, {headers: {...customHeaders}}),
};

export const kb_httpRequestServices = {
  get: (url: string, params = {}, customHeaders = {}) =>
    kbApiClient.get(url, {params, headers: {...customHeaders}}),

  post: (url: string, data = {}, customHeaders = {}) =>
    kbApiClient.post(url, data, {headers: {...customHeaders}}),

  put: (url: string, data = {}, customHeaders = {}) =>
    kbApiClient.put(url, data, {headers: {...customHeaders}}),

  patch: (url: string, data = {}, customHeaders = {}) =>
    kbApiClient.patch(url, data, {headers: {...customHeaders}}),

  delete: (url: string, customHeaders = {}) =>
    kbApiClient.delete(url, {headers: {...customHeaders}}),
};
