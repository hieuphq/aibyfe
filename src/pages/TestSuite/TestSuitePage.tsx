import React, { useEffect, useState } from 'react';
import { RouteComponentProps, navigate, Link } from '@reach/router';
import { Table, Button } from 'antd';
import { useQuery } from 'react-query';
import { repo } from 'api';
import { TestSuite } from '@types';
import { ROUTES } from 'constant/routes';
import { useAppContext } from 'context/AppContext';
import { PlusOutlined } from '@ant-design/icons';

type TestSuiteView = TestSuite & { key: number };

export interface TestSuitePageProps extends RouteComponentProps {}

export const TestSuitePage = () => {
  const { getProjectId } = useAppContext();
  const projectId = getProjectId() || '';
  const { data } = useQuery('get-test-suites', () =>
    repo.getTestSuites(projectId)
  );

  const [testSuites, setTestSuites] = useState<TestSuiteView[]>([]);
  useEffect(() => {
    const ts = data?.data || [];
    const testSuites = ts.map((itm, index) => {
      return { ...itm, key: index };
    });
    setTestSuites(testSuites);
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
      key: 'action',
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
      <h1>Test Suites</h1>
      <Button type="primary" icon={<PlusOutlined />} onClick={addButtonOnClick}>
        Add
      </Button>
      <Table dataSource={testSuites} columns={columns}></Table>
    </>
  );
};
