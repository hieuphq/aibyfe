import React, { useState, useMemo } from 'react';
import styled from 'styled-components';
import { Layout as AntLayout, Icon, Menu } from 'antd';

const SiderStyled = styled(AntLayout.Sider)`
overflow: 'auto',
height: '100vh',
position: 'fixed',
left: 0,
`;

export type LayoutSidebarMenuItem<T = {}> = {
  icon?: string;
  id: string;
  link: string;
  name: React.ReactNode;
  external?: boolean;
  submenu?: Omit<LayoutSidebarMenuItem<T>, 'submenu' | 'icon'>[];
} & T;

// menu: LayoutSidebarMenu<T>;
export interface SidebarMenuProps<T = {}> {
  isOnMobile?: boolean;
  openItemKeys?: string[];
  collapsed: boolean;
  selectedItem: string;
  onItemClick: (item: LayoutSidebarMenuItem<T>) => void;
  menu: LayoutSidebarMenu<T>;
}

export type LayoutSidebarMenuSectionItem<T = {}> = {
  id: string;
  section: string;
  menu: LayoutSidebarMenuItem[];
} & T;

export type LayoutSidebarMenu<T = {}> =
  | LayoutSidebarMenuItem<T>[]
  | LayoutSidebarMenuSectionItem<T>[];

const Sider = ({
  collapsed,
  selectedItem,
  openItemKeys,
  menu,
  onItemClick
}: SidebarMenuProps) => {
  const [openKeys, setOpenKeys] = useState<string[] | undefined>(openItemKeys);

  useMemo(() => {
    if (collapsed) {
      setOpenKeys([]);
    }
  }, [collapsed]);
  return (
    <SiderStyled>
      <Menu
        theme="dark"
        mode="inline"
        defaultSelectedKeys={[selectedItem]}
        selectedKeys={[selectedItem]}
        openKeys={openKeys}
        onOpenChange={openKeys => setOpenKeys(openKeys)}
      >
        {(menu as Array<LayoutSidebarMenuItem>).map(item => {
          const { id, icon, name } = item;
          return (
            <Menu.Item key={id} onClick={e => onItemClick(item)}>
              {icon && <Icon type={icon} />}
              <span className="nav-text">{name}</span>
            </Menu.Item>
          );
        })}
      </Menu>
    </SiderStyled>
  );
};

export default Sider;

/* <Menu.Item key="1">
    <Icon type="code-sandbox" />
    <span className="nav-text">Test Suites</span>
  </Menu.Item>
  <Menu.Item key="2">
    <Icon type="codepen" />
    <span className="nav-text">Test Case</span>
  </Menu.Item>
  <Menu.Item key="3">
    <Icon type="build" />
    <span className="nav-text">Page</span>
  </Menu.Item>
  <Menu.Item key="4">
    <Icon type="sliders" />
    <span className="nav-text">Environment</span>
  </Menu.Item>
  <Menu.Item key="5">
    <Icon type="file-done" />
    <span className="nav-text">Test Result</span>
  </Menu.Item> */
