import { cookies } from 'next/headers';

import { dehydrate } from '@tanstack/react-query';

import { Header, HeaderActionButtons } from '@components/common/index';
import { LogoutButton, ProfileManager, StudyCalendar, TimeSection } from '@components/mypage/index';
import ProtectedRoute from '@components/router/ProtectedRoute';

import { getScheduleDates } from '@api/schedule/getScheduleDates';

import { USER_QUERY_KEYS } from '@constants/queryKeys';

import { getMonthRange } from '@utils/date';

import { getServerQueryClient } from '@lib/react-query/getServerQueryClient';
import { HydrationBoundary } from '@lib/react-query/HydrationBoundary';

const MyPage = async () => {
  const cookieStore = await cookies();
  const userId = cookieStore.get('userId')?.value || '';

  const now = new Date();
  const [startDate, endDate] = getMonthRange(now);

  const queryClient = getServerQueryClient();

  if (userId) {
    await queryClient.prefetchQuery({
      queryKey: [USER_QUERY_KEYS.USER_SCHEDULE_DATES, userId, startDate, endDate],
      queryFn: async () => getScheduleDates({ userId, startDate, endDate }),
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
