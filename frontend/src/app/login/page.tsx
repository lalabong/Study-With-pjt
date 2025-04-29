import AuthLayout from '@components/user/AuthLayout';
import LoginForm from '@components/user/LoginForm';

import AuthRoute from '@/components/auth/AuthRoute';

const LoginPage = () => {
  return (
    <AuthRoute>
      <AuthLayout showRegisterLink={true}>
        <LoginForm />
      </AuthLayout>
    </AuthRoute>
  );
};

export default LoginPage;
