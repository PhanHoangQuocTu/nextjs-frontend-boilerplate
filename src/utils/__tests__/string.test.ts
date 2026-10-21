import { capitalize, isEmpty, slugify, truncate, truncateMiddle } from '../string';

describe('string utils', () => {
  it('capitalize / truncate / truncateMiddle', () => {
    expect(capitalize('hello')).toBe('Hello');
    expect(truncate('abcdefghij', 6)).toBe('abc...');
    expect(truncate('abc', 6)).toBe('abc');
    expect(truncateMiddle('0x1234567890abcdef', 6, 4)).toBe('0x1234...cdef');
  });

  it('slugify strips diacritics', () => {
    expect(slugify('Xin chào Việt Nam!')).toBe('xin-chao-viet-nam');
  });

  it('isEmpty', () => {
    expect(isEmpty('')).toBe(true);
    expect(isEmpty([])).toBe(true);
    expect(isEmpty({})).toBe(true);
    expect(isEmpty(0)).toBe(false);
    expect(isEmpty('a')).toBe(false);
  });
});
