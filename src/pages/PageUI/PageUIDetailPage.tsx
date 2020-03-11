import React, { useEffect, useState } from 'react';
import { RouteComponentProps } from '@reach/router';
import { Card, Descriptions, Divider, Button, Drawer, Table } from 'antd';
import { useQuery } from 'react-query';
import { repo } from 'api';
import { Page } from 'types';
import styled from 'styled-components';
import { PlusOutlined } from '@ant-design/icons';
import { CreateActionForm } from 'components/CreateActionForm';
import { Action } from 'types/action';

const TitleHeader = styled.div`
  margin-bottom: 20px;
  color: rgba(0, 0, 0, 0.85);
  font-weight: bold;
  font-size: 16px;
  line-height: 1.5;
`;

export interface PageUIDetailPageProps extends RouteComponentProps {
  pageId?: string;
}

type ActionView = Action & { key: number };

export const PageUIDetailPage = ({ pageId }: PageUIDetailPageProps) => {
  const getPageQueryKey = 'get-page' + pageId;
  const { data, refetch } = useQuery(getPageQueryKey, () =>
    repo.getPage(pageId || '')
  );

  const [page, setPage] = useState<Page | null>(null);
  const [actionViews, setActionViews] = useState<ActionView[]>([]);
  const [addActionVisible, setAddActionVisible] = useState(false);

  useEffect(() => {
    if (data?.data) {
      const ts: Page = data?.data as Page;
      setPage(ts);

      const as = data.data.actions || [];
      setActionViews(
        as.map((itm, idx) => {
          return { ...itm, key: idx };
        })
      );
      return;
    }
    setPage(null);
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
    }
  ];

  return (
    <>
      <h1>Page Detail</h1>
      <Card>
        <Descriptions
          title="Basic Infomation"
          column={{ xxl: 4, xl: 3, lg: 3, md: 3, sm: 2, xs: 1 }}
        >
          <Descriptions.Item label="ID">{page?.id}</Descriptions.Item>
          <Descriptions.Item label="Name">{page?.name}</Descriptions.Item>
        </Descriptions>
        <Divider />
        <TitleHeader>Actions</TitleHeader>
        <Button
          type="primary"
          icon={<PlusOutlined />}
          onClick={() => {
            setAddActionVisible(true);
          }}
        >
          Add
        </Button>
        <Table dataSource={actionViews} columns={columns}></Table>
      </Card>
      <Drawer
        title="Create an Action"
        width={720}
        visible={addActionVisible}
        onClose={e => {
          setAddActionVisible(false);
        }}
      >
        <CreateActionForm
          pageId={pageId || ''}
          onSuccess={() => {
            refetch().then(() => {
              setAddActionVisible(false);
            });
          }}
        />
      </Drawer>
    </>
  );
};
