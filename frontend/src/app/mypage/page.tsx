import { dehydrate } from '@tanstack/react-query';
import { cookies } from 'next/headers';

import { getUserSchedules } from '@/api/user/getUserSchedules';
import ProtectedRoute from '@/components/auth/ProtectedRoute';
import { Header } from '@/components/common';
import HeaderActionButtons from '@/components/mypage/HeaderActionButtons';
import LogoutButton from '@/components/mypage/LogoutButton';
import ProfileSection from '@/components/mypage/ProfileSection';
import StatisticsChart from '@/components/mypage/StatisticsChart';
import StudyCalendar from '@/components/mypage/StudyCalendar/StudyCalendar';
import TotalStudyTime from '@/components/mypage/TotalStudyTime';
import { USER_QUERY_KEYS } from '@/constants/queryKeys';
import { HydrationBoundary } from '@/lib/react-query/HydrationBoundary';
import { getServerQueryClient } from '@/lib/react-query/getServerQueryClient';

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
            <ProfileSection />

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
