'use client';

import { useState } from 'react';

import { HiIdentification, HiLockClosed, HiEye, HiEyeOff } from 'react-icons/hi';

import { Button, Input } from '@components/common';

import { useLoginMutation } from '@hooks/api/useLoginMutaion';
import { useValidateForm } from '@hooks/useValidateForm';

const LoginForm = () => {
  const [userId, setUserId] = useState<string>('');
  const [password, setPassword] = useState<string>('');
  const [showPassword, setShowPassword] = useState<boolean>(false);

  const { mutate: login } = useLoginMutation();

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
      login({ userId, password });
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

      <Button type="submit" variant="primary" size="md" fullWidth>
        로그인
      </Button>
    </form>
  );
};

export default LoginForm;
