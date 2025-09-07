import { cookies } from 'next/headers';

import { dehydrate } from '@tanstack/react-query';

import ClientUserPage from '@components/user/ClientUserPage';

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

  const [startDate, endDate] = getMonthRange();

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
      <ClientUserPage userId={userId} isCurrentUser={isCurrentUser} />
    </HydrationBoundary>
  );
};

export default UserProfilePage;
