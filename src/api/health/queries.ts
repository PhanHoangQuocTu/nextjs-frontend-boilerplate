import { type UseQueryOptions, useQuery } from '@tanstack/react-query';

import type { IApiError } from '@/types/type';
import { healthQueryKeys } from './keys';
import { getHealthRequest } from './requests';
import type { IHealthResult } from './type';

type UseHealthQueryOptions = Partial<Omit<UseQueryOptions<IHealthResult, IApiError>, 'queryKey' | 'queryFn'>>;

export const useHealthQuery = (options: UseHealthQueryOptions = {}) =>
  useQuery<IHealthResult, IApiError>({
    queryKey: healthQueryKeys.all,
    queryFn: getHealthRequest,
    ...options,
  });
