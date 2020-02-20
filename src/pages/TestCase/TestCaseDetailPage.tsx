import React, { useEffect, useState } from 'react';
import { RouteComponentProps } from '@reach/router';
import { Card, Descriptions, Divider, Table, Button } from 'antd';
import { useQuery, useMutation } from 'react-query';
import { repo } from 'api';
import { TestCase, Step } from 'types/app';
import styled from 'styled-components';
import { AddTestCase } from 'components/AddTestCase';
import { useAppContext } from 'context/AppContext';

const TitleHeader = styled.div`
  margin-bottom: 20px;
  color: rgba(0, 0, 0, 0.85);
  font-weight: bold;
  font-size: 16px;
  line-height: 1.5;
`;

type StepView = Step & { state: 'normal' | 'updating' | 'deleting' };
export interface TestCaseDetailPageProps extends RouteComponentProps {
  testCaseId?: string;
}

export const TestCaseDetailPage = ({ testCaseId }: TestCaseDetailPageProps) => {
  const { getProjectId } = useAppContext();
  const getTestCaseQueryKey = 'get-test-cases' + testCaseId;
  const [visibleAddTestCase, setVisibleAddTestCase] = useState(false);
  const { data, isLoading } = useQuery(getTestCaseQueryKey, () =>
    repo.getTestCase(testCaseId || '')
  );

  const [testCase, setTestCase] = useState<TestCase | null>(null);
  const [stepViews, setStepViews] = useState<StepView[]>([]);

  useEffect(() => {
    if (data?.data) {
      const ts: TestCase = data?.data as TestCase;
      const steps: Step[] = ts.steps || [];
      setTestCase(ts);

      setStepViews(
        steps.map(itm => {
          return { ...itm, state: 'normal' };
        })
      );
    }
  }, [data]);

  //   const [removeTestCaseMutation] = useMutation(
  //     (values: { testCaseId: string; testCaseId: string }) => {
  //       return repo.removeTestcaseFromSuite(values.testCaseId, values.testCaseId);
  //     },
  //     {
  //       refetchQueries: [getTestCaseQueryKey, getTestCaseAddingQueryKey],
  //       refetchQueriesOnFailure: true
  //     }
  //   );

  //   const [addTestCaseMutation] = useMutation(
  //     (values: { testCaseId: string; testCaseId: string }) => {
  //       return repo.addTestcaseToSuite(values.testCaseId, values.testCaseId);
  //     },
  //     {
  //       refetchQueries: [getTestCaseQueryKey, getTestCaseAddingQueryKey],
  //       refetchQueriesOnFailure: true
  //     }
  //   );

  //   async function handleDeleteTestcase(testCaseId: string, testCaseId: string) {
  //     try {
  //       // send text to the API
  //       await removeTestCaseMutation({ testCaseId, testCaseId });
  //     } catch (err) {
  //       console.error(err);
  //     }
  //   }

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
    }
  ];

  return (
    <>
      <h1>Test Case Detail</h1>
      <Card>
        <Descriptions
          title="Basic Infomation"
          layout="vertical"
          column={{ xxl: 4, xl: 3, lg: 3, md: 3, sm: 2, xs: 1 }}
        >
          <Descriptions.Item label="ID">{testCase?.id}</Descriptions.Item>
          <Descriptions.Item label="Name">{testCase?.name}</Descriptions.Item>
        </Descriptions>
        <Divider />
        <TitleHeader>Steps</TitleHeader>
        <Table dataSource={stepViews} columns={columns}></Table>
      </Card>
      {/* {mutatedData ? () :()} */}
    </>
  );
};
