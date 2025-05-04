import { cookies } from 'next/headers';

import { dehydrate } from '@tanstack/react-query';

import { Header } from '@components/common';
import HeaderActionButtons from '@components/common/HeaderActionButtons';
import { LogoutButton } from '@components/mypage';
import ProfileManager from '@components/mypage/Profile/ProfileManager';
import StudyCalendar from '@components/mypage/StudyCalendar/StudyCalendar';
import TimeSection from '@components/mypage/TimeSection';

import { getUserSchedules } from '@api/user/getUserSchedules';

import { USER_QUERY_KEYS } from '@constants/queryKeys';

import { formatDateToString } from '@utils/date';

import { getServerQueryClient } from '@lib/react-query/getServerQueryClient';
import { HydrationBoundary } from '@lib/react-query/HydrationBoundary';

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

  const now = new Date();
  const startDate = formatDateToString(new Date(now.getFullYear(), now.getMonth() - 1, 1));
  const endDate = formatDateToString(new Date(now.getFullYear(), now.getMonth() + 2, 0));

  const queryClient = getServerQueryClient();

  if (userId) {
    await queryClient.prefetchQuery({
      queryKey: [USER_QUERY_KEYS.USER_SCHEDULES, userId],
      queryFn: async () => getUserSchedules({ userId, startDate, endDate }),
    });
  }

  const dehydratedState = dehydrate(queryClient);

  return (
    <HydrationBoundary state={dehydratedState}>
      <main className="min-h-screen bg-gray-50">
        <Header>
          <HeaderActionButtons />
        </Header>

        <div className="container mx-auto px-4 py-6">
          <ProfileManager isCurrentUser={isCurrentUser} userId={userId} />

          <TimeSection />

          <div className="mt-8">
            <div className="rounded-lg bg-white px-8 py-6 shadow-sm">
              <StudyCalendar userId={userId} />
            </div>
          </div>

          {isCurrentUser && <LogoutButton className="mt-8 flex justify-end" size="md" />}
        </div>
      </main>
    </HydrationBoundary>
  );
};

export default UserProfilePage;
