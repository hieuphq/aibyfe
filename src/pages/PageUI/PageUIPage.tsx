import React, { useState, useEffect } from 'react';
import { useAppContext } from 'context/AppContext';
import { useQuery } from 'react-query';
import { repo } from 'api';
import { Page } from '@types';
import { Button, Table } from 'antd';
import { navigate, Link } from '@reach/router';
import { ROUTES } from 'constant/routes';
import { PlusOutlined } from '@ant-design/icons';

type PageView = Page & { key: number };
export const PageUIPage = () => {
  const { getProjectId } = useAppContext();
  const projectId = getProjectId();
  const getPagesKey = 'get-pages' + projectId;
  const { data } = useQuery(getPagesKey, () => repo.getPages(projectId));
  const [pages, setPages] = useState<PageView[]>([]);

  const addButtonOnClick = (e: any): void => {
    navigate(ROUTES.PAGE_NEW);
  };

  useEffect(() => {
    if (data?.data) {
      const ps: Page[] = data?.data || [];
      const pvs: PageView[] = ps.map((itm, idx) => {
        return { ...itm, key: idx };
      });
      setPages(pvs);
      return;
    }
    setPages([]);
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
      render: (name: string, { id }: PageView) => (
        <Link to={ROUTES.PAGE + '/' + id.toString()}>{name}</Link>
      )
    },
    {
      title: 'Action',
      key: 'action',
      render: (itm: PageView) => {
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

  return (
    <>
      <h1>Pages</h1>
      <Button type="primary" icon={<PlusOutlined />} onClick={addButtonOnClick}>
        Add
      </Button>
      <Table dataSource={pages} columns={columns}></Table>
    </>
  );
};
