import { useMutation, useQueryClient } from '@tanstack/react-query';
import { AxiosError } from 'axios';
import { toast } from 'react-toastify';

import { deleteRejectFriendRequest } from '@api/friend/deleteRejectFriendRequest';

import { FRIEND_ERROR_MESSAGES, FRIEND_SUCCESS_MESSAGES } from '@constants/index';
import { FRIEND_QUERY_KEYS } from '@constants/queryKeys';

interface DeleteRejectFriendRequestData {
  userCuid: string;
  friendCuid: string;
}

export const useRejectFriendRequestMutation = () => {
  const queryClient = useQueryClient();

  return useMutation({
    mutationFn: async (data: DeleteRejectFriendRequestData) => {
      const response = await deleteRejectFriendRequest(data);
      return response.data;
    },
    onSuccess: (_, variables) => {
      toast.success(FRIEND_SUCCESS_MESSAGES.REJECT_FRIEND_REQUEST_SUCCESS);

      // Invalidate received friend requests to remove rejected request
      queryClient.invalidateQueries({
        queryKey: [FRIEND_QUERY_KEYS.RECEIVED_FRIEND_REQUESTS, variables.userCuid],
      });

      // Invalidate search results to update friend status
      queryClient.invalidateQueries({
        queryKey: [FRIEND_QUERY_KEYS.SEARCH_USERS],
      });
    },
    onError: (error: unknown) => {
      if (error instanceof AxiosError) {
        const errorCode = error?.response?.data?.errorCode;

        switch (errorCode) {
          case 6001:
            toast.error('필수 항목을 입력해주세요.');
            return;
          case 6004:
            toast.error(FRIEND_ERROR_MESSAGES.ALREADY_FRIENDS);
            return;
          case 6005:
            toast.error('친구 요청을 찾을 수 없습니다.');
            return;
          default:
            toast.error(FRIEND_ERROR_MESSAGES.REJECT_FRIEND_REQUEST_FAILED);
            console.error('친구 요청 거절 실패:', error);
        }
      } else {
        toast.error(FRIEND_ERROR_MESSAGES.REJECT_FRIEND_REQUEST_FAILED);
        console.error('친구 요청 거절 실패:', error);
      }
    },
  });
};
