import axios, { type AxiosError, type AxiosInstance, type AxiosResponse, type InternalAxiosRequestConfig } from 'axios';

import { HttpStatus } from '@/enums/enum';
import { useSessionStore } from '@/stores';
import type { IApiError, ITokenPair } from '@/types/type';

type RetriableConfig = InternalAxiosRequestConfig & { _retry?: boolean };

export type RefreshTokenHandler = (refreshToken: string) => Promise<ITokenPair>;

let refreshTokenHandler: RefreshTokenHandler | null = null;
let refreshPromise: Promise<string | null> | null = null;

/**
 * Register how expired access tokens are renewed. Call it once at app start-up, e.g.
 *
 * ```ts
 * setRefreshTokenHandler(async (refreshToken) => (await requestInternal.post('/auth/refresh', { refreshToken })).data);
 * ```
 *
 * Without a handler, a 401 simply clears the session.
 */
export const setRefreshTokenHandler = (handler: RefreshTokenHandler | null) => {
  refreshTokenHandler = handler;
};

/** Renew the access token. Concurrent 401s share a single in-flight refresh. */
const refreshAccessToken = (): Promise<string | null> => {
  if (refreshPromise) return refreshPromise;

  const store = useSessionStore.getState();

  refreshPromise = (async () => {
    if (!refreshTokenHandler || !store.refreshToken) {
      store.clearSession();
      return null;
    }

    try {
      const tokens = await refreshTokenHandler(store.refreshToken);
      store.setAccessToken(tokens.accessToken);
      store.setRefreshToken(tokens.refreshToken);
      return tokens.accessToken;
    } catch {
      store.clearSession();
      return null;
    } finally {
      refreshPromise = null;
    }
  })();

  return refreshPromise;
};

export const requestInterceptor = (config: InternalAxiosRequestConfig): InternalAxiosRequestConfig => {
  const token = useSessionStore.getState().accessToken;

  if (token) config.headers.set('Authorization', `Bearer ${token}`);

  return config;
};

export const successInterceptor = (response: AxiosResponse): AxiosResponse => response;

/** Turn any axios failure into the `IApiError` shape the app relies on. */
export const normalizeApiError = (error: unknown): IApiError => {
  if (axios.isAxiosError(error)) {
    const data = error.response?.data as { meta?: { code?: number; message?: string }; message?: string } | undefined;

    return {
      status: error.response?.status ?? 0,
      message: data?.meta?.message || data?.message || error.message,
      code: data?.meta?.code ?? error.code,
      details: error.response?.data,
    };
  }

  return {
    status: 0,
    message: error instanceof Error ? error.message : 'Unknown error',
  };
};

export const createErrorInterceptor = (instance: AxiosInstance) => async (error: AxiosError) => {
  const originalRequest = error.config as RetriableConfig | undefined;

  if (error.response?.status === HttpStatus.UNAUTHORIZED && originalRequest && !originalRequest._retry) {
    originalRequest._retry = true;
    const token = await refreshAccessToken();

    if (token) {
      originalRequest.headers.set('Authorization', `Bearer ${token}`);
      return instance(originalRequest);
    }
  }

  return Promise.reject(normalizeApiError(error));
};

/** Wire auth + error handling into an axios instance. */
export const attachInterceptors = (instance: AxiosInstance) => {
  instance.interceptors.request.use(requestInterceptor);
  instance.interceptors.response.use(successInterceptor, createErrorInterceptor(instance));
};
