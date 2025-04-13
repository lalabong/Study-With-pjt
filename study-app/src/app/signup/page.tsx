'use client';

import AuthLayout from '../../components/common/AuthLayout';
import SignUpForm from '../../components/signUp/SignUpForm';

const SignUpPage = (): React.ReactNode => {
  return (
    <AuthLayout showRegisterLink={false}>
      <SignUpForm />
    </AuthLayout>
  );
};

export default SignUpPage;
