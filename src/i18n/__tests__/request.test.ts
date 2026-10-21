import { beforeEach, describe, expect, it, vi } from 'vitest';

const { getRootLocale, notFound } = vi.hoisted(() => ({
  getRootLocale: vi.fn(),
  notFound: vi.fn((): never => {
    throw new Error('NOT_FOUND');
  }),
}));

vi.mock('next/root-params', () => ({ locale: getRootLocale }));
vi.mock('next/navigation', () => ({ notFound }));
vi.mock('next-intl/server', () => ({ getRequestConfig: (callback: unknown) => callback }));

import requestConfig from '../request';

const params = (locale?: string) => ({ locale, requestLocale: Promise.resolve(undefined) });

describe('request locale configuration', () => {
  beforeEach(() => vi.clearAllMocks());

  it.each(['en', 'vi'])('loads messages for root locale %s', async (locale) => {
    getRootLocale.mockResolvedValue(locale);
    const result = await requestConfig(params());
    expect(result.locale).toBe(locale);
    expect(result.messages).toBeDefined();
  });

  it('uses an explicit locale without reading root params', async () => {
    const result = await requestConfig(params('vi'));
    expect(result.locale).toBe('vi');
    expect(getRootLocale).not.toHaveBeenCalled();
  });

  it.each([undefined, 'fr'])('rejects unsupported root locale %s', async (locale) => {
    getRootLocale.mockResolvedValue(locale);
    await expect(requestConfig(params())).rejects.toThrow('NOT_FOUND');
  });
});
