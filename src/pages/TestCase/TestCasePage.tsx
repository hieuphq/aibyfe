import React, { useEffect, useState } from 'react';
import { RouteComponentProps, navigate, Link } from '@reach/router';
import { Table, Button } from 'antd';
import { useQuery } from 'react-query';
import { repo } from 'api';
import { TestCase } from 'types/app';
import { ROUTES } from 'constant/routes';
import { useAppContext } from 'context/AppContext';

type TestCaseView = TestCase & { key: number };

export interface TestCasePageProps extends RouteComponentProps {}
export const TestCasePage = () => {
  const { getProjectId } = useAppContext();
  const projectId = getProjectId() || '';
  const { data, isLoading } = useQuery('get-test-cases', () =>
    repo.getTestCases(projectId)
  );

  const [TestCases, setTestCases] = useState<TestCaseView[]>([]);
  useEffect(() => {
    const ts = data?.data || [];
    const TestCases = ts.map((itm, index) => {
      return { ...itm, key: index };
    });
    setTestCases(TestCases);
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
      render: (name: string, { id }: TestCase) => (
        <Link to={ROUTES.TESTCASE + '/' + id.toString()}>{name}</Link>
      )
    },
    {
      title: 'Action',
      key: 'action',
      render: (itm: TestCase) => {
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
    navigate(ROUTES.TESTCASE_NEW);
  };

  return (
    <>
      <h1>TestCasePage</h1>
      <Button type="primary" icon="plus" onClick={addButtonOnClick}>
        Add
      </Button>
      <Table dataSource={TestCases} columns={columns}></Table>
      {/* {mutatedData ? () :()} */}
      {isLoading && <h1>Loading</h1>}
    </>
  );
};
