import { create } from 'zustand';

interface ModalState {
  isFriendsModalOpen: boolean;
  isNotificationModalOpen: boolean;

  setIsFriendsModalOpen: (isOpen: boolean) => void;
  setIsNotificationModalOpen: (isOpen: boolean) => void;
  closeAllModals: () => void;
}

export const useModalStore = create<ModalState>((set) => ({
  isFriendsModalOpen: false,
  isNotificationModalOpen: false,

  setIsFriendsModalOpen: (isOpen: boolean) => set({ isFriendsModalOpen: isOpen }),
  setIsNotificationModalOpen: (isOpen: boolean) => set({ isNotificationModalOpen: isOpen }),
  closeAllModals: () =>
    set({
      isFriendsModalOpen: false,
      isNotificationModalOpen: false,
    }),
}));
