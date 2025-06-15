'use client';

import Modal from '@components/common/Modal';
import FriendRequestSection from '@components/notification/FriendRequestSection';
import InvitationRequestSection from '@components/notification/InvitationRequestSection';

interface NotificationModalProps {
  isOpen: boolean;
  onClose: () => void;
}

const NotificationModal = ({ isOpen, onClose }: NotificationModalProps) => {
  return (
    <Modal isOpen={isOpen} onClose={onClose} title="알림 목록" width="w-[550px]">
      <div className="space-y-6">
        <FriendRequestSection />

        <InvitationRequestSection />
      </div>
    </Modal>
  );
};

export default NotificationModal;
