export const capitalize = (value: string): string => (value ? value.charAt(0).toUpperCase() + value.slice(1) : value);

export const truncate = (value: string, maxLength: number, suffix = '...'): string =>
  value.length > maxLength ? `${value.slice(0, Math.max(0, maxLength - suffix.length))}${suffix}` : value;

/** Shorten the middle of long identifiers (hashes, ids, emails). */
export const truncateMiddle = (value: string, head = 6, tail = 4, separator = '...'): string =>
  value.length <= head + tail + separator.length ? value : `${value.slice(0, head)}${separator}${value.slice(-tail)}`;

export const slugify = (value: string): string =>
  value
    .normalize('NFD')
    .replace(/[\u0300-\u036f]/g, '')
    .toLowerCase()
    .trim()
    .replace(/[^a-z0-9]+/g, '-')
    .replace(/^-+|-+$/g, '');

export const isEmpty = (value: unknown): boolean =>
  value === null ||
  value === undefined ||
  (typeof value === 'string' && value.trim() === '') ||
  (Array.isArray(value) && value.length === 0) ||
  (typeof value === 'object' && value !== null && !Array.isArray(value) && Object.keys(value).length === 0);
