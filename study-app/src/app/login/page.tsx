'use client';

import Image from 'next/image';
import Link from 'next/link';
import { useRouter } from 'next/navigation';
import { HiArrowLeft } from 'react-icons/hi';

import LoginForm from '../../components/Login/LoginForm';
import SocialLogin from '../../components/Login/SocialLogin';

const LoginPage = (): React.ReactNode => {
  const router = useRouter();

  return (
    <main className="relative flex min-h-screen w-full items-center justify-center bg-gradient-to-br from-blue-100 via-blue-50 to-white">
      {/* 로그인 카드 */}

      <div className="relative z-10 w-[400px] rounded-2xl bg-white p-8 shadow-lg">
        {/* 뒤로 가기 버튼 */}
        <HiArrowLeft
          className="absolute top-4 left-4 size-6 cursor-pointer text-gray-400"
          onClick={() => router.back()}
          onMouseDown={(e) => e.preventDefault()}
          onKeyDown={(e) => e.key === 'Enter' && router.back()}
          tabIndex={0}
          aria-label="뒤로 가기"
        />

        {/* 로고 */}
        <div className="flex justify-center mb-6">
          <Image src="/images/swith-logo.png" alt="SWith Logo" width={200} height={55} priority />
        </div>

        {/* 로그인 폼 */}
        <LoginForm />

        {/* 구분선 */}
        <div className="my-6 flex items-center">
          <div className="flex-grow border-t border-gray-300"></div>
          <span className="mx-4 text-sm text-gray-500">다른 방법으로 로그인하기</span>
          <div className="flex-grow border-t border-gray-300"></div>
        </div>

        {/* 소셜 로그인 */}
        <SocialLogin />

        {/* 회원가입 링크 */}
        <div className="mt-6 text-center text-sm">
          <span className="text-gray-600">계정이 없으신가요?</span>
          <Link href="/register" className="ml-2 font-bold text-blue-600 hover:underline">
            회원가입
          </Link>
        </div>
      </div>
    </main>
  );
};

export default LoginPage;
