import React, { useEffect, useState, useMemo } from 'react';
import { RouteComponentProps, Redirect, navigate } from '@reach/router';
import { useAppContext } from 'context/AppContext';
import { ROUTES } from 'constant/routes';
import Layout from 'components/LoginLayout';
import { Card, Select, Button, Divider, Row, message } from 'antd';
import { CheckOutlined } from '@ant-design/icons';
import { repo } from 'api';
import { useQuery } from 'react-query';
import { Project } from '@types';

const { Option } = Select;

export interface SelectProjectProps extends RouteComponentProps {}

const SelectProjectPage: React.FC<SelectProjectProps> = () => {
  const { data } = useQuery('get-projects', () => repo.getProjects());
  const [projects, setProjects] = useState<Project[]>([]);
  const [selectedPId, setSelectedPId] = useState<string>('');
  useEffect(() => {
    const dt = data?.data || [];
    setProjects([...dt]);
  }, [data]);

  const { isLogin, getProjectId, setProjectId } = useAppContext();
  if (!isLogin()) {
    return <Redirect to={ROUTES.LOGIN} noThrow />;
  }
  const currPId = getProjectId();
  if (!!currPId) {
    return <Redirect to={ROUTES.HOME} noThrow />;
  }

  return (
    <Layout>
      <Card
        title="Select a Project"
        bordered={true}
        actions={[
          <CheckOutlined
            onClick={() => {
              if (selectedPId === '') {
                message.warning('Please choose a project in list');
                return;
              }
              message.info('Selected project ' + selectedPId);
              setProjectId(selectedPId);
              setTimeout(() => {
                navigate(ROUTES.HOME);
              }, 2000);
            }}
          />
        ]}
      >
        <Select
          showSearch
          style={{ width: '100%' }}
          placeholder="Project list"
          // filterOption={(input, option) => {
          // TODO: filter
          // const val = option.props.children as string;
          // return val.toLowerCase().indexOf(input.toLowerCase()) >= 0;
          // }}
          onChange={e => {
            setSelectedPId(e.toString());
          }}
        >
          {projects.map(itm => {
            return (
              <Option key={itm.id} value={itm.id}>
                {itm.name}
              </Option>
            );
          })}
        </Select>
      </Card>
    </Layout>
  );
};

export default SelectProjectPage;
