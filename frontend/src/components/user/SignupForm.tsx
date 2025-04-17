'use client';

import { useRouter } from 'next/navigation';
import { useState } from 'react';
import { HiIdentification, HiLockClosed, HiEye, HiEyeOff, HiUser } from 'react-icons/hi';
import { toast } from 'react-toastify';

import { USER_SUCCESS_MESSAGES } from '@/constants/successMessages';
import { useValidateForm } from '@/hooks/useValidateForm';
import { useAuthStore } from '@/stores/authStore';

const SignUpForm = () => {
  const router = useRouter();
  const [userId, setUserId] = useState<string>('');
  const [nickname, setNickname] = useState<string>('');
  const [password, setPassword] = useState<string>('');
  const [confirmPassword, setConfirmPassword] = useState<string>('');
  const [showPassword, setShowPassword] = useState<boolean>(false);
  const [showConfirmPassword, setShowConfirmPassword] = useState<boolean>(false);

  const { errors, validateForm } = useValidateForm({
    userId: { value: userId, validate: true },
    password: { value: password, validate: true },
    nickname: { value: nickname, validate: true },
    confirmPassword: { value: confirmPassword, validate: true },
  });

  const handleTogglePassword = (field: 'password' | 'confirmPassword'): void => {
    if (field === 'password') {
      setShowPassword(!showPassword);
    } else {
      setShowConfirmPassword(!showConfirmPassword);
    }
  };

  const handleSignUp = async (e: React.FormEvent): Promise<void> => {
    e.preventDefault();

    if (validateForm()) {
      console.warn('회원가입 시도:', { userId, nickname, password });

      try {
        await useAuthStore.getState().signup(
          { userId, nickname, password },

          () => {
            toast.success(USER_SUCCESS_MESSAGES.SIGNUP_SUCCESS);
            router.push('/login');
          },

          (errorMessage) => {
            toast.error(errorMessage);
          },
        );
      } catch (error) {
        console.error('회원가입 중 오류 발생:', error);
      }
    }
  };

  return (
    <form onSubmit={handleSignUp} className="space-y-4">
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
            className={`w-full rounded-lg border ${
              errors.userId ? 'border-red-500' : 'border-gray-300'
            } px-4 py-2 pl-11 focus:border-blue-500 focus:outline-none focus:ring-2 focus:ring-blue-200`}
            placeholder="아이디를 입력하세요"
            maxLength={20}
          />
        </div>
        {errors.userId && <p className="mt-1 text-sm text-red-500">{errors.userId}</p>}
      </div>

      <div className="space-y-2">
        <label htmlFor="nickname" className="block text-sm font-bold text-gray-700">
          닉네임
        </label>
        <div className="relative mt-2 rounded-md shadow-sm">
          <div className="pointer-events-none absolute inset-y-0 left-0 flex items-center pl-3 text-gray-400">
            <HiUser className="size-6" />
          </div>
          <input
            id="nickname"
            type="text"
            value={nickname}
            onChange={(e) => setNickname(e.target.value)}
            className={`w-full rounded-lg border ${
              errors.nickname ? 'border-red-500' : 'border-gray-300'
            } px-4 py-2 pl-11 focus:border-blue-500 focus:outline-none focus:ring-2 focus:ring-blue-200`}
            placeholder="닉네임을 입력하세요"
            maxLength={10}
          />
        </div>
        {errors.nickname && <p className="mt-1 text-sm text-red-500">{errors.nickname}</p>}
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
            className={`w-full rounded-lg border ${
              errors.password ? 'border-red-500' : 'border-gray-300'
            } px-4 py-2 pl-11 focus:border-blue-500 focus:outline-none focus:ring-2 focus:ring-blue-200`}
            placeholder="비밀번호를 입력하세요"
          />
          <button
            type="button"
            onClick={() => handleTogglePassword('password')}
            className="absolute right-3 top-1/2 -translate-y-1/2 text-gray-400 focus:outline-none cursor-pointer"
            aria-label={showPassword ? '비밀번호 숨기기' : '비밀번호 보기'}
          >
            {showPassword ? <HiEyeOff className="h-5 w-5" /> : <HiEye className="h-5 w-5" />}
          </button>
        </div>
        {errors.password && <p className="mt-1 text-sm text-red-500">{errors.password}</p>}
      </div>

      <div className="space-y-2">
        <label htmlFor="confirmPassword" className="block text-sm font-bold text-gray-700">
          비밀번호 확인
        </label>
        <div className="relative">
          <div className="pointer-events-none absolute left-3 top-1/2 -translate-y-1/2 text-gray-400">
            <HiLockClosed className="size-5" />
          </div>
          <input
            id="confirmPassword"
            type={showConfirmPassword ? 'text' : 'password'}
            value={confirmPassword}
            onChange={(e) => setConfirmPassword(e.target.value)}
            className={`w-full rounded-lg border ${
              errors.confirmPassword ? 'border-red-500' : 'border-gray-300'
            } px-4 py-2 pl-11 focus:border-blue-500 focus:outline-none focus:ring-2 focus:ring-blue-200`}
            placeholder="비밀번호를 한번 더 입력하세요"
          />
          <button
            type="button"
            onClick={() => handleTogglePassword('confirmPassword')}
            className="absolute right-3 top-1/2 -translate-y-1/2 text-gray-400 focus:outline-none cursor-pointer"
            aria-label={showConfirmPassword ? '비밀번호 숨기기' : '비밀번호 보기'}
          >
            {showConfirmPassword ? <HiEyeOff className="h-5 w-5" /> : <HiEye className="h-5 w-5" />}
          </button>
        </div>
        {errors.confirmPassword && (
          <p className="mt-1 text-sm text-red-500">{errors.confirmPassword}</p>
        )}
      </div>

      <button
        type="submit"
        className="w-full rounded-lg bg-blue-600 px-4 py-2 font-medium text-white transition-colors hover:bg-blue-800 focus:outline-none focus:ring-2 focus:ring-blue-500 focus:ring-offset-2 cursor-pointer"
      >
        회원가입
      </button>
    </form>
  );
};

export default SignUpForm;
