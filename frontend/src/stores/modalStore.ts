import { create } from 'zustand';

interface ModalState {
  isFriendsModalOpen: boolean;
  isNotificationModalOpen: boolean;
  isFriendRequestModalOpen: boolean;

  setIsFriendsModalOpen: (isOpen: boolean) => void;
  setIsNotificationModalOpen: (isOpen: boolean) => void;
  setIsFriendRequestModalOpen: (isOpen: boolean) => void;
  closeAllModals: () => void;
}

export const useModalStore = create<ModalState>((set) => ({
  isFriendsModalOpen: false,
  isNotificationModalOpen: false,
  isFriendRequestModalOpen: false,

  setIsFriendsModalOpen: (isOpen: boolean) => set({ isFriendsModalOpen: isOpen }),
  setIsNotificationModalOpen: (isOpen: boolean) => set({ isNotificationModalOpen: isOpen }),
  setIsFriendRequestModalOpen: (isOpen: boolean) => set({ isFriendRequestModalOpen: isOpen }),
  closeAllModals: () =>
    set({
      isFriendsModalOpen: false,
      isNotificationModalOpen: false,
      isFriendRequestModalOpen: false,
    }),
}));
