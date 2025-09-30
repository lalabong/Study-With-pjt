'use client';

import { useMutation, useQueryClient } from '@tanstack/react-query';
import { AxiosError } from 'axios';
import { toast } from 'react-toastify';

import { postSendRoomInvite, SendRoomInviteRequest } from '@api/room/postSendRoomInvite';

import { ROOM_SUCCESS_MESSAGES } from '@constants/index';
import { FRIEND_QUERY_KEYS } from '@constants/queryKeys';

export const useSendRoomInviteMutation = (roomId: string) => {
  const queryClient = useQueryClient();

  return useMutation({
    mutationFn: (data: SendRoomInviteRequest) => postSendRoomInvite(roomId, data),
    onSuccess: () => {
      toast.success(ROOM_SUCCESS_MESSAGES.SEND_INVITE);

      // 친구 목록 관련 쿼리 무효화 (필요시)
      queryClient.invalidateQueries({ queryKey: [FRIEND_QUERY_KEYS.FRIENDS] });
    },
    onError: (error: AxiosError<{ errorCode?: number }>) => {
      const errorCode = error.response?.data?.errorCode;

      switch (errorCode) {
        case 5003:
          toast.error('해당 방에 참여하고 있지 않습니다.');
          break;
        case 5005:
          toast.error('이미 해당 방에 초대했습니다.');
          break;
        case 5006:
          toast.error('이미 해당 방에 참여 중인 사용자입니다.');
          break;
        case 5007:
          toast.error('자기 자신을 초대할 수 없습니다.');
          break;
        case 3001:
          toast.error('사용자를 찾을 수 없습니다.');
          break;
        default:
          toast.error('방 초대 전송에 실패했습니다.');
          console.error('방 초대 전송 중 오류 발생:', error);
      }
    },
  });
};
