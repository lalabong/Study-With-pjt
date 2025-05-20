'use client';

import { useState } from 'react';

import { HiIdentification, HiLockClosed, HiEye, HiEyeOff, HiUser } from 'react-icons/hi';

import { Button, Input } from '@components/common';

import { useSignupMutation } from '@hooks/api/useSignupMutation';
import { useValidateForm } from '@hooks/useValidateForm';

const SignUpForm = () => {
  const [userId, setUserId] = useState<string>('');
  const [nickname, setNickname] = useState<string>('');
  const [password, setPassword] = useState<string>('');
  const [confirmPassword, setConfirmPassword] = useState<string>('');
  const [showPassword, setShowPassword] = useState<boolean>(false);
  const [showConfirmPassword, setShowConfirmPassword] = useState<boolean>(false);

  const { mutate: signup, isPending } = useSignupMutation();

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
      signup({ userId, nickname, password });
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
          disabled={isPending}
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
          disabled={isPending}
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
              disabled={isPending}
            >
              {showPassword ? <HiEyeOff className="h-5 w-5" /> : <HiEye className="h-5 w-5" />}
            </button>
          }
          placeholder="비밀번호를 입력하세요"
          error={errors.password}
          disabled={isPending}
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
              disabled={isPending}
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
          disabled={isPending}
        />
      </div>

      <Button type="submit" variant="primary" size="md" fullWidth>
        회원가입
      </Button>
    </form>
  );
};

export default SignUpForm;
