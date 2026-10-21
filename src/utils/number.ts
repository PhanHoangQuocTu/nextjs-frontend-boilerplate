import { EMPTY_PLACEHOLDER, NUMBER_FORMAT_LOOK_UP } from '@/constants/const';
import type { RoundType } from '@/types/type';

type Numeric = number | string | null | undefined;

export const toNumber = (value: Numeric, fallback = 0): number => {
  if (value === null || value === undefined || value === '') return fallback;
  const parsed = typeof value === 'number' ? value : Number(value);
  return Number.isFinite(parsed) ? parsed : fallback;
};

export const clamp = (value: number, min: number, max: number): number => Math.min(Math.max(value, min), max);

export const range = (start: number, end: number): number[] => {
  const length = end - start + 1;
  return Array.from({ length: Math.max(length, 0) }, (_, idx) => idx + start);
};

export const roundTo = (value: number, digits = 2, type: RoundType = 'round'): number => {
  const factor = 10 ** digits;
  return Math[type](value * factor) / factor;
};

/** `1234567` -> `1,234,567` */
export const formatNumber = (value: Numeric, options: Intl.NumberFormatOptions = {}, locale = 'en-US'): string => {
  if (value === null || value === undefined || value === '') return EMPTY_PLACEHOLDER;
  return new Intl.NumberFormat(locale, { maximumFractionDigits: 2, ...options }).format(toNumber(value));
};

/** `1234567` -> `1.23M` */
export const formatCompactNumber = (value: Numeric, digits = 2): string => {
  if (value === null || value === undefined || value === '') return EMPTY_PLACEHOLDER;

  const num = toNumber(value);
  const abs = Math.abs(num);
  const item = [...NUMBER_FORMAT_LOOK_UP].reverse().find((lookup) => abs >= lookup.value);

  if (!item) return '0';

  return `${(num / item.value).toFixed(digits).replace(/\.0+$|(\.\d*[1-9])0+$/, '$1')}${item.symbol}`;
};

/** `1234.5` -> `$1,234.50` */
export const formatCurrency = (value: Numeric, currency = 'USD', locale = 'en-US'): string => {
  if (value === null || value === undefined || value === '') return EMPTY_PLACEHOLDER;
  return new Intl.NumberFormat(locale, { style: 'currency', currency }).format(toNumber(value));
};

/** `0.256` -> `25.6%` (pass `isRatio=false` when the value is already a percentage) */
export const formatPercent = (value: Numeric, digits = 2, isRatio = true): string => {
  if (value === null || value === undefined || value === '') return EMPTY_PLACEHOLDER;
  const percent = isRatio ? toNumber(value) * 100 : toNumber(value);
  return `${roundTo(percent, digits)}%`;
};

export const formatBytes = (bytes: number, digits = 1): string => {
  if (bytes <= 0) return '0 B';
  const units = ['B', 'KB', 'MB', 'GB', 'TB'];
  const idx = Math.min(Math.floor(Math.log(bytes) / Math.log(1024)), units.length - 1);
  return `${(bytes / 1024 ** idx).toFixed(digits).replace(/\.0+$/, '')} ${units[idx]}`;
};
