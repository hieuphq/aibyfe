import React from 'react';
import { Redirect, RouteComponentProps } from '@reach/router';
import { useAppContext } from 'context/AppContext';
import SignUpForm from 'components/SignUpForm';
import Layout from 'components/LoginLayout';
import { repo } from 'api';

const SignUpPage: React.FunctionComponent<RouteComponentProps> = ({
  children
}) => {
  var { isLogin, setAuthState } = useAppContext();

  if (isLogin()) {
    return <Redirect to="/" noThrow />;
  }

  async function onSubmit(values: { email: string; password: string }) {
    try {
      const res = await repo.signup(values.email, values.password);
      setAuthState(res.data.token);
    } catch (err) {
      console.error(err);
    }
  }

  return (
    <Layout>
      <SignUpForm submit={onSubmit} />
    </Layout>
  );
};

export default SignUpPage;
