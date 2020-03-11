import React from 'react';
import { useAppContext } from 'context/AppContext';
import { RouteComponentProps, Redirect } from '@reach/router';
import Layout from 'components/LoginLayout';
import LoginForm from 'components/LoginForm';
// import { useMutation } from 'swr';
import { repo } from 'api';
import { ROUTES } from 'constant/routes';

const LoginPage: React.FunctionComponent<RouteComponentProps> = () => {
  const { isLogin, setAuthState } = useAppContext();

  if (isLogin()) {
    return <Redirect to="/" noThrow />;
  }

  async function onSubmit(values: { email: string; password: string }) {
    try {
      const res = await repo.login(values.email, values.password);
      setAuthState(res.data.token);
    } catch (err) {
      console.error(err);
    }
  }

  return (
    <Layout>
      <LoginForm
        onSubmit={onSubmit}
        forgotPasswordLink={ROUTES.FORGOT_PASSWORD}
        signupLink={ROUTES.SIGNUP}
      />
    </Layout>
  );
};

export default LoginPage;
