import { renderHook } from '@testing-library/react';
import { NextIntlClientProvider } from 'next-intl';
import type { ReactNode } from 'react';

import enCommon from '@/messages/en/common.json';
import viCommon from '@/messages/vi/common.json';
import { useTranslations } from '../useTranslations';

const EnglishWrapper = ({ children }: { children: ReactNode }) => (
  <NextIntlClientProvider locale='en' messages={{ common: enCommon }}>
    {children}
  </NextIntlClientProvider>
);

const VietnameseWrapper = ({ children }: { children: ReactNode }) => (
  <NextIntlClientProvider locale='vi' messages={{ common: viCommon }}>
    {children}
  </NextIntlClientProvider>
);

describe('useTranslations (client)', () => {
  it('returns typed translations and the locale', () => {
    const { result } = renderHook(() => useTranslations('common.actions'), { wrapper: EnglishWrapper });

    expect(result.current.locale).toBe('en');
    expect(result.current.t('retry')).toBe('Retry');
  });

  it('follows the active locale', () => {
    const { result } = renderHook(() => useTranslations('common.actions'), { wrapper: VietnameseWrapper });

    expect(result.current.locale).toBe('vi');
    expect(result.current.t('retry')).toBe('Thử lại');
  });
});
