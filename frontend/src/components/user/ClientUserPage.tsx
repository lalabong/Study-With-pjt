'use client';

import CurrentRoomToast from '@components/common/CurrentRoomToast';
import { Header, HeaderActionButtons } from '@components/common/index';
import { LogoutButton, ProfileManager, StudyCalendar, TimeSection } from '@components/mypage/index';

import { useCurrentRoomToast } from '@hooks/useCurrentRoomToast';

interface ClientUserPageProps {
  userId: string;
  isCurrentUser: boolean;
}

const ClientUserPage = ({ userId, isCurrentUser }: ClientUserPageProps) => {
  const { showToast, hideToast } = useCurrentRoomToast();

  return (
    <>
      <main className="min-h-screen bg-gray-50">
        <Header>
          <HeaderActionButtons />
        </Header>

        <div className="container mx-auto px-4 py-6">
          <ProfileManager isCurrentUser={isCurrentUser} userId={userId} />

          <TimeSection />

          <div className="mt-8">
            <div className="rounded-lg bg-white px-8 py-6 shadow-sm">
              <StudyCalendar userId={userId} isCurrentUser={isCurrentUser} />
            </div>
          </div>

          {isCurrentUser && <LogoutButton className="mt-8 flex justify-end" size="md" />}
        </div>
      </main>

      {/* Toast는 현재 사용자일 때만 표시 */}
      {isCurrentUser && <CurrentRoomToast show={showToast} onClose={hideToast} />}
    </>
  );
};

export default ClientUserPage;
