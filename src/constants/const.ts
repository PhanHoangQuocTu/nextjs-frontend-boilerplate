/** Prefix of this app's own Route Handlers (the BFF). */
export const INTERNAL_API_PREFIX = '/api';

export const DEFAULT_PAGINATION = {
  page: 1,
  limit: 10,
} as const;

export const PAGE_SIZE_OPTIONS = [10, 20, 50, 100] as const;

/** Debounce delay (ms) used by search inputs. */
export const SEARCH_DEBOUNCE_MS = 300;

export const STORAGE_KEYS = {
  SESSION: 'session-store',
  SIDEBAR: 'sidebar-state',
} as const;

export const COOKIE_KEYS = {
  ACCESS_TOKEN: 'accessToken',
  REFRESH_TOKEN: 'refreshToken',
} as const;

export const IMAGE_TYPE = ['png', 'jpg', 'jpeg', 'webp', 'svg'];
export const VIDEO_TYPE = ['mp4', 'mov', 'webm', 'ogg', 'wmv'];

export const FILE_FORMAT = ['image/png', 'image/jpeg', 'image/webp', 'image/svg+xml', 'application/pdf'] as const;
export const MAX_FILE_SIZE_MB = 5;

export const NUMBER_FORMAT_LOOK_UP = [
  { value: 1, symbol: '' },
  { value: 1e3, symbol: 'K' },
  { value: 1e6, symbol: 'M' },
  { value: 1e9, symbol: 'B' },
  { value: 1e12, symbol: 'T' },
] as const;

export const EMPTY_PLACEHOLDER = '--';

export const OG_IMAGE_SIZE = { width: 1200, height: 630 } as const;
export const OG_IMAGE_CONTENT_TYPE = 'image/png';
