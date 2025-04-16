'use client';

import SignUpForm from '@components/auth/SignupForm';
import AuthLayout from '@components/common/AuthLayout';

const SignUpPage = (): React.ReactNode => {
  return (
    <AuthLayout showRegisterLink={false}>
      <SignUpForm />
    </AuthLayout>
  );
};

export default SignUpPage;
