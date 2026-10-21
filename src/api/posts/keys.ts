import type { IGetPostsParams } from './type';

/** Backend paths. The BFF mirrors them under `/api` (see `src/app/api/posts`). */
export const POST_KEYS = {
  GET_POSTS: '/posts',
  GET_POST_DETAIL: '/posts/:id',
} as const;

export const postQueryKeys = {
  all: ['posts'] as const,
  list: (params?: IGetPostsParams) => [...postQueryKeys.all, 'list', params] as const,
  detail: (id: number | string) => [...postQueryKeys.all, 'detail', id] as const,
};
