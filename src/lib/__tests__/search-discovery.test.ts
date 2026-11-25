import robots from '@/app/robots';
import sitemap from '@/app/sitemap';

const environment = vi.hoisted(() => ({ production: false }));

vi.mock('@/constants/env', () => ({
  env: { APP_URL: 'https://example.test' },
  get isProductionEnv() {
    return environment.production;
  },
}));

describe('search discovery', () => {
  it('publishes only indexable canonical URLs and pairs their locale alternates', () => {
    environment.production = true;
    const urls = sitemap();

    expect(urls.map(({ url }) => url)).toEqual(['https://example.test/', 'https://example.test/vi']);
    for (const entry of urls) {
      expect(entry.alternates?.languages).toEqual({
        en: 'https://example.test/',
        vi: 'https://example.test/vi',
        'x-default': 'https://example.test/',
      });
      expect(entry.lastModified).toBeUndefined();
    }
    expect(robots().sitemap).toBe('https://example.test/sitemap.xml');
  });

  it('omits the sitemap from non-production discovery', () => {
    environment.production = false;

    expect(sitemap()).toEqual([]);
    expect(robots()).toEqual({ rules: { userAgent: '*', disallow: '/' } });
  });
});
