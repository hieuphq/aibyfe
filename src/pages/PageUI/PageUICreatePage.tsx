import React from 'react';
import { RouteComponentProps, navigate } from '@reach/router';
import { Card } from 'antd';
import EditForm from './components/EditForm';
import { repo } from 'api';
import { useAppContext } from 'context/AppContext';
import { ROUTES } from 'constant/routes';

export interface PageUICreateProps extends RouteComponentProps {}
export const PageUICreatePage = () => {
  const { getProjectId } = useAppContext();
  const projectId = getProjectId();

  return (
    <>
      <h1>Create Page</h1>
      <Card>
        <EditForm
          submit={async val => {
            try {
              await repo.createPage({
                projectId: projectId,
                name: val.name
              });
              navigate(ROUTES.PAGE);
            } catch (err) {
              console.log(err);
            }
          }}
        ></EditForm>
      </Card>
    </>
  );
};
