'use client';

import AuthLayout from '@/components/user/AuthLayout';
import SignUpForm from '@/components/user/SignupForm';

const SignUpPage = (): React.ReactNode => {
  return (
    <AuthLayout showRegisterLink={false}>
      <SignUpForm />
    </AuthLayout>
  );
};

export default SignUpPage;
