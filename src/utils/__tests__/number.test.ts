import {
  clamp,
  formatBytes,
  formatCompactNumber,
  formatCurrency,
  formatNumber,
  formatPercent,
  range,
  toNumber,
} from '../number';

describe('number utils', () => {
  it('toNumber falls back on invalid input', () => {
    expect(toNumber('12.5')).toBe(12.5);
    expect(toNumber('abc', 7)).toBe(7);
    expect(toNumber(null)).toBe(0);
  });

  it('clamp and range', () => {
    expect(clamp(15, 0, 10)).toBe(10);
    expect(clamp(-1, 0, 10)).toBe(0);
    expect(range(1, 4)).toEqual([1, 2, 3, 4]);
    expect(range(3, 1)).toEqual([]);
  });

  it('formatNumber', () => {
    expect(formatNumber(1234567.891)).toBe('1,234,567.89');
    expect(formatNumber(undefined)).toBe('--');
  });

  it('formatCompactNumber', () => {
    expect(formatCompactNumber(1_500)).toBe('1.5K');
    expect(formatCompactNumber(2_000_000)).toBe('2M');
    expect(formatCompactNumber(null)).toBe('--');
  });

  it('formatCurrency and formatPercent', () => {
    expect(formatCurrency(1234.5)).toBe('$1,234.50');
    expect(formatPercent(0.256)).toBe('25.6%');
    expect(formatPercent(12, 2, false)).toBe('12%');
  });

  it('formatBytes', () => {
    expect(formatBytes(0)).toBe('0 B');
    expect(formatBytes(1536)).toBe('1.5 KB');
  });
});
