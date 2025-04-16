'use client';

import SignUpForm from '@/components/user/SignupForm';
import AuthLayout from '@/components/user/AuthLayout';

const SignUpPage = (): React.ReactNode => {
  return (
    <AuthLayout showRegisterLink={false}>
      <SignUpForm />
    </AuthLayout>
  );
};

export default SignUpPage;
