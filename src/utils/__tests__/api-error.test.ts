import { createApiErrorResponse, getApiErrorMessage, getApiErrorStatus } from '../api-error';

describe('api-error utils', () => {
  it('reads status from the normalised error', () => {
    expect(getApiErrorStatus({ status: 404 })).toBe(404);
    expect(getApiErrorStatus({ code: 422 })).toBe(422);
    expect(getApiErrorStatus(new Error('x'))).toBe(500);
  });

  it('reads message with fallback', () => {
    expect(getApiErrorMessage({ message: 'Nope' })).toBe('Nope');
    expect(getApiErrorMessage(undefined, 'Fallback')).toBe('Fallback');
  });

  it('builds a Response', async () => {
    const res = createApiErrorResponse({ status: 401, message: 'Unauthorized' });
    expect(res.status).toBe(401);
    expect(await res.json()).toEqual({ message: 'Unauthorized' });
  });
});
