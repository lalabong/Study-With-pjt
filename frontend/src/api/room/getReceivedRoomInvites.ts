import { axiosInstance } from '@api/axiosInstance';

import { ROOM_ENDPOINTS } from '@constants/api';

import { ApiResponse } from '@/types/api';

export interface RoomInvite {
  id: string;
  roomCuid: string;
  inviterCuid: string;
  inviteeCuid: string;
  status: 'pending' | 'accepted' | 'declined';
  createdAt: string;
  updatedAt: string;
  room: {
    id: string;
    name: string;
    createdAt: string;
  };
  inviter: {
    id: string;
    userId: string;
    nickname: string;
    profileImg: string | null;
  };
}

interface GetReceivedRoomInvitesResponse {
  receivedInvites: RoomInvite[];
}

export const getReceivedRoomInvites = async (): Promise<
  ApiResponse<GetReceivedRoomInvitesResponse>
> => {
  const response = await axiosInstance.get(ROOM_ENDPOINTS.GET_RECEIVED_INVITES);
  console.log('받은 방 초대 목록 응답:', response.data);

  return response.data;
};
