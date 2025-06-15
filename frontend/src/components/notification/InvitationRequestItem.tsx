'use client';

import { HiCalendar } from 'react-icons/hi';

import Button from '@components/common/Button';

interface InvitationRequestItemProps {
  roomTitle: string;
  invitedBy: string;
  onAccept: () => void;
  onDecline: () => void;
}

const InvitationRequestItem = ({
  roomTitle,
  invitedBy,
  onAccept,
  onDecline,
}: InvitationRequestItemProps) => {
  return (
    <div className="flex items-center justify-between p-4 border-b border-gray-100 last:border-b-0">
      <div className="flex-1">
        <div className="flex items-center">
          <HiCalendar className="w-3 h-3 mr-1" />
          <h4 className="text-sm font-medium text-gray-900">{roomTitle}</h4>
        </div>
        <div className="flex items-center">
          <span className="text-xs text-gray-600">초대한 사람: {invitedBy}</span>
        </div>
      </div>
      <div className="flex gap-2 ml-4">
        <Button variant="primary" size="sm" onClick={onAccept} className="px-3 py-1.5">
          수락
        </Button>
        <Button variant="secondary" size="sm" onClick={onDecline} className="px-3 py-1.5">
          거절
        </Button>
      </div>
    </div>
  );
};

export default InvitationRequestItem;
