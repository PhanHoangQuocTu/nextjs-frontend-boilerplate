import type { NextRequest } from 'next/server';

import { request } from '@/api/axios';
import { POST_KEYS } from '@/api/posts/keys';
import { buildRoute } from '@/constants/routes';
import { createApiErrorResponse } from '@/utils/api-error';

type Context = { params: Promise<{ id: string }> };

export async function GET(req: NextRequest, { params }: Context) {
  try {
    const { id } = await params;
    const response = await request.get(buildRoute(POST_KEYS.GET_POST_DETAIL, { id }), {
      headers: { Authorization: req.headers.get('authorization') ?? undefined },
    });

    return Response.json(response.data);
  } catch (error) {
    return createApiErrorResponse(error, 'Failed to fetch post');
  }
}
