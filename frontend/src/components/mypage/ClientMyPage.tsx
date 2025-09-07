'use client';

import CurrentRoomToast from '@components/common/CurrentRoomToast';
import { Header, HeaderActionButtons } from '@components/common/index';
import { LogoutButton, ProfileManager, StudyCalendar, TimeSection } from '@components/mypage/index';

import { useCurrentRoomToast } from '@hooks/useCurrentRoomToast';

interface ClientMyPageProps {
  userId: string;
}

const ClientMyPage = ({ userId }: ClientMyPageProps) => {
  const { showToast, hideToast } = useCurrentRoomToast();

  return (
    <>
      <main className="min-h-screen bg-gray-50">
        <Header>
          <HeaderActionButtons />
        </Header>

        <div className="container mx-auto px-4 py-6">
          <ProfileManager isCurrentUser={true} userId={userId} />

          <TimeSection />

          <div className="mt-8">
            <div className="rounded-lg bg-white px-8 py-6 shadow-sm">
              <StudyCalendar userId={userId} isCurrentUser={true} />
            </div>
          </div>

          <LogoutButton className="mt-8 flex justify-end" size="md" />
        </div>
      </main>

      <CurrentRoomToast show={showToast} onClose={hideToast} />
    </>
  );
};

export default ClientMyPage;
