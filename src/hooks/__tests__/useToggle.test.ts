import { act, renderHook } from '@testing-library/react';

import { useToggle } from '../useToggle';

describe('useToggle', () => {
  it('toggles and sets explicitly', () => {
    const { result } = renderHook(() => useToggle(false));

    act(() => result.current[1]());
    expect(result.current[0]).toBe(true);

    act(() => result.current[1](false));
    expect(result.current[0]).toBe(false);
  });
});
