import { useMutation, useQueryClient } from '@tanstack/react-query';

import type { IApiError } from '@/types/type';
import { postQueryKeys } from './keys';
import { createPostRequest } from './requests';
import type { ICreatePostBody, IPost } from './type';

export const useCreatePostMutation = () => {
  const queryClient = useQueryClient();

  return useMutation<IPost, IApiError, ICreatePostBody>({
    mutationFn: createPostRequest,
    onSuccess: () => queryClient.invalidateQueries({ queryKey: postQueryKeys.all }),
  });
};
