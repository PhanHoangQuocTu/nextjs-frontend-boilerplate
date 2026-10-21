import {
  breadcrumbJsonLd,
  buildMetadata,
  getAbsoluteUrl,
  getLanguageAlternates,
  getLocalizedPath,
  getRobots,
  webSiteJsonLd,
} from '../seo';

vi.mock('@/hooks/useTranslationsServer', () => ({
  useTranslationsServer: async () => ({ t: (key: string) => (key === 'siteName' ? 'Boilerplate' : key), locale: 'en' }),
}));

describe('seo helpers', () => {
  it('prefixes only non-default locales', () => {
    expect(getLocalizedPath('en', '/health')).toBe('/health');
    expect(getLocalizedPath('vi', '/health')).toBe('/vi/health');
    expect(getLocalizedPath('en')).toBe('/');
    expect(getLocalizedPath('vi')).toBe('/vi');
  });

  it('builds absolute URLs from NEXT_PUBLIC_APP_URL', () => {
    expect(getAbsoluteUrl('vi', '/health')).toBe('http://localhost:3000/vi/health');
  });

  it('lists every locale plus x-default in hreflang alternates', () => {
    expect(getLanguageAlternates('/health')).toEqual({
      en: 'http://localhost:3000/health',
      vi: 'http://localhost:3000/vi/health',
      'x-default': 'http://localhost:3000/health',
    });
  });

  it('never indexes non-production or noIndex pages', () => {
    expect(getRobots(true)).toMatchObject({ index: false, follow: false });
    // The test environment is not production.
    expect(getRobots()).toMatchObject({ index: false, follow: false });
  });

  it('builds complete page metadata', async () => {
    const metadata = await buildMetadata({ locale: 'vi', path: '/health', title: 'Health', description: 'desc' });

    expect(metadata.alternates?.canonical).toBe('http://localhost:3000/vi/health');
    expect(metadata.openGraph).toMatchObject({
      title: 'Health | Boilerplate',
      locale: 'vi_VN',
      siteName: 'Boilerplate',
    });
    expect(metadata.twitter).toMatchObject({ card: 'summary_large_image', title: 'Health | Boilerplate' });
  });

  it('keeps the absolute title untouched', async () => {
    const metadata = await buildMetadata({ locale: 'en', title: { absolute: 'Home' }, description: 'desc' });

    expect(metadata.openGraph).toMatchObject({ title: 'Home' });
  });

  it('creates JSON-LD documents', () => {
    expect(webSiteJsonLd({ locale: 'en', name: 'Site', description: 'd' })).toMatchObject({
      '@type': 'WebSite',
      inLanguage: 'en',
    });
    expect(breadcrumbJsonLd([{ name: 'Home', url: 'u' }]).itemListElement[0]).toMatchObject({
      position: 1,
      name: 'Home',
    });
  });
});
