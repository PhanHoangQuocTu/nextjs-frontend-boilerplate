export const groupBy = <T, K extends PropertyKey>(items: readonly T[], getKey: (item: T) => K): Record<K, T[]> =>
  items.reduce(
    (acc, item) => {
      const key = getKey(item);
      if (!acc[key]) acc[key] = [];
      acc[key].push(item);
      return acc;
    },
    {} as Record<K, T[]>
  );

export const uniqueBy = <T>(items: readonly T[], getKey: (item: T) => unknown): T[] => {
  const seen = new Set<unknown>();
  return items.filter((item) => {
    const key = getKey(item);
    if (seen.has(key)) return false;
    seen.add(key);
    return true;
  });
};

export const chunk = <T>(items: readonly T[], size: number): T[][] => {
  if (size <= 0) return [[...items]];
  const result: T[][] = [];
  for (let i = 0; i < items.length; i += size) result.push(items.slice(i, i + size));
  return result;
};
