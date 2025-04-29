import { cookies } from 'next/headers';
import { notFound } from 'next/navigation';

import { Header } from '@components/common';
import HeaderActionButtons from '@components/mypage/HeaderActionButtons';
import ProfileManager from '@components/mypage/ProfileManager';
import StatisticsChart from '@components/mypage/StatisticsChart';
import StudyCalendar from '@components/mypage/StudyCalendar/StudyCalendar';
import TotalStudyTime from '@components/mypage/TotalStudyTime';

interface UserProfilePageProps {
  params: {
    userId: string;
  };
}

const UserProfilePage = async ({ params }: UserProfilePageProps) => {
  const cookieStore = await cookies();
  const currentUserId = cookieStore.get('userId')?.value || '';

  try {
    // 사용자 정보 prefetch 후 하위 컴포넌트들로 넘겨주기
    // const user = await getUser(params.userId);
    const user = {
      id: params.userId,
      userId: params.userId,
      nickname: `사용자 ${params.userId}`,
      createdAt: '2024-01-01',
    };

    const isCurrentUser = currentUserId === params.userId;

    return (
      <main className="min-h-screen bg-gray-50">
        <Header>
          <HeaderActionButtons />
        </Header>

        <div className="container mx-auto px-4 py-6">
          {/* ProfileManager에 사용자 정보 전달하고 ID 비교로 현재 사용자 여부 판단 */}
          <ProfileManager profileUser={user} />

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
          {isCurrentUser && (
            <div className="mt-8 flex justify-end">
              <button className="rounded-lg bg-gray-200 px-4 py-2 text-gray-700">로그아웃</button>
            </div>
          )}
        </div>
      </main>
    );
  } catch (error) {
    console.error('사용자 프로필 페이지 로드 오류:', error);
    notFound();
  }
};

export default UserProfilePage;
