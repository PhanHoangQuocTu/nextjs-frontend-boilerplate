import { z } from 'zod';

import type { ICreatePostBody } from './type';

const nonBlankText = z.string().refine((value) => value.trim().length > 0);

export const createPostSchema: z.ZodType<ICreatePostBody> = z.object({
  title: nonBlankText,
  body: nonBlankText,
  userId: z.int().positive(),
});

export const positiveIntegerParam = z.string().regex(/^\d+$/).transform(Number).pipe(z.int().positive());
