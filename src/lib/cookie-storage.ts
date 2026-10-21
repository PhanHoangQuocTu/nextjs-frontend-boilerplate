import Cookies from 'js-cookie';
import type { StateStorage } from 'zustand/middleware';

interface CookieStorageOptions {
  expires?: number | Date;
  path?: string;
  domain?: string;
  secure?: boolean;
  sameSite?: 'strict' | 'lax' | 'none';
}

/**
 * Cookie storage adapter for Zustand persist middleware
 */
export const createCookieStorage = (options?: CookieStorageOptions): StateStorage => {
  const defaultOptions: CookieStorageOptions = {
    expires: 7, // 7 days
    path: '/',
    secure: process.env.NODE_ENV === 'production',
    sameSite: 'lax',
    ...options,
  };

  return {
    getItem: (name: string): string | null => {
      const value = Cookies.get(name);
      return value ?? null;
    },
    setItem: (name: string, value: string): void => {
      Cookies.set(name, value, defaultOptions);
    },
    removeItem: (name: string): void => {
      Cookies.remove(name, { path: defaultOptions.path });
    },
  };
};
