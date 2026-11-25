import type { NextRequest } from 'next/server';

import { request } from '@/api/axios';
import { POST_KEYS } from '@/api/posts/keys';
import { createPostSchema, positiveIntegerParam } from '@/api/posts/schema';
import { HttpStatus } from '@/enums/enum';
import { createApiErrorResponse } from '@/utils/api-error';

/** BFF example. Remove this endpoint and the other posts demo files when integrating a real backend. */
export async function GET(req: NextRequest) {
  const params = req.nextUrl.searchParams;
  const pagination = [...params.getAll('_page'), ...params.getAll('_limit')];
  if (pagination.some((value) => !positiveIntegerParam.safeParse(value).success)) {
    return Response.json({ message: 'Page and limit must be positive integers' }, { status: HttpStatus.BAD_REQUEST });
  }

  try {
    const response = await request.get(POST_KEYS.GET_POSTS, {
      params,
      headers: { Authorization: req.headers.get('authorization') ?? undefined },
    });

    return Response.json(response.data);
  } catch (error) {
    return createApiErrorResponse(error, 'Failed to fetch posts');
  }
}

export async function POST(req: NextRequest) {
  const body = createPostSchema.safeParse(await req.json().catch(() => null));
  if (!body.success) {
    return Response.json(
      { message: 'A title, body and positive user ID are required' },
      { status: HttpStatus.BAD_REQUEST }
    );
  }

  try {
    const response = await request.post(POST_KEYS.GET_POSTS, body.data, {
      headers: { Authorization: req.headers.get('authorization') ?? undefined },
    });

    return Response.json(response.data, { status: response.status });
  } catch (error) {
    return createApiErrorResponse(error, 'Failed to create post');
  }
}
