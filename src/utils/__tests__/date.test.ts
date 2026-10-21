import { DATE_FORMAT, formatDate, formatDuration } from '../date';

describe('date utils', () => {
  it('formatDate handles empty and invalid input', () => {
    expect(formatDate(null)).toBe('--');
    expect(formatDate('not a date')).toBe('--');
    expect(formatDate('2024-03-05T10:00:00', DATE_FORMAT.DATE)).toBe('2024-03-05');
  });

  it('formatDuration', () => {
    expect(formatDuration(93784)).toBe('1d 02h 03m 04s');
    expect(formatDuration(65)).toBe('1m 05s');
    expect(formatDuration(0)).toBe('0s');
  });
});
