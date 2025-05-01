import { cookies } from 'next/headers';

import { Header } from '@components/common';
import HeaderActionButtons from '@components/common/HeaderActionButtons';
import { LogoutButton } from '@components/mypage';
import ProfileManager from '@components/mypage/Profile/ProfileManager';
import StudyCalendar from '@components/mypage/StudyCalendar/StudyCalendar';
import TimeSection from '@components/mypage/TimeSection';

interface UserProfilePageProps {
  params: {
    userId: string;
  };
}

const UserProfilePage = async ({ params }: UserProfilePageProps) => {
  const { userId } = await params;

  const cookieStore = await cookies();
  const currentUserId = cookieStore.get('userId')?.value || '';

  const isCurrentUser = currentUserId === userId;

  return (
    <main className="min-h-screen bg-gray-50">
      <Header>
        <HeaderActionButtons />
      </Header>

      <div className="container mx-auto px-4 py-6">
        <ProfileManager isCurrentUser={isCurrentUser} userId={userId} />

        <TimeSection />

        <div className="mt-8">
          <div className="rounded-lg bg-white px-8 py-6 shadow-sm">
            <StudyCalendar className="w-full" />
          </div>
        </div>

        {isCurrentUser && <LogoutButton />}
      </div>
    </main>
  );
};

export default UserProfilePage;
