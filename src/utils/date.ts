import dayjs from 'dayjs';
import relativeTime from 'dayjs/plugin/relativeTime';
import utc from 'dayjs/plugin/utc';

import { EMPTY_PLACEHOLDER } from '@/constants/const';

dayjs.extend(utc);
dayjs.extend(relativeTime);

export const DATE_FORMAT = {
  DATE: 'YYYY-MM-DD',
  DISPLAY_DATE: 'MMM DD, YYYY',
  DISPLAY_DATE_TIME: 'MMM DD, YYYY HH:mm',
  TIME: 'HH:mm:ss',
} as const;

type DateInput = string | number | Date | dayjs.Dayjs | null | undefined;

export const formatDate = (value: DateInput, format: string = DATE_FORMAT.DISPLAY_DATE): string => {
  if (value === null || value === undefined || value === '') return EMPTY_PLACEHOLDER;
  const parsed = dayjs(value);
  return parsed.isValid() ? parsed.format(format) : EMPTY_PLACEHOLDER;
};

export const formatDateUtc = (value: DateInput, format: string = DATE_FORMAT.DISPLAY_DATE_TIME): string => {
  if (value === null || value === undefined || value === '') return EMPTY_PLACEHOLDER;
  const parsed = dayjs.utc(value);
  return parsed.isValid() ? parsed.format(format) : EMPTY_PLACEHOLDER;
};

/** `2 hours ago` */
export const timeFromNow = (value: DateInput): string => {
  if (value === null || value === undefined || value === '') return EMPTY_PLACEHOLDER;
  const parsed = dayjs(value);
  return parsed.isValid() ? parsed.fromNow() : EMPTY_PLACEHOLDER;
};

/** `93784` seconds -> `1d 02h 03m 04s` (leading zero units are dropped: `65` -> `1m 05s`) */
export const formatDuration = (seconds: number): string => {
  const total = Math.max(0, Math.floor(seconds));
  const units = [
    { value: Math.floor(total / 86400), suffix: 'd' },
    { value: Math.floor((total % 86400) / 3600), suffix: 'h' },
    { value: Math.floor((total % 3600) / 60), suffix: 'm' },
    { value: total % 60, suffix: 's' },
  ];
  const firstNonZero = units.findIndex((unit) => unit.value > 0);
  const firstIdx = firstNonZero === -1 ? units.length - 1 : firstNonZero;

  return units
    .slice(firstIdx)
    .map(({ value, suffix }, idx) => `${idx === 0 ? value : String(value).padStart(2, '0')}${suffix}`)
    .join(' ');
};

export { dayjs };
