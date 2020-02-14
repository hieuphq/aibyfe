import React from 'react';
import { Redirect, RouteComponentProps } from '@reach/router';
import { useAppContext } from 'context/AppContext';
import SignUpForm from 'components/SignUpForm';
import Layout from 'components/LoginLayout';
import { SignUpResponse, SignUpRequest } from 'types/app';
import { useMutation } from 'react-query';
import { repo } from 'api';

const SignUpPage: React.FunctionComponent<RouteComponentProps> = ({
  children
}) => {
  const [mutateSignup, { isLoading }] = useMutation<
    SignUpResponse,
    SignUpRequest
  >(req => repo.signup(req.email, req.password));

  var { isLogin, setAuthState } = useAppContext();

  if (isLogin()) {
    return <Redirect to="/" noThrow />;
  }

  async function onSubmit(values: { email: string; password: string }) {
    try {
      let req: SignUpRequest = {
        email: values.email,
        password: values.password
      };
      const res = await mutateSignup(req);
      setAuthState(res.data.token);
      console.log(res);
    } catch (err) {
      console.error(err);
    }
  }

  return (
    <Layout>
      <SignUpForm submit={onSubmit} />
      {isLoading && <div>Loading</div>}
    </Layout>
  );
};

export default SignUpPage;
