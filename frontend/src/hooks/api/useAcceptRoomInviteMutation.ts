'use client';

import { useRouter } from 'next/navigation';

import { useMutation, useQueryClient } from '@tanstack/react-query';
import { AxiosError } from 'axios';
import { toast } from 'react-toastify';

import { postAcceptRoomInvite } from '@api/room/postAcceptRoomInvite';

import { ROOM_SUCCESS_MESSAGES } from '@constants/index';
import { ROOM_QUERY_KEYS } from '@constants/queryKeys';

export const useAcceptRoomInviteMutation = () => {
  const router = useRouter();
  const queryClient = useQueryClient();

  return useMutation({
    mutationFn: (inviteId: string) => postAcceptRoomInvite(inviteId),
    onSuccess: (response) => {
      const roomId = response.data?.room.id;

      if (!roomId) {
        toast.error('방 정보를 가져올 수 없습니다.');
        return;
      }

      toast.success(ROOM_SUCCESS_MESSAGES.ACCEPT_INVITE);

      // 관련 쿼리들 무효화
      queryClient.invalidateQueries({ queryKey: [ROOM_QUERY_KEYS.RECEIVED_ROOM_INVITES] });
      queryClient.invalidateQueries({ queryKey: [ROOM_QUERY_KEYS.CURRENT_ROOM] });
      queryClient.invalidateQueries({ queryKey: [ROOM_QUERY_KEYS.ROOM_INFO, roomId] });

      router.push(`/study-room/${roomId}`);
    },
    onError: (error: AxiosError<{ errorCode?: number }>) => {
      const errorCode = error.response?.data?.errorCode;

      switch (errorCode) {
        case 5004:
          toast.error('방 초대를 찾을 수 없습니다.');
          break;
        case 5008:
          toast.error('방 초대 수락 권한이 없습니다.');
          break;
        case 5006:
          toast.error('이미 해당 방에 참여 중입니다.');
          break;
        default:
          toast.error('방 초대 수락에 실패했습니다.');
          console.error('방 초대 수락 중 오류 발생:', error);
      }

      // 오류 발생시에도 초대 목록 새로고침
      queryClient.invalidateQueries({ queryKey: [ROOM_QUERY_KEYS.RECEIVED_ROOM_INVITES] });
    },
  });
};
