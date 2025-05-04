import { cookies } from 'next/headers';

import { dehydrate } from '@tanstack/react-query';

import { Header } from '@components/common';
import HeaderActionButtons from '@components/common/HeaderActionButtons';
import LogoutButton from '@components/mypage/Profile/LogoutButton';
import ProfileManager from '@components/mypage/Profile/ProfileManager';
import StudyCalendar from '@components/mypage/StudyCalendar/StudyCalendar';
import TimeSection from '@components/mypage/TimeSection';
import ProtectedRoute from '@components/router/ProtectedRoute';

import { getUserSchedules } from '@api/user/getUserSchedules';

import { USER_QUERY_KEYS } from '@constants/queryKeys';

import { formatDateToString } from '@utils/date';

import { getServerQueryClient } from '@lib/react-query/getServerQueryClient';
import { HydrationBoundary } from '@lib/react-query/HydrationBoundary';

const MyPage = async () => {
  const cookieStore = await cookies();
  const userId = cookieStore.get('userId')?.value || '';

  const now = new Date();
  const startDate = formatDateToString(new Date(now.getFullYear(), now.getMonth() - 1, 1));
  const endDate = formatDateToString(new Date(now.getFullYear(), now.getMonth() + 2, 0));

  const queryClient = getServerQueryClient();

  if (userId) {
    await queryClient.prefetchQuery({
      queryKey: [USER_QUERY_KEYS.USER_SCHEDULES, userId, startDate, endDate],
      queryFn: async () => getUserSchedules({ userId, startDate, endDate }),
    });
  }

  const dehydratedState = dehydrate(queryClient);

  return (
    <HydrationBoundary state={dehydratedState}>
      <ProtectedRoute>
        <main className="min-h-screen bg-gray-50">
          <Header>
            <HeaderActionButtons />
          </Header>

          <div className="container mx-auto px-4 py-6">
            <ProfileManager isCurrentUser={true} userId={userId} />

            <TimeSection />

            <div className="mt-8">
              <div className="rounded-lg bg-white px-8 py-6 shadow-sm">
                <StudyCalendar userId={userId} />
              </div>
            </div>

            <LogoutButton className="mt-8 flex justify-end" size="md" />
          </div>
        </main>
      </ProtectedRoute>
    </HydrationBoundary>
  );
};

export default MyPage;
