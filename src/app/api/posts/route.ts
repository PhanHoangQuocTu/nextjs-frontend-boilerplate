import type { NextRequest } from 'next/server';

import { request } from '@/api/axios';
import { POST_KEYS } from '@/api/posts/keys';
import { createApiErrorResponse } from '@/utils/api-error';

/**
 * BFF proxy example.
 *
 * Browser -> /api/posts (this handler) -> backend /posts
 *
 * Why proxy: the real backend URL stays on the server, there is no CORS, and the
 * response can be reshaped before it reaches the client.
 */
export async function GET(req: NextRequest) {
  try {
    const response = await request.get(POST_KEYS.GET_POSTS, {
      params: Object.fromEntries(req.nextUrl.searchParams),
      headers: { Authorization: req.headers.get('authorization') ?? undefined },
    });

    return Response.json(response.data);
  } catch (error) {
    return createApiErrorResponse(error, 'Failed to fetch posts');
  }
}

export async function POST(req: NextRequest) {
  try {
    const response = await request.post(POST_KEYS.GET_POSTS, await req.json(), {
      headers: { Authorization: req.headers.get('authorization') ?? undefined },
    });

    return Response.json(response.data, { status: response.status });
  } catch (error) {
    return createApiErrorResponse(error, 'Failed to create post');
  }
}
