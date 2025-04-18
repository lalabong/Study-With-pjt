'use client';

import { useRouter } from 'next/navigation';
import { useState } from 'react';
import { HiIdentification, HiLockClosed, HiEye, HiEyeOff } from 'react-icons/hi';
import { toast } from 'react-toastify';

import { Input } from '@/components/common';
import { USER_ERROR_MESSAGES } from '@/constants/errorMessages';
import { USER_SUCCESS_MESSAGES } from '@/constants/successMessages';
import { useValidateForm } from '@/hooks/useValidateForm';
import { useAuthStore } from '@/stores/authStore';

const LoginForm = () => {
  const router = useRouter();
  const [userId, setUserId] = useState<string>('');
  const [password, setPassword] = useState<string>('');
  const [showPassword, setShowPassword] = useState<boolean>(false);
  const { errors, validateForm } = useValidateForm({
    userId: { value: userId, validate: true },
    password: { value: password, validate: true },
  });

  const handleTogglePassword = (): void => {
    setShowPassword(!showPassword);
  };

  const handleLogin = async (e: React.FormEvent<HTMLFormElement>): Promise<void> => {
    e.preventDefault();

    if (validateForm()) {
      console.warn('로그인 시도:', { userId, password });
      const data = { userId, password };
      try {
        await useAuthStore.getState().login(
          data,
          () => {
            toast.success(USER_SUCCESS_MESSAGES.LOGIN_SUCCESS);
            router.push('/mypage');
          },
          (errorMsg) => {
            toast.error(errorMsg);
          },
        );
      } catch (error) {
        console.error(USER_ERROR_MESSAGES.LOGIN_FAILED, error);
      }
    }
  };

  return (
    <form onSubmit={handleLogin} className="space-y-4">
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
            onClick={handleTogglePassword}
            className="focus:outline-none cursor-pointer text-gray-400"
            aria-label={showPassword ? '비밀번호 숨기기' : '비밀번호 보기'}
          >
            {showPassword ? <HiEyeOff className="h-5 w-5" /> : <HiEye className="h-5 w-5" />}
          </button>
        }
        placeholder="비밀번호를 입력하세요"
        error={errors.password}
      />

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
