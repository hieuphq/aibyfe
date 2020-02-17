import React, { useEffect, useState } from 'react';
import { RouteComponentProps } from '@reach/router';
import { Card, Descriptions, Divider, Table, Button } from 'antd';
import { useQuery, useMutation } from 'react-query';
import { repo } from 'api';
import { TestCase } from 'types/app';
import styled from 'styled-components';
import { AddTestCase } from 'components/AddTestCase';

const TitleHeader = styled.div`
  margin-bottom: 20px;
  color: rgba(0, 0, 0, 0.85);
  font-weight: bold;
  font-size: 16px;
  line-height: 1.5;
`;
export interface TestSuiteDetailPageProps extends RouteComponentProps {
  testSuiteId?: string;
}
const TestSuiteDetailPage = ({ testSuiteId }: TestSuiteDetailPageProps) => {
  const [visibleAddTestCase, setVisibleAddTestCase] = useState(false);
  const { data, isLoading } = useQuery('get-test-suites' + testSuiteId, () =>
    repo.getTestSuite(testSuiteId || '')
  );

  // safe to assume data now exist and you can use data.
  const mutatedData = React.useMemo(() => {
    // if you want to mutate the data for some reason
    return data;
  }, [data]);

  const [removeTestCaseMutation] = useMutation(
    (values: { testSuiteId: string; testCaseId: string }) => {
      return repo.removeTestcaseInSuite(values.testSuiteId, values.testCaseId);
    },
    {
      refetchQueries: ['get-test-suites' + testSuiteId],
      // to revalidate the data and ensure the UI doesn't
      // remain in an incorrect state, ALWAYS trigger a
      // a refetch of the data, even on failure
      refetchQueriesOnFailure: true
    }
  );

  async function handleDeleteTestcase(testSuiteId: string, testCaseId: string) {
    try {
      // send text to the API
      await removeTestCaseMutation({ testSuiteId, testCaseId });
    } catch (err) {
      console.error(err);
    }
  }

  const columns = [
    {
      title: 'ID',
      dataIndex: 'id',
      key: 'id'
    },
    {
      title: 'Name',
      dataIndex: 'name',
      key: 'name'
    },
    {
      title: 'Action',
      dataIndex: '',
      key: '',
      render: (tc: TestCase) => {
        return (
          <div>
            <Button
              onClick={e => handleDeleteTestcase(testSuiteId || '', tc.id)}
              type="link"
            >
              Delete
            </Button>
          </div>
        );
      }
    }
  ];

  return (
    <>
      <h1>TestSuiteDetailPage</h1>
      <Card>
        <Descriptions
          title="Basic Infomation"
          layout="vertical"
          column={{ xxl: 4, xl: 3, lg: 3, md: 3, sm: 2, xs: 1 }}
        >
          <Descriptions.Item label="ID">
            {mutatedData?.data?.id}
          </Descriptions.Item>
          <Descriptions.Item label="Name">
            {mutatedData?.data?.name}
          </Descriptions.Item>
        </Descriptions>
        <Divider />
        <TitleHeader>Test cases</TitleHeader>
        <Button
          type="primary"
          onClick={() => {
            setVisibleAddTestCase(true);
          }}
        >
          Add
        </Button>
        <Table
          dataSource={mutatedData?.data?.testCases}
          columns={columns}
        ></Table>
      </Card>
      {/* {mutatedData ? () :()} */}
      {isLoading && <h1>Loading</h1>}
      <AddTestCase
        testSuiteId={testSuiteId || ''}
        visible={visibleAddTestCase}
        onOk={data => {
          setVisibleAddTestCase(false);
          console.log(data);
        }}
        onCancel={() => {
          setVisibleAddTestCase(false);
        }}
      ></AddTestCase>
    </>
  );
};

export default TestSuiteDetailPage;
