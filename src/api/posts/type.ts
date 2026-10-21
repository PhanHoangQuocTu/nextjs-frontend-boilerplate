import type { IPaginationParams } from '@/types/type';

export interface IPost {
  id: number;
  userId: number;
  title: string;
  body: string;
}

export type IGetPostsParams = Pick<IPaginationParams, 'page' | 'limit'>;

export type ICreatePostBody = Pick<IPost, 'title' | 'body' | 'userId'>;
