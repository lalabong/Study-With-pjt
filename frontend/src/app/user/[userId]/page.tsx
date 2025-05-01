import { cookies } from 'next/headers';

import { Header } from '@components/common';
import HeaderActionButtons from '@components/common/HeaderActionButtons';
import { LogoutButton } from '@components/mypage';
import StatisticsChart from '@components/mypage/Chart/StatisticsChart';
import ProfileManager from '@components/mypage/Profile/ProfileManager';
import StudyCalendar from '@components/mypage/StudyCalendar/StudyCalendar';
import TotalStudyTime from '@components/mypage/TotalStudyTime';

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

        {/* 현재 사용자면 로그아웃 버튼 표시 */}
        {isCurrentUser && <LogoutButton />}
      </div>
    </main>
  );
};

export default UserProfilePage;
