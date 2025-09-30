'use client';

import InvitationRequestItem from '@components/notification/InvitationRequestItem';

import { useAcceptRoomInviteMutation } from '@hooks/api/useAcceptRoomInviteMutation';
import { useDeclineRoomInviteMutation } from '@hooks/api/useDeclineRoomInviteMutation';
import { useReceivedRoomInvitesQuery } from '@hooks/api/useReceivedRoomInvitesQuery';

const InvitationRequestSection = () => {
  const { data: invitesData, isLoading, error } = useReceivedRoomInvitesQuery();
  const acceptMutation = useAcceptRoomInviteMutation();
  const declineMutation = useDeclineRoomInviteMutation();

  const invites = invitesData?.data?.receivedInvites || [];

  const handleInvitationAccept = (invitationId: string) => {
    acceptMutation.mutate(invitationId);
  };

  const handleInvitationDecline = (invitationId: string) => {
    declineMutation.mutate(invitationId);
  };

  return (
    <section>
      <h3 className="text-lg font-semibold text-gray-900 mb-4">초대 요청 목록</h3>
      <div className="space-y-1">
        {isLoading ? (
          <p className="text-sm text-gray-500 text-center py-4">초대 목록 로딩 중...</p>
        ) : error ? (
          <p className="text-sm text-red-500 text-center py-4">
            초대 목록을 불러오는 중 오류가 발생했습니다.
          </p>
        ) : invites.length === 0 ? (
          <p className="text-sm text-gray-500 text-center py-4">새로운 초대 요청이 없습니다.</p>
        ) : (
          invites.map((invite) => (
            <InvitationRequestItem
              key={invite.id}
              roomTitle={invite.room.name}
              invitedBy={invite.inviter.nickname}
              createdAt={invite.createdAt}
              isLoading={acceptMutation.isPending || declineMutation.isPending}
              onAccept={() => handleInvitationAccept(invite.id)}
              onDecline={() => handleInvitationDecline(invite.id)}
            />
          ))
        )}
      </div>
    </section>
  );
};

export default InvitationRequestSection;
