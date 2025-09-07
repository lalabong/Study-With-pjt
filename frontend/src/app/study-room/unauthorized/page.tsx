'use client';

import { useRouter } from 'next/navigation';

import { HiExclamationTriangle } from 'react-icons/hi2';

import { Button } from '@components/common';

import { useAuthStore } from '@stores/authStore';

const UnauthorizedPage = () => {
  const router = useRouter();

  const user = useAuthStore((state) => state.user);

  const handleGoToMyPage = () => {
    if (user?.userId) {
      router.push(`/user/${user.userId}`);
    } else {
      router.push('/');
    }
  };

  return (
    <main className="min-h-screen bg-gray-50 flex items-center justify-center px-4">
      <div className="bg-white rounded-lg shadow-lg p-8 max-w-md w-full text-center">
        <div className="mb-6">
          <HiExclamationTriangle className="mx-auto h-16 w-16 text-red-500 mb-4" />
          <h1 className="text-2xl font-bold text-gray-900 mb-2">접근 권한 없음</h1>
          <p className="text-gray-600">
            이미 나간 방이거나 삭제된 방입니다.
            <br />
            다른 방에 참여하거나 새로운 방을 만들어보세요.
          </p>
        </div>

        <div className="space-y-3">
          <Button onClick={handleGoToMyPage} className="w-full py-3 px-4">
            마이페이지로 이동하기
          </Button>

          <Button onClick={() => router.back()} className="w-full py-3 px-4" variant="text">
            이전 페이지로 돌아가기
          </Button>
        </div>
      </div>
    </main>
  );
};

export default UnauthorizedPage;
