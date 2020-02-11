import React, { useState } from 'react';
import { useAppContext } from 'context/AppContext';
import { RouteComponentProps, Redirect } from '@reach/router';
import Layout from 'components/LoginLayout';
import LoginForm from 'components/LoginForm';
import { useQuery, useMutation } from 'react-query';
import { repo } from 'api';
import { AuthResponse, AuthRequest } from 'types/app';

const LoginPage: React.FunctionComponent<RouteComponentProps> = ({
  children
}) => {
  const { appState, setAuthState } = useAppContext();
  const isLogin = appState.auth?.isLogin;
  const [mutateLogin, { isLoading }] = useMutation<AuthResponse, AuthRequest>(
    req => repo.login(req.email, req.password)
  );

  if (isLogin) {
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
      console.log(res);
    } catch (err) {
      console.error(err);
    }
  }

  return (
    <Layout>
      <LoginForm onSubmit={onSubmit} />
      {isLoading && <div>Loading</div>}
    </Layout>
  );
};

export default LoginPage;
