import React, { useEffect, useState } from 'react';
import { RouteComponentProps } from '@reach/router';
import { Card, Descriptions, Divider, Table } from 'antd';
import { useQuery } from 'react-query';
import { repo } from 'api';
import { TestCase } from 'types/app';
import styled from 'styled-components';

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
  const { data, isLoading } = useQuery('get-test-suites' + testSuiteId, () =>
    repo.getTestSuite(testSuiteId || '')
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
      key: 'name'
    },
    {
      title: 'Action',
      dataIndex: '',
      key: '',
      render: (text: TestCase) => {
        return <div>{text.sort}</div>;
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
          <Descriptions.Item label="Created At">
            {mutatedData?.data?.createdAt.toString()}
          </Descriptions.Item>
          <Descriptions.Item label="Updated At">
            {mutatedData?.data?.updatedAt.toString()}
          </Descriptions.Item>
        </Descriptions>
        <Divider />
        <TitleHeader>Test cases</TitleHeader>
        <Table
          dataSource={mutatedData?.data?.testCases}
          columns={columns}
        ></Table>
      </Card>
      {/* {mutatedData ? () :()} */}
      {isLoading && <h1>Loading</h1>}
    </>
  );
};

export default TestSuiteDetailPage;
