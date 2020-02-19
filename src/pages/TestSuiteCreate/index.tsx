import React, { useState, useEffect } from 'react';
import { Card } from 'antd';
import { useAppContext } from 'context/AppContext';
import EditTestSuiteForm from 'components/EditTestSuiteForm';
import { useQuery, useMutation } from 'react-query';
import { repo } from 'api';
import { TestCase } from 'types/app';
import { navigate } from '@reach/router';
import { ROUTES } from 'constant/routes';

const TestSuiteCreatePage = () => {
  const { getProjectId } = useAppContext();
  const projectId = getProjectId() || '';
  const getTestCasesKey = 'get-test-cases';
  const { data } = useQuery(getTestCasesKey, () =>
    repo.getTestCases(projectId)
  );
  const [testCases, setTestCases] = useState<TestCase[]>([]);

  const [addTestSuiteMutation] = useMutation(
    (values: { name: string; testCases: string[] }) => {
      return repo.createTestSuite({
        projectId: projectId,
        name: values.name,
        testCases: values.testCases
      });
    },
    {
      refetchQueries: [],
      refetchQueriesOnFailure: true
    }
  );

  useEffect(() => {
    const tcs = data?.data || [];
    setTestCases(tcs);
  }, [data]);
  return (
    <>
      <h1>TestSuiteCreatePage</h1>
      <Card>
        <EditTestSuiteForm
          submit={val => {
            addTestSuiteMutation({ name: val.name, testCases: val.testCases });
            navigate(ROUTES.TESTSUITE);
          }}
          testcases={testCases}
        ></EditTestSuiteForm>
      </Card>
    </>
  );
};

export default TestSuiteCreatePage;
