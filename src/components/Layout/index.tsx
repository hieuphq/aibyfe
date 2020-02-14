import React from 'react';
import { Layout as AntLayout, Icon, Menu } from 'antd';
import styled from 'styled-components';
import Sider, { LayoutSidebarMenuItem } from './Sider';
import { RouteComponentProps } from '@reach/router';

const { Header, Content, Footer } = AntLayout;
const ContentWraper = styled(AntLayout)`
  marginleft: 200;
`;
const LayoutWrapper = styled(AntLayout)`
  min-height: 100vh;
`;
export interface LayoutProps extends RouteComponentProps {
  collapsed: boolean;
  selectedItem: string;
  onItemClick: (item: LayoutSidebarMenuItem) => void;
  menu: LayoutSidebarMenuItem[];
}
const Layout: React.FC<LayoutProps> = ({
  collapsed,
  selectedItem,
  onItemClick,
  menu,
  children
}) => {
  return (
    <LayoutWrapper>
      <Sider
        collapsed={collapsed}
        selectedItem={selectedItem}
        onItemClick={onItemClick}
        menu={menu}
      />
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

export default Layout;
