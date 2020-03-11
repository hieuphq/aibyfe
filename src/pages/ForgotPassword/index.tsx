import React from 'react';
import { Redirect } from '@reach/router';
import { useAppContext } from 'context/AppContext';

const ForgotPasswordPage = () => {
  var { isLogin } = useAppContext();

  if (isLogin()) {
    return <Redirect to="/" noThrow />;
  }

  return <div>Forgot password</div>;
};

export default ForgotPasswordPage;
