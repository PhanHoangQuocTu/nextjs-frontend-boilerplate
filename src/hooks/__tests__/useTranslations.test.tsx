import { renderHook } from '@testing-library/react';
import { NextIntlClientProvider } from 'next-intl';
import type { ReactNode } from 'react';

import enCommon from '@/messages/en/common.json';
import viCommon from '@/messages/vi/common.json';
import type { Locale } from '@/i18n/routing';
import { useTranslations } from '../useTranslations';

const wrapper = (locale: Locale, common: object) =>
  function Wrapper({ children }: { children: ReactNode }) {
    return (
      <NextIntlClientProvider locale={locale} messages={{ common }}>
        {children}
      </NextIntlClientProvider>
    );
  };

describe('useTranslations (client)', () => {
  it('returns typed translations and the locale', () => {
    const { result } = renderHook(() => useTranslations('common.actions'), { wrapper: wrapper('en', enCommon) });

    expect(result.current.locale).toBe('en');
    expect(result.current.t('retry')).toBe('Retry');
  });

  it('follows the active locale', () => {
    const { result } = renderHook(() => useTranslations('common.actions'), { wrapper: wrapper('vi', viCommon) });

    expect(result.current.locale).toBe('vi');
    expect(result.current.t('retry')).toBe('Thử lại');
  });
});
