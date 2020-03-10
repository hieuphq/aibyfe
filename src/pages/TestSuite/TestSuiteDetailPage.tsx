import React, { useEffect, useState, useCallback } from 'react';
import { RouteComponentProps } from '@reach/router';
import { Card, Descriptions, Divider, Table, Button } from 'antd';
import { useQuery, useMutation, queryCache } from 'react-query';

import { repo } from 'api';
import { TestCase, TestSuite } from '@types';
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

type TestCaseView = TestCase & { key: number };

export interface TestSuiteDetailPageProps extends RouteComponentProps {
  testSuiteId?: string;
}

export const TestSuiteDetailPage = ({
  testSuiteId
}: TestSuiteDetailPageProps) => {
  const { getProjectId } = useAppContext();
  const getTestSuiteQueryKey = 'get-test-suites' + testSuiteId;
  const getTestCaseAddingQueryKey = 'get-test-cases-adding' + testSuiteId;
  const [visibleAddTestCase, setVisibleAddTestCase] = useState(false);
  const [testSuite, setTestSuite] = useState<TestSuite | null>(null);
  const [selectedTestCases, setSelectedTestCases] = useState<TestCaseView[]>(
    []
  );

  const { data, refetch } = useQuery(getTestSuiteQueryKey, () => {
    return repo.getTestSuite(testSuiteId || '');
  });

  const { data: testCasesRaw, refetch: refetchAddingData } = useQuery(
    getTestCaseAddingQueryKey,
    () => {
      return repo.getTestCasesForAddingFlow(
        getProjectId() || '',
        testSuiteId || ''
      );
    }
  );

  const [removeTestcase] = useMutation(
    (values: { testSuiteId: string; testCaseId: string }) => {
      return repo.removeTestcaseFromSuite(
        values.testSuiteId,
        values.testCaseId
      );
    },
    {
      onSuccess: () => {
        queryCache.refetchQueries(getTestSuiteQueryKey);
        queryCache.refetchQueries(getTestCaseAddingQueryKey);
      }
    }
  );

  const [addTestcase] = useMutation(
    (values: { testSuiteId: string; testCaseId: string[] }) => {
      return repo.addTestcaseToSuite(values.testSuiteId, values.testCaseId);
    },
    {
      onSuccess: () => {
        queryCache.refetchQueries(getTestSuiteQueryKey);
        queryCache.refetchQueries(getTestCaseAddingQueryKey);
      }
    }
  );
  useEffect(() => {
    if (data) {
      const ts: TestSuite | null = data?.data ? { ...data.data } : null;
      const tcs = data?.data?.testCases || [];
      const tcvs: TestCaseView[] = tcs.map((itm, index) => {
        return { ...itm, key: index };
      });
      setTestSuite(ts);
      setSelectedTestCases(tcvs);
    }
  }, [data]);

  const [testCases, setTestCases] = useState<TestCase[]>([]);
  const [selectedTestCaseIds, setSelectedTestCaseIds] = useState<string[]>([]);
  useEffect(() => {
    const tcs = testCasesRaw?.data?.testcases || [];
    setTestCases(tcs);

    const stcs = testCasesRaw?.data?.selectedTestcases || [];
    const stcIds = stcs.map(itm => itm.id);
    setSelectedTestCaseIds(stcIds);
  }, [testCasesRaw]);

  async function handleDeleteTestcase(testSuiteId: string, testCaseId: string) {
    try {
      await removeTestcase({ testSuiteId, testCaseId });
    } catch (err) {
      console.error(err);
    }
  }

  async function handleAddTestcase(testSuiteId: string, testCaseId: string[]) {
    try {
      const res = await addTestcase({ testSuiteId, testCaseId });
      console.log(res);
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
      key: 'action',
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
      <h1>Test Suite Detail Page</h1>
      <Card>
        <Descriptions
          title="Basic Infomation"
          column={{ xxl: 4, xl: 3, lg: 3, md: 3, sm: 2, xs: 1 }}
        >
          <Descriptions.Item label="ID">{testSuite?.id}</Descriptions.Item>
          <Descriptions.Item label="Name">{testSuite?.name}</Descriptions.Item>
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
        <Table dataSource={selectedTestCases} columns={columns}></Table>
      </Card>
      <AddTestCase
        testCases={testCases}
        selectedTestCaseIds={selectedTestCaseIds}
        testSuiteId={testSuiteId || ''}
        visible={visibleAddTestCase}
        onOk={data => {
          setVisibleAddTestCase(false);
          handleAddTestcase(testSuiteId || '', data.willSelect);
        }}
        onCancel={() => {
          setVisibleAddTestCase(false);
        }}
      ></AddTestCase>
    </>
  );
};
