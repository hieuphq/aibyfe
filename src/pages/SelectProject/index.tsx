import React, { useEffect } from 'react';
import { RouteComponentProps, Redirect } from '@reach/router';
import { useAppContext } from 'context/AppContext';
import { ROUTES } from 'constant/routes';
import Layout from 'components/LoginLayout';

export interface SelectProjectProps extends RouteComponentProps {}

const SelectProjectPage: React.FC<SelectProjectProps> = () => {
  const { getProjectId } = useAppContext();
  const currPId = getProjectId();
  if (!!currPId) {
    return <Redirect to={ROUTES.HOME} noThrow />;
  }

  return (
    <Layout>
      <h1>select</h1>
    </Layout>
  );
};

export default SelectProjectPage;
