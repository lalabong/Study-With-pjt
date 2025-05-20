'use client';

import StatusMessage from '@components/common/StatusMessage';

import { useUserTotalStudyTimeQuery } from '@hooks/api/useUserTotalStudyTimeQuery';

import { useAuthStore } from '@stores/authStore';

const TotalStudyTime = () => {
  const userId = useAuthStore((state) => state.user?.userId) || '';

  const { data, isLoading, error } = useUserTotalStudyTimeQuery({
    userId,
    enabled: !!userId,
  });

  if (isLoading) {
    return <StatusMessage status="loading" message="활동 시간 정보를 불러오는 중..." />;
  }

  if (error || !data) {
    return (
      <StatusMessage status="error" message="활동 시간 정보를 불러오는 중 오류가 발생했습니다." />
    );
  }

  return (
    <div className={`rounded-lg bg-white p-6 shadow-sm`}>
      <div className="mb-4 flex items-center justify-between">
        <h3 className="text-lg font-medium">총 활동 시간</h3>
      </div>

      <div className="flex h-[300px] flex-col items-center justify-center">
        <div className="text-center text-7xl font-bold">{data.totalStudyTime}</div>
        <div className="mt-2 text-gray-500">시간</div>
      </div>
    </div>
  );
};

export default TotalStudyTime;
