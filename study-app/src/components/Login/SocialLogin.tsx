'use client';

const SocialLogin = (): React.ReactNode => {
  const handleSocialLogin = (provider: string): void => {
    // 소셜 로그인 로직 구현
    console.warn(`${provider} 로그인 시도`);
  };

  // 소셜 아이콘 컴포넌트
  const GoogleIcon = ({ className }: { className?: string }): React.ReactNode => (
    <svg version="1.1" xmlns="http://www.w3.org/2000/svg" viewBox="0 0 48 48" className={className}>
      <path
        fill="#EA4335"
        d="M24 9.5c3.54 0 6.71 1.22 9.21 3.6l6.85-6.85C35.9 2.38 30.47 0 24 0 14.62 0 6.51 5.38 2.56 13.22l7.98 6.19C12.43 13.72 17.74 9.5 24 9.5z"
      ></path>
      <path
        fill="#4285F4"
        d="M46.98 24.55c0-1.57-.15-3.09-.38-4.55H24v9.02h12.94c-.58 2.96-2.26 5.48-4.78 7.18l7.73 6c4.51-4.18 7.09-10.36 7.09-17.65z"
      ></path>
      <path
        fill="#FBBC05"
        d="M10.53 28.59c-.48-1.45-.76-2.99-.76-4.59s.27-3.14.76-4.59l-7.98-6.19C.92 16.46 0 20.12 0 24c0 3.88.92 7.54 2.56 10.78l7.97-6.19z"
      ></path>
      <path
        fill="#34A853"
        d="M24 48c6.48 0 11.93-2.13 15.89-5.81l-7.73-6c-2.15 1.45-4.92 2.3-8.16 2.3-6.26 0-11.57-4.22-13.47-9.91l-7.98 6.19C6.51 42.62 14.62 48 24 48z"
      ></path>
      <path fill="none" d="M0 0h48v48H0z"></path>
    </svg>
  );

  const NaverIcon = ({ className }: { className?: string }): React.ReactNode => (
    <svg xmlns="http://www.w3.org/2000/svg" viewBox="0 0 20 20" className={className}>
      <g fill="none">
        <path fill="#FFFFFF" d="M0 0h20v20H0z" />
        <path
          fill="#03C75A"
          d="M11.03 10.648L8.063 6.36H6v7.28h2.223V9.95l2.97 3.69H13.5V6.36h-2.47z"
        />
      </g>
    </svg>
  );

  const KakaoIcon = ({ className }: { className?: string }): React.ReactNode => (
    <svg xmlns="http://www.w3.org/2000/svg" viewBox="0 0 24 22" className={className}>
      <rect width="24" height="22" fill="#FEE500" />
      <path
        fill="#000000"
        d="M12,3.8c-5.4,0-9.8,3.4-9.8,7.6c0,2.7,1.8,5.1,4.6,6.5l-1.2,4.2c-0.1,0.2,0,0.3,0.1,0.4c0.1,0.1,0.3,0.1,0.4,0l4.8-3.2c0.3,0,0.7,0.1,1,0.1c5.4,0,9.8-3.4,9.8-7.6C21.8,7.2,17.4,3.8,12,3.8z"
      />
    </svg>
  );

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
