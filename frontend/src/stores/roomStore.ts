import { create } from 'zustand';
import { persist, createJSONStorage } from 'zustand/middleware';

import { RoomParticipant } from '@api/room/getParticipants';

interface RoomState {
  currentRoomId: string | null;
  participants: RoomParticipant[];

  setCurrentRoomId: (roomId: string | null) => void;
  setParticipants: (participants: RoomParticipant[]) => void;
  leaveRoom: () => void;
}

export const useRoomStore = create<RoomState>()(
  persist(
    (set) => ({
      currentRoomId: null,
      participants: [],

      setCurrentRoomId: (roomId: string | null) => set({ currentRoomId: roomId }),
      setParticipants: (participants: RoomParticipant[]) => set({ participants }),
      leaveRoom: () =>
        set({
          currentRoomId: null,
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
      }),
    },
  ),
);
