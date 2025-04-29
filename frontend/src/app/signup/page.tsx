import AuthLayout from '@components/user/AuthLayout';
import SignUpForm from '@components/user/SignupForm';

import AuthRoute from '@/components/auth/AuthRoute';

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
