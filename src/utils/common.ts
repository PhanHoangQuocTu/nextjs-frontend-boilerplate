export const sleep = (ms: number) => new Promise<void>((resolve) => setTimeout(resolve, ms));

export const noop = (): void => undefined;

/** Run `fn`, returning `[error, result]` instead of throwing. */
export const tryCatch = async <T>(fn: () => Promise<T>): Promise<[unknown, undefined] | [undefined, T]> => {
  try {
    return [undefined, await fn()];
  } catch (error) {
    return [error, undefined];
  }
};
