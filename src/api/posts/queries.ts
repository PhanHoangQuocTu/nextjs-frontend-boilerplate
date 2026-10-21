import { keepPreviousData, useQuery } from '@tanstack/react-query';

import type { IApiError } from '@/types/type';
import { postQueryKeys } from './keys';
import { getPostDetailRequest, getPostsRequest } from './requests';
import type { IGetPostsParams, IPost } from './type';

export const usePostsQuery = (params?: IGetPostsParams) =>
  useQuery<IPost[], IApiError>({
    queryKey: postQueryKeys.list(params),
    queryFn: () => getPostsRequest(params),
    placeholderData: keepPreviousData,
  });

export const usePostDetailQuery = (id: number | string | undefined) =>
  useQuery<IPost, IApiError>({
    queryKey: postQueryKeys.detail(id ?? ''),
    queryFn: () => getPostDetailRequest(id as number | string),
    enabled: id !== undefined && id !== '',
  });
