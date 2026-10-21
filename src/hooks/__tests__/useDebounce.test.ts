import { act, renderHook } from '@testing-library/react';

import { useDebounce } from '../useDebounce';

describe('useDebounce', () => {
  beforeEach(() => vi.useFakeTimers());
  afterEach(() => vi.useRealTimers());

  it('updates the value only after the delay', () => {
    const { result, rerender } = renderHook(({ value }) => useDebounce(value, 300), { initialProps: { value: 'a' } });

    rerender({ value: 'b' });
    expect(result.current).toBe('a');

    act(() => vi.advanceTimersByTime(300));
    expect(result.current).toBe('b');
  });
});
