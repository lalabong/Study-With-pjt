'use client';

import { useRouter } from 'next/navigation';
import { useState } from 'react';
import { HiIdentification, HiLockClosed, HiEye, HiEyeOff, HiUser } from 'react-icons/hi';
import { toast } from 'react-toastify';

import { Input } from '@/components/common';
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
        <Input
          id="userId"
          label="아이디"
          type="text"
          value={userId}
          onChange={(e) => setUserId(e.target.value)}
          icon={<HiIdentification className="size-6" />}
          placeholder="아이디를 입력하세요"
          maxLength={20}
          error={errors.userId}
        />
      </div>

      <div className="space-y-2">
        <Input
          id="nickname"
          label="닉네임"
          type="text"
          value={nickname}
          onChange={(e) => setNickname(e.target.value)}
          icon={<HiUser className="size-6" />}
          placeholder="닉네임을 입력하세요"
          maxLength={10}
          error={errors.nickname}
        />
      </div>

      <div className="space-y-2">
        <Input
          id="password"
          label="비밀번호"
          type={showPassword ? 'text' : 'password'}
          value={password}
          onChange={(e) => setPassword(e.target.value)}
          icon={<HiLockClosed className="size-5" />}
          rightIcon={
            <button
              type="button"
              onClick={() => handleTogglePassword('password')}
              className="focus:outline-none cursor-pointer text-gray-400"
              aria-label={showPassword ? '비밀번호 숨기기' : '비밀번호 보기'}
            >
              {showPassword ? <HiEyeOff className="h-5 w-5" /> : <HiEye className="h-5 w-5" />}
            </button>
          }
          placeholder="비밀번호를 입력하세요"
          error={errors.password}
        />
      </div>

      <div className="space-y-2">
        <Input
          id="confirmPassword"
          label="비밀번호 확인"
          type={showConfirmPassword ? 'text' : 'password'}
          value={confirmPassword}
          onChange={(e) => setConfirmPassword(e.target.value)}
          icon={<HiLockClosed className="size-5" />}
          rightIcon={
            <button
              type="button"
              onClick={() => handleTogglePassword('confirmPassword')}
              className="focus:outline-none cursor-pointer text-gray-400"
              aria-label={showConfirmPassword ? '비밀번호 숨기기' : '비밀번호 보기'}
            >
              {showConfirmPassword ? (
                <HiEyeOff className="h-5 w-5" />
              ) : (
                <HiEye className="h-5 w-5" />
              )}
            </button>
          }
          placeholder="비밀번호를 한번 더 입력하세요"
          error={errors.confirmPassword}
        />
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
