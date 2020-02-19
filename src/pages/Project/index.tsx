import React from 'react';
import { useAppContext } from 'context/AppContext';
import { Redirect } from '@reach/router';
import { ROUTES } from 'constant/routes';

const Project = () => {
  const { isLogin, getProjectId } = useAppContext();
  if (!isLogin()) {
    return <Redirect to={ROUTES.LOGIN} noThrow />;
  }

  if (!getProjectId()) {
    return <Redirect to={ROUTES.SELECT_PROJECT} noThrow />;
  }

  return <Redirect to={ROUTES.TESTSUITE} noThrow />;
};

export default Project;
