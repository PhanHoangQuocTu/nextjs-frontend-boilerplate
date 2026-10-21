import { requestInternal } from '../axios';
import { HEALTH_KEYS } from './keys';
import type { IHealthResponse, IHealthResult } from './type';

export const getHealthRequest = async (): Promise<IHealthResult> => {
  const startedAt = performance.now();
  const { data } = await requestInternal.get<IHealthResponse>(HEALTH_KEYS.GET_HEALTH);

  return { ...data, latencyMs: Math.round(performance.now() - startedAt) };
};
