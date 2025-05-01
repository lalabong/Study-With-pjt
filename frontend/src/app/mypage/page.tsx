import { cookies } from 'next/headers';

import { dehydrate } from '@tanstack/react-query';

import { Header } from '@components/common';
import HeaderActionButtons from '@components/common/HeaderActionButtons';
import StatisticsChart from '@components/mypage/Chart/StatisticsChart';
import LogoutButton from '@components/mypage/Profile/LogoutButton';
import ProfileManager from '@components/mypage/Profile/ProfileManager';
import StudyCalendar from '@components/mypage/StudyCalendar/StudyCalendar';
import TotalStudyTime from '@components/mypage/TotalStudyTime';
import ProtectedRoute from '@components/router/ProtectedRoute';

import { getUserSchedules } from '@api/user/getUserSchedules';

import { USER_QUERY_KEYS } from '@constants/queryKeys';

import { getServerQueryClient } from '@lib/react-query/getServerQueryClient';
import { HydrationBoundary } from '@lib/react-query/HydrationBoundary';

export default async function MyPage() {
  const queryClient = getServerQueryClient();
  const cookieStore = await cookies();
  const userId = cookieStore.get('userId')?.value || '';

  if (userId) {
    await queryClient.prefetchQuery({
      queryKey: [USER_QUERY_KEYS.USER_SCHEDULES, userId],
      queryFn: async () => getUserSchedules(userId),
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

            <div className="grid grid-cols-1 gap-6 md:grid-cols-3">
              <div className="rounded-lg bg-white p-5 shadow-sm">
                <StatisticsChart
                  mode="week"
                  chartType="line"
                  lineColor="#4F46E5"
                  title="주간 활동 시간"
                />
              </div>

              <div className="rounded-lg bg-white p-5 shadow-sm">
                <StatisticsChart
                  mode="month"
                  chartType="bar"
                  barColor="#4F46E5"
                  title="월간 활동 시간"
                />
              </div>

              <TotalStudyTime />
            </div>

            <div className="mt-8">
              <div className="rounded-lg bg-white px-8 py-6 shadow-sm">
                <StudyCalendar className="w-full" />
              </div>
            </div>

            <LogoutButton />
          </div>
        </main>
      </ProtectedRoute>
    </HydrationBoundary>
  );
}
