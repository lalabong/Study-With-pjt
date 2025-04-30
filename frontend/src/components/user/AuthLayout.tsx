'use client';

import { ReactNode } from 'react';

import Image from 'next/image';
import Link from 'next/link';
import { useRouter } from 'next/navigation';

import { HiArrowLeft } from 'react-icons/hi';

import StatusMessage from '@components/common/StatusMessage';
import SocialLogin from '@components/user/SocialLogin';

import { useAuthStore } from '@/stores/authStore';

interface AuthLayoutProps {
  children: ReactNode;
  showRegisterLink?: boolean;
}

const AuthLayout = ({ children, showRegisterLink }: AuthLayoutProps) => {
  const router = useRouter();
  const { isAuthenticated, user } = useAuthStore();

  if (isAuthenticated && user) {
    return <StatusMessage status="loading" message="사용자 정보 확인 중..." className="h-screen" />;
  }

  return (
    <main className="relative flex min-h-screen w-full items-center justify-center bg-gradient-to-br from-blue-100 via-blue-50 to-white">
      <div className="relative z-10 w-[400px] rounded-2xl bg-white p-8 shadow-lg">
        <HiArrowLeft
          className="absolute top-4 left-4 size-6 cursor-pointer text-gray-400"
          onClick={() => router.back()}
          onMouseDown={(e) => e.preventDefault()}
          onKeyDown={(e) => e.key === 'Enter' && router.back()}
          tabIndex={0}
          aria-label="뒤로 가기"
        />

        <div className="flex justify-center mb-6">
          <Image src="/images/swith-logo.png" alt="SWith Logo" width={200} height={55} priority />
        </div>

        {children}

        <div className="my-6 flex items-center">
          <div className="flex-grow border-t border-gray-300"></div>
          <span className="mx-4 text-sm text-gray-500">다른 방법으로 이용하기</span>
          <div className="flex-grow border-t border-gray-300"></div>
        </div>

        <SocialLogin />

        {showRegisterLink && (
          <div className="mt-6 text-center text-sm">
            <span className="text-gray-600">계정이 없으신가요?</span>
            <Link href="/signup" className="ml-2 font-bold text-blue-600 hover:underline">
              회원가입
            </Link>
          </div>
        )}
      </div>
    </main>
  );
};

export default AuthLayout;
