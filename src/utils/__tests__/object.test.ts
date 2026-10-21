import { compact, omit, pick, safeJsonParse, toQueryString } from '../object';

describe('object utils', () => {
  it('omit / pick', () => {
    expect(omit({ a: 1, b: 2 }, ['a'])).toEqual({ b: 2 });
    expect(pick({ a: 1, b: 2 }, ['a'])).toEqual({ a: 1 });
  });

  it('compact drops empty values', () => {
    expect(compact({ a: 1, b: '', c: null, d: undefined, e: 0 })).toEqual({ a: 1, e: 0 });
  });

  it('safeJsonParse', () => {
    expect(safeJsonParse('{"a":1}', {})).toEqual({ a: 1 });
    expect(safeJsonParse('nope', { ok: true })).toEqual({ ok: true });
  });

  it('toQueryString', () => {
    expect(toQueryString({ page: 1, q: '', tags: ['a', 'b'] })).toBe('page=1&tags=a&tags=b');
  });
});
