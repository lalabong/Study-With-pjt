import { useMutation, useQueryClient } from '@tanstack/react-query';
import { AxiosError } from 'axios';
import { toast } from 'react-toastify';

import { postSendFriendRequest } from '@api/friend/postSendFriendRequest';

import { FRIEND_ERROR_MESSAGES, FRIEND_SUCCESS_MESSAGES } from '@constants/index';
import { FRIEND_QUERY_KEYS } from '@constants/queryKeys';

interface PostSendFriendRequestData {
  userCuid: string;
  friendCuid: string;
}

export const useSendFriendRequestMutation = () => {
  const queryClient = useQueryClient();

  return useMutation({
    mutationFn: async (data: PostSendFriendRequestData) => {
      const response = await postSendFriendRequest(data);
      return response.data;
    },
    onSuccess: (_, variables) => {
      toast.success(FRIEND_SUCCESS_MESSAGES.SEND_FRIEND_REQUEST_SUCCESS);

      // Invalidate search results to update friend status
      queryClient.invalidateQueries({
        queryKey: [FRIEND_QUERY_KEYS.SEARCH_USERS],
      });

      // Invalidate received friend requests for the target user (they would see the new request)
      queryClient.invalidateQueries({
        queryKey: [FRIEND_QUERY_KEYS.RECEIVED_FRIEND_REQUESTS, variables.friendCuid],
      });
    },
    onError: (error: unknown) => {
      if (error instanceof AxiosError) {
        const errorCode = error?.response?.data?.errorCode;

        switch (errorCode) {
          case 6003:
            toast.error(FRIEND_ERROR_MESSAGES.SELF_REQUEST_NOT_ALLOWED);
            return;
          case 6004:
            toast.error(FRIEND_ERROR_MESSAGES.ALREADY_FRIENDS);
            return;
          case 6002:
            toast.error(FRIEND_ERROR_MESSAGES.REQUEST_ALREADY_SENT);
            return;
          case 3001:
            toast.error('사용자를 찾을 수 없습니다.');
            return;
          default:
            toast.error(FRIEND_ERROR_MESSAGES.SEND_FRIEND_REQUEST_FAILED);
            console.error('친구 요청 전송 실패:', error);
        }
      } else {
        toast.error(FRIEND_ERROR_MESSAGES.SEND_FRIEND_REQUEST_FAILED);
        console.error('친구 요청 전송 실패:', error);
      }
    },
  });
};
