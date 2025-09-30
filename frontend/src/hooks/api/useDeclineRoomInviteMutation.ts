'use client';

import { useMutation, useQueryClient } from '@tanstack/react-query';
import { AxiosError } from 'axios';
import { toast } from 'react-toastify';

import { postDeclineRoomInvite } from '@api/room/postDeclineRoomInvite';

import { ROOM_SUCCESS_MESSAGES } from '@constants/index';
import { ROOM_QUERY_KEYS } from '@constants/queryKeys';

export const useDeclineRoomInviteMutation = () => {
  const queryClient = useQueryClient();

  return useMutation({
    mutationFn: (inviteId: string) => postDeclineRoomInvite(inviteId),
    onSuccess: () => {
      toast.success(ROOM_SUCCESS_MESSAGES.DECLINE_INVITE);

      // 받은 초대 목록 무효화
      queryClient.invalidateQueries({ queryKey: [ROOM_QUERY_KEYS.RECEIVED_ROOM_INVITES] });
    },
    onError: (error: AxiosError<{ errorCode?: number }>) => {
      const errorCode = error.response?.data?.errorCode;

      switch (errorCode) {
        case 5004:
          toast.error('방 초대를 찾을 수 없습니다.');
          break;
        case 5008:
          toast.error('방 초대 거절 권한이 없습니다.');
          break;
        default:
          toast.error('방 초대 거절에 실패했습니다.');
          console.error('방 초대 거절 중 오류 발생:', error);
      }

      // 오류 발생시에도 초대 목록 새로고침
      queryClient.invalidateQueries({ queryKey: [ROOM_QUERY_KEYS.RECEIVED_ROOM_INVITES] });
    },
  });
};
