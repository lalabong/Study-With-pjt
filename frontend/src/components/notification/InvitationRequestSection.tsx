'use client';

import InvitationRequestItem from '@components/notification/InvitationRequestItem';

interface InvitationRequest {
  id: string;
  roomTitle: string;
  invitedBy: string;
}

const DUMMY_INVITATIONS: InvitationRequest[] = [
  {
    id: '1',
    roomTitle: '방 이름입니다',
    invitedBy: 'Emily Brown',
  },
  {
    id: '2',
    roomTitle: '방 이름입니다',
    invitedBy: 'Emily Brown',
  },
];

const InvitationRequestSection = () => {
  const invitationRequests = DUMMY_INVITATIONS;

  const handleInvitationAccept = (invitationId: string) => {
    console.log('Invitation accepted:', invitationId);
  };

  const handleInvitationDecline = (invitationId: string) => {
    console.log('Invitation declined:', invitationId);
  };

  return (
    <section>
      <h3 className="text-lg font-semibold text-gray-900 mb-4">초대 요청 목록</h3>
      <div className="space-y-1">
        {invitationRequests.length === 0 ? (
          <p className="text-sm text-gray-500 text-center py-4">새로운 초대 요청이 없습니다.</p>
        ) : (
          invitationRequests.map((invitation) => (
            <InvitationRequestItem
              key={invitation.id}
              roomTitle={invitation.roomTitle}
              invitedBy={invitation.invitedBy}
              onAccept={() => handleInvitationAccept(invitation.id)}
              onDecline={() => handleInvitationDecline(invitation.id)}
            />
          ))
        )}
      </div>
    </section>
  );
};

export default InvitationRequestSection;
