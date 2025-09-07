'use client';

import { useRouter } from 'next/navigation';

import { useMutation } from '@tanstack/react-query';
import { AxiosError } from 'axios';
import { toast } from 'react-toastify';

import { deleteLeaveRoom } from '@api/room/deleteLeaveRoom';

import {
  ROOM_ERROR_MESSAGES,
  USER_ERROR_MESSAGES,
  ROOM_SUCCESS_MESSAGES,
  ROOM_QUERY_KEYS,
} from '@constants/index';

import { useAuthStore } from '@stores/authStore';
import { useRoomStore } from '@stores/roomStore';

import { getServerQueryClient } from '@lib/react-query/getServerQueryClient';

export const useLeaveRoomMutation = () => {
  const router = useRouter();
  const queryClient = getServerQueryClient();
  const { leaveRoom } = useRoomStore();
  const user = useAuthStore((state) => state.user);

  return useMutation({
    mutationFn: (roomId: string) => deleteLeaveRoom({ roomId }),
    onSuccess: (_, roomId) => {
      toast.success(ROOM_SUCCESS_MESSAGES.LEAVE_ROOM);

      queryClient.invalidateQueries({
        queryKey: [ROOM_QUERY_KEYS.ROOM_INFO, roomId],
      });
      queryClient.invalidateQueries({
        queryKey: [ROOM_QUERY_KEYS.ROOM_PARTICIPANTS, roomId],
      });

      leaveRoom();

      if (user?.userId) {
        router.push(`/user/${user.userId}`);
      } else {
        router.push('/');
      }
    },
    onError: (error: AxiosError<{ errorCode?: number }>) => {
      const errorCode = error.response?.data?.errorCode;

      switch (errorCode) {
        case 3006:
          toast.error(USER_ERROR_MESSAGES.UNAUTHORIZED);
          break;
        case 5001:
          toast.error(ROOM_ERROR_MESSAGES.ROOM_NOT_FOUND);
          break;
        case 5003:
          toast.error(ROOM_ERROR_MESSAGES.PARTICIPANT_NOT_FOUND);
          break;
        default:
          toast.error(ROOM_ERROR_MESSAGES.LEAVE_ROOM_FAILED);
          console.error('방 나가기 중 오류 발생:', error);
      }
    },
  });
};
