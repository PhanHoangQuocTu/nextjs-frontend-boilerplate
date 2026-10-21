import type { AxiosError, InternalAxiosRequestConfig } from 'axios';
import axios, { AxiosHeaders } from 'axios';

import { useSessionStore } from '@/stores';
import { createErrorInterceptor, normalizeApiError, requestInterceptor, setRefreshTokenHandler } from '../interceptors';

const makeConfig = (): InternalAxiosRequestConfig => ({ headers: new AxiosHeaders() }) as InternalAxiosRequestConfig;

const make401 = (config: InternalAxiosRequestConfig) =>
  new axios.AxiosError('Unauthorized', '401', config, undefined, {
    status: 401,
    statusText: 'Unauthorized',
    headers: {},
    config,
    data: {},
  });

describe('axios interceptors', () => {
  beforeEach(() => {
    useSessionStore.setState({ accessToken: '', refreshToken: '', user: null });
    setRefreshTokenHandler(null);
  });

  it('adds the bearer token', () => {
    useSessionStore.setState({ accessToken: 'abc' });

    expect(requestInterceptor(makeConfig()).headers.get('Authorization')).toBe('Bearer abc');
  });

  it('normalises axios errors', () => {
    const error = new axios.AxiosError('Boom', 'ERR', undefined, undefined, {
      status: 400,
      statusText: 'Bad Request',
      headers: {},
      config: makeConfig(),
      data: { meta: { code: 4001, message: 'Invalid input' } },
    });

    expect(normalizeApiError(error)).toMatchObject({ status: 400, message: 'Invalid input', code: 4001 });
  });

  it('refreshes once on 401 and retries the request', async () => {
    useSessionStore.setState({ accessToken: 'old', refreshToken: 'r1' });
    const handler = vi.fn().mockResolvedValue({ accessToken: 'new', refreshToken: 'r2' });
    setRefreshTokenHandler(handler);
    const instance = vi.fn().mockResolvedValue({ data: 'retried' });
    const config = makeConfig();

    const result = await createErrorInterceptor(instance as never)(make401(config) as AxiosError);

    expect(handler).toHaveBeenCalledWith('r1');
    expect(useSessionStore.getState().accessToken).toBe('new');
    expect(instance).toHaveBeenCalledTimes(1);
    expect(result).toEqual({ data: 'retried' });
  });

  it('clears the session and rejects when no refresh handler is set', async () => {
    useSessionStore.setState({ accessToken: 'old', refreshToken: 'r1' });
    const config = makeConfig();

    await expect(createErrorInterceptor(vi.fn() as never)(make401(config) as AxiosError)).rejects.toMatchObject({
      status: 401,
    });
    expect(useSessionStore.getState().accessToken).toBe('');
  });
});
