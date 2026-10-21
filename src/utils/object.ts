export const omit = <T extends object, K extends keyof T>(obj: T, keys: readonly K[]): Omit<T, K> => {
  const clone = { ...obj };
  for (const key of keys) delete clone[key];
  return clone;
};

export const pick = <T extends object, K extends keyof T>(obj: T, keys: readonly K[]): Pick<T, K> => {
  const result = {} as Pick<T, K>;
  for (const key of keys) if (key in obj) result[key] = obj[key];
  return result;
};

/** Drop `undefined`, `null` and empty-string values (handy before building a query string). */
export const compact = <T extends Record<string, unknown>>(obj: T): Partial<T> =>
  Object.fromEntries(
    Object.entries(obj).filter(([, value]) => value !== undefined && value !== null && value !== '')
  ) as Partial<T>;

export const safeJsonParse = <T>(value: string | null | undefined, fallback: T): T => {
  if (!value) return fallback;
  try {
    return JSON.parse(value) as T;
  } catch {
    return fallback;
  }
};

/** `{ page: 1, tags: ['a', 'b'] }` -> `page=1&tags=a&tags=b` */
export const toQueryString = (params: Record<string, unknown> = {}): string => {
  const search = new URLSearchParams();
  for (const [key, value] of Object.entries(compact(params))) {
    if (Array.isArray(value)) for (const item of value) search.append(key, String(item));
    else search.append(key, String(value));
  }
  return search.toString();
};
