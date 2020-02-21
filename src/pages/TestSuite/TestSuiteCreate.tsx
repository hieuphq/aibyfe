import React, { useState, useEffect } from 'react';
import { Card } from 'antd';
import { useAppContext } from 'context/AppContext';
import EditTestSuiteForm from 'components/EditTestSuiteForm';
import { useQuery } from 'react-query';
import { repo } from 'api';
import { TestCase } from '@types';
import { navigate } from '@reach/router';
import { ROUTES } from 'constant/routes';

export const TestSuiteCreatePage = () => {
  const { getProjectId } = useAppContext();
  const projectId = getProjectId() || '';
  const getTestCasesKey = 'get-test-cases';
  const { data } = useQuery(getTestCasesKey, () =>
    repo.getTestCases(projectId)
  );
  const [testCases, setTestCases] = useState<TestCase[]>([]);

  useEffect(() => {
    const tcs = data?.data || [];
    setTestCases(tcs);
  }, [data]);
  return (
    <>
      <h1>Create Test Suite</h1>
      <Card>
        <EditTestSuiteForm
          submit={async val => {
            try {
              await repo.createTestSuite({
                projectId: projectId,
                name: val.name,
                testCases: val.testCases
              });
              navigate(ROUTES.TESTSUITE);
            } catch (err) {
              console.log(err);
            }
          }}
          testcases={testCases}
        ></EditTestSuiteForm>
      </Card>
    </>
  );
};
