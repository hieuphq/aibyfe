import React, { useEffect, useState } from 'react';
import { RouteComponentProps, navigate, Link } from '@reach/router';
import { Table, Button } from 'antd';
import { useQuery } from 'react-query';
import { repo } from 'api';
import { TestSuite } from 'types/app';
import { ROUTES } from 'constant/routes';
import { useAppContext } from 'context/AppContext';

export interface TestSuitePageProps extends RouteComponentProps {}
const TestSuitePage = ({}: TestSuitePageProps) => {
  const { getProjectId } = useAppContext();
  // TODO: will remove "1"
  const projectId = getProjectId() || '1';
  const { data, isLoading } = useQuery('get-test-suites', () =>
    repo.getTestSuites(projectId)
  );

  // safe to assume data now exist and you can use data.
  const mutatedData = React.useMemo(() => {
    // if you want to mutate the data for some reason
    return data;
  }, [data]);

  const columns = [
    {
      title: 'ID',
      dataIndex: 'id',
      key: 'id'
    },
    {
      title: 'Name',
      dataIndex: 'name',
      key: 'name',
      render: (name: string, { id }: TestSuite) => (
        <Link to={ROUTES.TESTSUITE + '/' + id.toString()}>{name}</Link>
      )
    },
    {
      title: 'Action',
      key: 'id',
      render: (itm: TestSuite) => {
        return (
          <div>
            <Button type="link" block>
              Delete
            </Button>
          </div>
        );
      }
    }
  ];

  const addButtonOnClick = (e: any): void => {
    navigate(ROUTES.TESTSUITE_NEW);
  };

  return (
    <>
      <h1>TestSuitePage</h1>
      <Button type="primary" icon="plus" onClick={addButtonOnClick}>
        Add
      </Button>
      <Table dataSource={mutatedData?.data} columns={columns}></Table>
      {/* {mutatedData ? () :()} */}
      {isLoading && <h1>Loading</h1>}
    </>
  );
};

export default TestSuitePage;
