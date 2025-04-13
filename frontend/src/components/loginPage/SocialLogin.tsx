'use client';

import { GoogleIcon, NaverIcon, KakaoIcon } from '../common/SocialIcons';

const SocialLogin = (): React.ReactNode => {
  const handleSocialLogin = (provider: string): void => {
    // 소셜 로그인 로직 구현
    console.warn(`${provider} 로그인 시도`);
  };

  return (
    <div className="space-y-3">
      {/* 구글 로그인 버튼 */}
      <button
        onClick={() => handleSocialLogin('Google')}
        className="flex w-full items-center justify-center space-x-2 rounded-lg border border-gray-300 bg-white px-4 py-2 text-sm font-medium text-gray-700 shadow-sm transition-colors hover:bg-gray-200 focus:outline-none focus:ring-2 focus:ring-blue-500 focus:ring-offset-2 cursor-pointer"
      >
        <GoogleIcon className="h-5 w-5" />
        <span>구글 계정으로 로그인</span>
      </button>

      {/* 네이버 로그인 버튼 */}
      <button
        onClick={() => handleSocialLogin('Naver')}
        className="flex w-full items-center justify-center space-x-2 rounded-lg border border-transparent bg-[#03C75A] px-4 py-2 text-sm font-medium text-white shadow-sm transition-colors hover:bg-[#02b350] focus:outline-none focus:ring-2 focus:ring-[#03C75A] focus:ring-offset-2 cursor-pointer"
      >
        <NaverIcon className="h-5 w-5" />
        <span>네이버 계정으로 로그인</span>
      </button>

      {/* 카카오 로그인 버튼 */}
      <button
        onClick={() => handleSocialLogin('Kakao')}
        className="flex w-full items-center justify-center space-x-2 rounded-lg border border-transparent bg-[#FEE500] px-4 py-2 text-sm font-medium text-[#191919] shadow-sm transition-colors hover:bg-[#f3d53f] focus:outline-none focus:ring-2 focus:ring-[#FEE500] focus:ring-offset-2 cursor-pointer"
      >
        <KakaoIcon className="h-5 w-5" />
        <span>카카오 계정으로 로그인</span>
      </button>
    </div>
  );
};

export default SocialLogin;
