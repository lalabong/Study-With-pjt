import AuthRoute from '@components/router/AuthRoute';
import AuthLayout from '@components/user/AuthLayout';
import LoginForm from '@components/user/LoginForm';

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
