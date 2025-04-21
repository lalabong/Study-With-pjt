import ProtectedRoute from '@/components/auth/ProtectedRoute';
import { Header } from '@/components/common';
import HeaderActionButtons from '@/components/mypage/HeaderActionButtons';
import LogoutButton from '@/components/mypage/LogoutButton';
import ProfileSection from '@/components/mypage/ProfileSection';
import StatisticsChart from '@/components/mypage/StatisticsChart';
import StudyCalendar from '@/components/mypage/StudyCalendar/StudyCalendar';
import TotalStudyTime from '@/components/mypage/TotalStudyTime';

export default function MyPage() {
  // react-query prefetch를 이용해서 하위 컴포넌트에 데이터 전달

  return (
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
  );
}
