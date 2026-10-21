import { createSelectorFunctions } from 'auto-zustand-selectors-hook';
import { create } from 'zustand';
import { createJSONStorage, persist } from 'zustand/middleware';

import { STORAGE_KEYS } from '@/constants/const';
import { createCookieStorage } from '@/lib/cookie-storage';
import type { ISessionUser } from '@/types/type';

export const SESSION_STORE_COOKIE_NAME = STORAGE_KEYS.SESSION;
export const SESSION_STORE_VERSION = 0;
export const SESSION_COOKIE_OPTIONS = {
  expiresInDays: 7,
  path: '/',
  secure: process.env.NODE_ENV === 'production',
  sameSite: 'lax' as const,
};

export interface ISessionStore {
  status: 'waiting' | 'ready';
  user: ISessionUser | null;
  accessToken: string;
  refreshToken: string;
  /** Bumps whenever the identity changes, so caches can be invalidated (see QueryClientProvider). */
  sessionRevision: number;
  setAccessToken: (data: string) => void;
  setRefreshToken: (data: string) => void;
  setUser: (data: ISessionUser | null) => void;
  clearSession: () => void;
}

const useBaseSessionStore = create<ISessionStore>()(
  persist(
    (set) => ({
      status: 'waiting',
      user: null,
      accessToken: '',
      refreshToken: '',
      sessionRevision: 0,
      setAccessToken: (data) =>
        set((state) => ({
          accessToken: data,
          sessionRevision: state.sessionRevision + Number(data !== state.accessToken),
        })),
      setRefreshToken: (data) => set({ refreshToken: data }),
      setUser: (data) =>
        set((state) => ({
          user: data,
          sessionRevision: state.sessionRevision + Number(data?.id !== state.user?.id),
        })),
      clearSession: () =>
        set((state) => ({
          status: 'ready',
          accessToken: '',
          refreshToken: '',
          user: null,
          sessionRevision: state.sessionRevision + 1,
        })),
    }),
    {
      name: SESSION_STORE_COOKIE_NAME,
      version: SESSION_STORE_VERSION,
      storage: createJSONStorage(() =>
        createCookieStorage({
          expires: SESSION_COOKIE_OPTIONS.expiresInDays,
          path: SESSION_COOKIE_OPTIONS.path,
          secure: SESSION_COOKIE_OPTIONS.secure,
          sameSite: SESSION_COOKIE_OPTIONS.sameSite,
        })
      ),
      onRehydrateStorage: () => (state) => {
        if (!state) return;
        state.status = 'ready';
      },
    }
  )
);

export const useSessionStore = createSelectorFunctions(useBaseSessionStore);
