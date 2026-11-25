import type { NextRequest } from 'next/server';

import { request } from '@/api/axios';
import { POST_KEYS } from '@/api/posts/keys';
import { positiveIntegerParam } from '@/api/posts/schema';
import { buildRoute } from '@/constants/routes';
import { HttpStatus } from '@/enums/enum';
import { createApiErrorResponse } from '@/utils/api-error';

type Context = { params: Promise<{ id: string }> };

export async function GET(req: NextRequest, { params }: Context) {
  const { id } = await params;
  if (!positiveIntegerParam.safeParse(id).success) {
    return Response.json({ message: 'The post ID must be a positive integer' }, { status: HttpStatus.BAD_REQUEST });
  }

  try {
    const response = await request.get(buildRoute(POST_KEYS.GET_POST_DETAIL, { id }), {
      headers: { Authorization: req.headers.get('authorization') ?? undefined },
    });

    return Response.json(response.data);
  } catch (error) {
    return createApiErrorResponse(error, 'Failed to fetch post');
  }
}
