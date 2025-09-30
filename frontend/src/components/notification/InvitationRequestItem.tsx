'use client';

import { HiCalendar } from 'react-icons/hi';

import Button from '@components/common/Button';

interface InvitationRequestItemProps {
  roomTitle: string;
  invitedBy: string;
  createdAt: string;
  isLoading?: boolean;
  onAccept: () => void;
  onDecline: () => void;
}

const InvitationRequestItem = ({
  roomTitle,
  invitedBy,
  createdAt,
  isLoading = false,
  onAccept,
  onDecline,
}: InvitationRequestItemProps) => {
  const formatDate = (dateString: string): string => {
    const date = new Date(dateString);
    const now = new Date();
    const diffMs = now.getTime() - date.getTime();
    const diffMins = Math.floor(diffMs / (1000 * 60));
    const diffHours = Math.floor(diffMins / 60);
    const diffDays = Math.floor(diffHours / 24);

    if (diffMins < 1) return '방금 전';
    if (diffMins < 60) return `${diffMins}분 전`;
    if (diffHours < 24) return `${diffHours}시간 전`;
    if (diffDays < 7) return `${diffDays}일 전`;

    return date.toLocaleDateString('ko-KR', {
      month: 'short',
      day: 'numeric',
      hour: '2-digit',
      minute: '2-digit',
    });
  };
  return (
    <div className="flex items-center justify-between p-4 border-b border-gray-100 last:border-b-0">
      <div className="flex-1">
        <div className="flex items-center">
          <HiCalendar className="w-3 h-3 mr-1" />
          <h4 className="text-sm font-medium text-gray-900">{roomTitle}</h4>
        </div>
        <div className="flex items-center">
          <span className="text-xs text-gray-600">초대한 사람: {invitedBy}</span>
          <span className="text-xs text-gray-400 ml-2">{formatDate(createdAt)}</span>
        </div>
      </div>
      <div className="flex gap-2 ml-4">
        <Button
          variant="primary"
          size="sm"
          onClick={onAccept}
          className="px-3 py-1.5"
          disabled={isLoading}
        >
          {isLoading ? '수락 중...' : '수락'}
        </Button>
        <Button
          variant="secondary"
          size="sm"
          onClick={onDecline}
          className="px-3 py-1.5"
          disabled={isLoading}
        >
          거절
        </Button>
      </div>
    </div>
  );
};

export default InvitationRequestItem;
