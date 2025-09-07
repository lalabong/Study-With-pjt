'use client';

import { useRouter } from 'next/navigation';

import { useMutation } from '@tanstack/react-query';
import { AxiosError } from 'axios';
import { toast } from 'react-toastify';

import { postCreateRoom, CreateRoomRequest } from '@api/room/postCreateRoom';

import { ROOM_ERROR_MESSAGES, USER_ERROR_MESSAGES, ROOM_SUCCESS_MESSAGES } from '@constants/index';

export const useCreateRoomMutation = () => {
  const router = useRouter();

  return useMutation({
    mutationFn: (data: CreateRoomRequest) => postCreateRoom(data),
    onSuccess: (response) => {
      const roomId = response.data?.room.id;

      if (!roomId) {
        toast.error(ROOM_ERROR_MESSAGES.CREATE_ROOM_FAILED);
        return;
      }

      toast.success(ROOM_SUCCESS_MESSAGES.CREATE_ROOM);

      router.push(`/study-room/${roomId}`);
    },
    onError: (error: AxiosError<{ errorCode?: number }>) => {
      const errorCode = error.response?.data?.errorCode;

      switch (errorCode) {
        case 3006:
          toast.error(USER_ERROR_MESSAGES.UNAUTHORIZED);
          break;
        case 5002:
          toast.error(ROOM_ERROR_MESSAGES.ROOM_NAME_REQUIRED);
          break;
        default:
          toast.error(ROOM_ERROR_MESSAGES.CREATE_ROOM_FAILED);
          console.error('방 생성 중 오류 발생:', error);
      }
    },
  });
};
