import { LOCALES } from '@/i18n/routing';
import { messages } from '..';

type Json = { [key: string]: Json | string };

const flatten = (obj: Json, prefix = ''): Record<string, string> =>
  Object.entries(obj).reduce<Record<string, string>>((acc, [key, value]) => {
    if (typeof value === 'string') acc[`${prefix}${key}`] = value;
    else Object.assign(acc, flatten(value, `${prefix}${key}.`));
    return acc;
  }, {});

/** ICU argument names, e.g. `{seconds}` in "Refresh every {seconds}s". */
const placeholders = (value: string) => [...value.matchAll(/\{(\w+)[,}]/g)].map((match) => match[1]).sort();

const reference = flatten(messages.en as Json);

describe('translation files', () => {
  it.each(LOCALES.filter((locale) => locale !== 'en'))('"%s" has exactly the same keys as English', (locale) => {
    expect(Object.keys(flatten(messages[locale] as Json)).sort()).toEqual(Object.keys(reference).sort());
  });

  it.each(LOCALES.filter((locale) => locale !== 'en'))('"%s" uses the same ICU placeholders as English', (locale) => {
    const translated = flatten(messages[locale] as Json);

    for (const [key, value] of Object.entries(reference)) {
      expect({ key, placeholders: placeholders(translated[key]) }).toEqual({ key, placeholders: placeholders(value) });
    }
  });

  it('has no empty strings', () => {
    for (const locale of LOCALES) {
      for (const [key, value] of Object.entries(flatten(messages[locale] as Json))) {
        expect({ locale, key, empty: value.trim() === '' }).toEqual({ locale, key, empty: false });
      }
    }
  });
});
