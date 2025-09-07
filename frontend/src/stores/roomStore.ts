import { create } from 'zustand';
import { persist, createJSONStorage } from 'zustand/middleware';

import { RoomParticipant } from '@api/room/getParticipants';

interface RoomState {
  currentRoomId: string | null;
  currentRoomName: string | null;
  currentRoomCreatedAt: string | null;
  participants: RoomParticipant[];

  setCurrentRoomId: (roomId: string | null) => void;
  setCurrentRoomName: (roomName: string | null) => void;
  setCurrentRoomCreatedAt: (createdAt: string | null) => void;
  setParticipants: (participants: RoomParticipant[]) => void;
  leaveRoom: () => void;
}

export const useRoomStore = create<RoomState>()(
  persist(
    (set) => ({
      currentRoomId: null,
      currentRoomName: null,
      currentRoomCreatedAt: null,
      participants: [],

      setCurrentRoomId: (roomId: string | null) => set({ currentRoomId: roomId }),
      setCurrentRoomName: (roomName: string | null) => set({ currentRoomName: roomName }),
      setCurrentRoomCreatedAt: (createdAt: string | null) =>
        set({ currentRoomCreatedAt: createdAt }),
      setParticipants: (participants: RoomParticipant[]) => set({ participants }),
      leaveRoom: () =>
        set({
          currentRoomId: null,
          currentRoomName: null,
          currentRoomCreatedAt: null,
          participants: [],
        }),
    }),
    {
      name: 'room-storage',
      storage: createJSONStorage(() => {
        if (typeof window === 'undefined') {
          return {
            getItem: () => null,
            setItem: () => null,
            removeItem: () => null,
          };
        }
        return sessionStorage;
      }),
      skipHydration: true,
      partialize: (state) => ({
        currentRoomId: state.currentRoomId,
        currentRoomName: state.currentRoomName,
        currentRoomCreatedAt: state.currentRoomCreatedAt,
        participants: state.participants,
      }),
    },
  ),
);
