import React, { useState } from 'react';
import { useAppContext } from 'context/AppContext';
import { RouteComponentProps, Redirect } from '@reach/router';
import Layout from 'components/LoginLayout';
import LoginForm from 'components/LoginForm';
import { useMutation } from 'react-query';
import { repo } from 'api';
import { AuthResponse, AuthRequest } from 'types/app';
import { ROUTES } from 'constant/routes';

const LoginPage: React.FunctionComponent<RouteComponentProps> = () => {
  const { isLogin, setAuthState } = useAppContext();
  const [mutateLogin, { isLoading }] = useMutation<AuthResponse, AuthRequest>(
    req => repo.login(req.email, req.password)
  );

  if (isLogin()) {
    return <Redirect to="/" noThrow />;
  }

  async function onSubmit(values: { email: string; password: string }) {
    try {
      let req: AuthRequest = {
        email: values.email,
        password: values.password
      };
      const res = await mutateLogin(req);
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
      {isLoading && <div>Loading</div>}
    </Layout>
  );
};

export default LoginPage;
