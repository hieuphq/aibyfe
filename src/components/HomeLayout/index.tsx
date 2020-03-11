import React from 'react';
import { Layout as AntLayout } from 'antd';
import styled from 'styled-components';
import { RouteComponentProps } from '@reach/router';
import { User } from 'types';

const { Header, Content, Footer } = AntLayout;
const ContentWraper = styled(AntLayout)`
  marginleft: 200;
`;
const LayoutWrapper = styled(AntLayout)`
  min-height: 100vh;
`;
export interface LayoutProps extends RouteComponentProps {
  user?: User;
}
const HomeLayout: React.FC<LayoutProps> = ({ children }) => {
  return (
    <LayoutWrapper>
      <ContentWraper>
        <Header style={{ background: '#fff', padding: 0 }} />
        <Content style={{ margin: '24px 16px 0', overflow: 'initial' }}>
          {children}
        </Content>
        <Footer style={{ textAlign: 'center' }}>
          Aiby ©2020 Created by PHB
        </Footer>
      </ContentWraper>
    </LayoutWrapper>
  );
};

export default HomeLayout;
