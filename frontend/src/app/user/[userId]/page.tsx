import { cookies } from 'next/headers';

import { dehydrate } from '@tanstack/react-query';

import { Header, HeaderActionButtons } from '@components/common/index';
import { LogoutButton, ProfileManager, StudyCalendar, TimeSection } from '@components/mypage/index';

import { getScheduleDates } from '@api/schedule/getScheduleDates';
import getSchedulesByDate from '@api/schedule/getSchedulesByDate';

import { USER_QUERY_KEYS } from '@constants/queryKeys';

import { getCurrentDateString, getMonthRange } from '@utils/date';

import { getServerQueryClient } from '@lib/react-query/getServerQueryClient';
import { HydrationBoundary } from '@lib/react-query/HydrationBoundary';

export interface UserPageParams {
  userId: string;
}

const UserProfilePage = async ({ params }: { params: Promise<UserPageParams> }) => {
  const { userId } = await params;

  const cookieStore = await cookies();
  const currentUserId = cookieStore.get('userId')?.value || '';

  const isCurrentUser = currentUserId === userId;

  const now = new Date();
  const [startDate, endDate] = getMonthRange(now);

  const queryClient = getServerQueryClient();

  if (userId) {
    await Promise.all([
      queryClient.prefetchQuery({
        queryKey: [USER_QUERY_KEYS.USER_SCHEDULE_DATES, userId, startDate, endDate],
        queryFn: async () => getScheduleDates({ userId, startDate, endDate }),
      }),

      queryClient.prefetchQuery({
        queryKey: [USER_QUERY_KEYS.USER_SCHEDULES_BY_DATE, userId, getCurrentDateString()],
        queryFn: async () => getSchedulesByDate({ userId, date: getCurrentDateString() }),
      }),
    ]);
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
