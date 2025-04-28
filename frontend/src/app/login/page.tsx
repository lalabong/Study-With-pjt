import AuthLayout from '@components/user/AuthLayout';
import LoginForm from '@components/user/LoginForm';

const LoginPage = () => {
  return (
    <AuthLayout showRegisterLink={true}>
      <LoginForm />
    </AuthLayout>
  );
};

export default LoginPage;
