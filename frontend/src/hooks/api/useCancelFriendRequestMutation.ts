import { useMutation, useQueryClient } from '@tanstack/react-query';
import { AxiosError } from 'axios';
import { toast } from 'react-toastify';

import { deleteCancelFriendRequest } from '@api/friend/deleteCancelFriendRequest';

import { FRIEND_ERROR_MESSAGES, FRIEND_SUCCESS_MESSAGES } from '@constants/index';
import { FRIEND_QUERY_KEYS } from '@constants/queryKeys';

interface DeleteCancelFriendRequestData {
  userCuid: string;
  friendCuid: string;
}

export const useCancelFriendRequestMutation = () => {
  const queryClient = useQueryClient();

  return useMutation({
    mutationFn: async (data: DeleteCancelFriendRequestData) => {
      const response = await deleteCancelFriendRequest(data);
      return response.data;
    },
    onSuccess: (_, variables) => {
      toast.success(FRIEND_SUCCESS_MESSAGES.CANCEL_FRIEND_REQUEST_SUCCESS);

      // Invalidate search results to update friend status
      queryClient.invalidateQueries({
        queryKey: [FRIEND_QUERY_KEYS.SEARCH_USERS],
      });

      // Invalidate received friend requests for the target user
      queryClient.invalidateQueries({
        queryKey: [FRIEND_QUERY_KEYS.RECEIVED_FRIEND_REQUESTS, variables.friendCuid],
      });
    },
    onError: (error: unknown) => {
      if (error instanceof AxiosError) {
        const errorCode = error?.response?.data?.errorCode;

        switch (errorCode) {
          case 6007:
            toast.error('본인의 친구 요청만 취소할 수 있습니다.');
            return;
          case 6005:
            toast.error('친구 요청을 찾을 수 없습니다.');
            return;
          case 6004:
            toast.error(FRIEND_ERROR_MESSAGES.ALREADY_FRIENDS);
            return;
          case 6008:
            toast.error('취소할 수 없는 친구 요청입니다.');
            return;
          default:
            toast.error(FRIEND_ERROR_MESSAGES.CANCEL_FRIEND_REQUEST_FAILED);
            console.error('친구 요청 취소 실패:', error);
        }
      } else {
        toast.error(FRIEND_ERROR_MESSAGES.CANCEL_FRIEND_REQUEST_FAILED);
        console.error('친구 요청 취소 실패:', error);
      }
    },
  });
};
