import AuthRoute from '@components/router/AuthRoute';
import AuthLayout from '@components/user/AuthLayout';
import SignUpForm from '@components/user/SignupForm';

const SignUpPage = (): React.ReactNode => {
  return (
    <AuthRoute>
      <AuthLayout showRegisterLink={false}>
        <SignUpForm />
      </AuthLayout>
    </AuthRoute>
  );
};

export default SignUpPage;
