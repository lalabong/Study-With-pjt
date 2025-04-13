'use client';

import { useState } from 'react';
import { HiIdentification, HiLockClosed, HiEye, HiEyeOff } from 'react-icons/hi';

const LoginForm = (): React.ReactNode => {
  const [userId, setUserId] = useState<string>('');
  const [password, setPassword] = useState<string>('');
  const [showPassword, setShowPassword] = useState<boolean>(false);

  const handleTogglePassword = (): void => {
    setShowPassword(!showPassword);
  };

  const handleLogin = (e: React.FormEvent): void => {
    e.preventDefault();
    // 로그인 로직 구현
    console.warn('로그인 시도:', { userId, password });
  };

  return (
    <form onSubmit={handleLogin} className="space-y-4">
      <div className="space-y-2">
        <label htmlFor="userId" className="block text-sm font-bold text-gray-700">
          아이디
        </label>
        <div className="relative mt-2 rounded-md shadow-sm">
          <div className="pointer-events-none absolute inset-y-0 left-0 flex items-center pl-3 text-gray-400">
            <HiIdentification className="size-6" />
          </div>
          <input
            id="userId"
            type="text"
            value={userId}
            onChange={(e) => setUserId(e.target.value)}
            className="w-full rounded-lg border border-gray-300 px-4 py-2 pl-11 focus:border-blue-500 focus:outline-none focus:ring-2 focus:ring-blue-200"
            placeholder="아이디를 입력하세요"
            maxLength={20}
            required
          />
        </div>
      </div>

      <div className="space-y-2">
        <label htmlFor="password" className="block text-sm font-bold text-gray-700">
          비밀번호
        </label>
        <div className="relative">
          <div className="pointer-events-none absolute left-3 top-1/2 -translate-y-1/2 text-gray-400">
            <HiLockClosed className="size-5" />
          </div>
          <input
            id="password"
            type={showPassword ? 'text' : 'password'}
            value={password}
            onChange={(e) => setPassword(e.target.value)}
            className="w-full rounded-lg border border-gray-300 px-4 py-2 pl-11 focus:border-blue-500 focus:outline-none focus:ring-2 focus:ring-blue-200"
            placeholder="비밀번호를 입력하세요"
            required
          />
          <button
            type="button"
            onClick={handleTogglePassword}
            className="absolute right-3 top-1/2 -translate-y-1/2 text-gray-400 focus:outline-none cursor-pointer"
            aria-label={showPassword ? '비밀번호 숨기기' : '비밀번호 보기'}
          >
            {showPassword ? <HiEyeOff className="h-5 w-5" /> : <HiEye className="h-5 w-5" />}
          </button>
        </div>
      </div>

      <button
        type="submit"
        className="w-full rounded-lg bg-blue-600 px-4 py-2 font-medium text-white transition-colors hover:bg-blue-800 focus:outline-none focus:ring-2 focus:ring-blue-500 focus:ring-offset-2 cursor-pointer"
      >
        로그인
      </button>
    </form>
  );
};

export default LoginForm;
