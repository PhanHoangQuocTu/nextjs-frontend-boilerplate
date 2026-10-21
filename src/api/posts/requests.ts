import { buildRoute } from '@/constants/routes';
import { getApiRequestClient } from '../axios';
import { POST_KEYS } from './keys';
import type { ICreatePostBody, IGetPostsParams, IPost } from './type';

export const getPostsRequest = async (params?: IGetPostsParams): Promise<IPost[]> => {
  // JSONPlaceholder paginates with `_page` / `_limit`; map our generic params here, in one place.
  const { data } = await getApiRequestClient().get<IPost[]>(POST_KEYS.GET_POSTS, {
    params: { _page: params?.page, _limit: params?.limit },
  });

  return data;
};

export const getPostDetailRequest = async (id: number | string): Promise<IPost> => {
  const { data } = await getApiRequestClient().get<IPost>(buildRoute(POST_KEYS.GET_POST_DETAIL, { id }));

  return data;
};

export const createPostRequest = async (body: ICreatePostBody): Promise<IPost> => {
  const { data } = await getApiRequestClient().post<IPost>(POST_KEYS.GET_POSTS, body);

  return data;
};
