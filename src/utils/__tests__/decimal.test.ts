import BigNumber from 'bignumber.js';

describe('decimal arithmetic', () => {
  it('preserves precision for the four basic operations and large values', () => {
    expect(new BigNumber('0.1').plus('0.2').toString()).toBe('0.3');
    expect(new BigNumber('0.3').minus('0.1').toString()).toBe('0.2');
    expect(new BigNumber('0.1').times('0.2').toString()).toBe('0.02');
    expect(new BigNumber('0.3').dividedBy('0.1').toString()).toBe('3');
    expect(new BigNumber('9007199254740993.01').plus('0.09').toFixed()).toBe('9007199254740993.1');
  });

  it('allows domain-specific division and rounding without changing global settings', () => {
    const Money = BigNumber.clone({ DECIMAL_PLACES: 2, ROUNDING_MODE: BigNumber.ROUND_HALF_UP });
    expect(new Money('0.8').dividedBy('3').toFixed(2)).toBe('0.27');
    expect(new BigNumber(1).dividedBy(3).decimalPlaces()).toBeGreaterThan(2);
  });
});
