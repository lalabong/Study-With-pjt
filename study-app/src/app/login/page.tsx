'use client';

import AuthLayout from '../../components/common/AuthLayout';
import LoginForm from '../../components/login/LoginForm';

const LoginPage = () => {
  return (
    <AuthLayout showRegisterLink={true}>
      <LoginForm />
    </AuthLayout>
  );
};

export default LoginPage;
