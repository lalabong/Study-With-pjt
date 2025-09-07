import { useMutation, useQueryClient } from '@tanstack/react-query';
import { AxiosError } from 'axios';
import { toast } from 'react-toastify';

import { deleteFriend } from '@api/friend/deleteFriend';

import { FRIEND_ERROR_MESSAGES, FRIEND_SUCCESS_MESSAGES } from '@constants/index';
import { FRIEND_QUERY_KEYS } from '@constants/queryKeys';

interface DeleteFriendData {
  userCuid: string;
  friendCuid: string;
}

export const useDeleteFriendMutation = () => {
  const queryClient = useQueryClient();

  return useMutation({
    mutationFn: async (data: DeleteFriendData) => {
      const response = await deleteFriend(data);
      return response.data;
    },
    onSuccess: (_, variables) => {
      toast.success(FRIEND_SUCCESS_MESSAGES.DELETE_FRIEND_SUCCESS);

      // Invalidate friends list for both users
      queryClient.invalidateQueries({
        queryKey: [FRIEND_QUERY_KEYS.FRIENDS, variables.userCuid],
      });
      queryClient.invalidateQueries({
        queryKey: [FRIEND_QUERY_KEYS.FRIENDS, variables.friendCuid],
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
          case 3001:
            toast.error('사용자를 찾을 수 없습니다.');
            return;
          default:
            toast.error(FRIEND_ERROR_MESSAGES.DELETE_FRIEND_FAILED);
            console.error('친구 삭제 실패:', error);
        }
      } else {
        toast.error(FRIEND_ERROR_MESSAGES.DELETE_FRIEND_FAILED);
        console.error('친구 삭제 실패:', error);
      }
    },
  });
};
