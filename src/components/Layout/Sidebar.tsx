import React, { useMemo } from 'react';
import { Menu, Layout as AntLayout, Drawer } from 'antd';
import styled from 'styled-components';
// import Icon from '../Icon';
// import { IconType } from '../Icon/type';
import classnames from 'classnames';
import { useState } from 'react';
// import tw from 'tailwind.macro';
// import Logo from '../Logo';

const { Sider } = AntLayout;
const { SubMenu, ItemGroup } = Menu;

const StyledSider = styled(Sider)<{ collapsed: boolean }>`
  padding: ${props => (props.collapsed ? '5px 10px' : '5px 15px')}!important;
`;

const StyledMenu = styled(Menu)<{ collapsed: number }>`
  border: none !important;
  padding: 0 !important;
  &.ant-menu-inline-collapsed {
    width: 44px;
  }
  > .ant-menu-item {
    > svg {
      margin-right: 20px;
    }
  }
  .ant-menu-item-selected {
    background-color: white !important;
    color: var(--primary) !important;
    &:after {
      display: none;
    }
  }
  .ant-menu-item:not(:last-child) {
    margin-bottom: 8px !important;
    margin-top: 8px !important;
  }
  .ant-menu-item-group:last-child {
    border-color: transparent !important;
  }
  > .ant-menu-item {
    > div {
      padding-left: ${props => (props.collapsed ? '13px' : '8px')} !important;
    }
  }
  .ant-menu-item {
    padding: 0 !important;
    height: 32px !important;
    line-height: 32px !important;
  }
  &.ant-menu-inline-collapsed > .ant-menu-item {
    padding: 0 !important;
  }
  .ant-menu-item-active > div,
  .ant-menu-item-selected > div {
    background-color: var(--grey-lighter);
    color: var(--primary);
    transition: all 0.3s;
  }
  .ant-menu-sub {
    > .ant-menu-item {
      padding: 0 8px;
      height: 32px;
      line-height: 32px;
      &::before {
        content: '';
        position: relative;
        display: inline-block;
        width: 32px;
      }
      > div {
        overflow: hidden;
        text-overflow: ellipsis;
        white-space: nowrap;
      }
    }
  }
  .ant-menu-submenu-arrow {
    display: none;
  }
  .ant-menu-submenu-title {
    position: relative;
    padding: 0 0 0 8px !important;
    height: 32px !important;
    line-height: 32px !important;
    padding-left: 8px;
  }
  .ant-menu-submenu-vertical > .ant-menu-submenu-title {
    padding: 0 29px !important;
  }
  .ant-menu-submenu-open {
    > .ant-menu-submenu-title {
      font-weight: 500;
    }
    .ant-menu-item-active,
    .ant-menu-item-selected {
      background-color: var(--grey-lighter) !important;
      color: var(--primary) !important;
      transition: all 0.3s !important;
    }
  }
`;

const StyledSubMenu = styled(SubMenu)`
  .ant-menu:not(.ant-menu-inline) {
    padding: 0 8px;
  }
  .ant-menu-sub > .ant-menu-item {
    margin-top: 8px;
    height: 32px;
    line-height: 32px;
    &:last-child {
      margin-bottom: 8px;
    }
    &:hover {
      background-color: var(--grey-lighter);
      color: var(--primary);
      transition: all 0.3s;
    }
  }
`;

interface StyledItemGroupProps {
  islastchild: number;
  collapsed: number;
}

const StyledItemGroup = styled(ItemGroup)<StyledItemGroupProps>`
  padding-bottom: 8px;
  margin-bottom: ${props => (props.collapsed ? '12px' : '0')};
  border-bottom: solid 1px
    ${props => (props.islastchild ? 'transparent' : 'var(--grey-lighter)')};
  .ant-menu-item-group-title {
    display: ${props => (props.collapsed ? 'none' : 'block')};
    padding: 16px 5px;
  }
  .ant-menu-root .ant-menu-inline {
    padding: 0;
  }
`;

const DropdownIcon = styled.div<{ isOnMobile: boolean }>`
  transition: transform 0.3s ease;
  transform-origin: center;
  display: flex;
  align-items: center;
  justify-content: center;
  top: 50%;
  width: 24px;
  height: 24px;
  transform: translateY(-50%);
  font-size: 10px;
  .ant-menu-submenu-open & {
    transform: translateY(-50%) rotate(180deg);
  }
`;

const StyledDrawer = styled(Drawer)`
  .ant-drawer-body {
  }
`;
// ${tw`p-0 h-screen bg-white`}

export interface SidebarMenuProps<T = {}> {
  isOnMobile: boolean;
  collapsed: boolean;
  selectedItem: string;
  openItemKeys?: string[];
  menu: LayoutSidebarMenu<T>;
  onItemClick: (item: LayoutSidebarMenuItem<T>) => void;
}

const SidebarMenu = ({
  collapsed,
  isOnMobile,
  selectedItem,
  menu,
  onItemClick,
  openItemKeys
}: SidebarMenuProps) => {
  const [openKeys, setOpenKeys] = useState<string[] | undefined>(openItemKeys);

  useMemo(() => {
    setOpenKeys(openItemKeys);
  }, [openItemKeys]);

  useMemo(() => {
    if (collapsed) {
      setOpenKeys([]);
    }
  }, [collapsed]);

  return (
    <StyledMenu
      theme="light"
      collapsed={collapsed ? 1 : 0}
      mode="inline"
      defaultSelectedKeys={[selectedItem]}
      selectedKeys={[selectedItem]}
      openKeys={openKeys}
      onOpenChange={openKeys => setOpenKeys(openKeys)}
    >
      {(menu as Array<LayoutSidebarMenuItem>).map(item => {
        const { id, submenu, name } = item;
        return !submenu ? (
          <Menu.Item key={id} onClick={e => onItemClick(item)}>
            <div>
              {/* {icon && <Icon type={icon} className="anticon" />} */}
              <span>{name}</span>
            </div>
          </Menu.Item>
        ) : (
          <StyledSubMenu
            key={id}
            title={
              <div className={classnames({ '-ml-4': collapsed })}>
                {/* {icon && <Icon type={icon} className="anticon" />} */}
                <span>{name}</span>
                {!collapsed && (
                  <DropdownIcon
                    isOnMobile={isOnMobile}
                    className="absolute pin-r"
                  >
                    {/* <Icon type="chevron-down" /> */}
                  </DropdownIcon>
                )}
              </div>
            }
          >
            {submenu.map(subItem => {
              const { id: subId, name: subName } = subItem;
              return (
                <Menu.Item key={subId} onClick={e => onItemClick(subItem)}>
                  <span>{subName}</span>
                </Menu.Item>
              );
            })}
          </StyledSubMenu>
        );
      })}
    </StyledMenu>
  );
};

const SidebarMenuWithSection = ({
  collapsed,
  isOnMobile,
  selectedItem,
  menu,
  onItemClick,
  openItemKeys
}: SidebarMenuProps) => {
  const [openKeys, setOpenKeys] = useState<string[] | undefined>(openItemKeys);

  return (
    <StyledMenu
      theme="light"
      collapsed={collapsed ? 1 : 0}
      mode="inline"
      defaultSelectedKeys={[selectedItem]}
      selectedKeys={[selectedItem]}
      openKeys={openKeys}
      onOpenChange={openKeys => setOpenKeys(openKeys)}
    >
      {(menu as Array<LayoutSidebarMenuSectionItem>).map((item, index) => {
        const { id, section, menu } = item;
        const restProps = {
          islastchild: menu.length === index + 1 ? 1 : 0,
          collapsed: collapsed ? 1 : 0
        };
        return (
          <StyledItemGroup key={id} title={section} {...restProps}>
            <SidebarMenu
              collapsed={collapsed}
              isOnMobile={isOnMobile}
              menu={menu}
              selectedItem={selectedItem}
              onItemClick={onItemClick}
              openItemKeys={openItemKeys}
            ></SidebarMenu>
          </StyledItemGroup>
        );
      })}
    </StyledMenu>
  );
};

export type LayoutSidebarMenuItem<T = {}> = {
  // icon?: IconType;
  id: string;
  link: string;
  name: React.ReactNode;
  external?: boolean;
  submenu?: Omit<LayoutSidebarMenuItem<T>, 'submenu' | 'icon'>[];
} & T;

export type LayoutSidebarMenuSectionItem<T = {}> = {
  id: string;
  section: string;
  menu: LayoutSidebarMenuItem[];
} & T;

export type LayoutSidebarMenu<T = {}> =
  | LayoutSidebarMenuItem<T>[]
  | LayoutSidebarMenuSectionItem<T>[];

export interface LayoutSidebarProps<T = {}> {
  collapsed?: boolean;
  isOnMobile?: boolean;
  toggleCollapsed?: () => void;
  menu: LayoutSidebarMenu<T>;
  selectedItem: string;
  openItemKeys?: string[];
  onItemClick: (item: LayoutSidebarMenuItem<T>) => void;
  onMobileMenuClose?: () => void;
}

const SidebarSider = ({
  collapsed = false,
  isOnMobile = false,
  menu,
  selectedItem,
  onItemClick,
  openItemKeys
}: LayoutSidebarProps) => {
  const menuType = 'section' in menu[0] ? 'section' : 'normal';
  return (
    <StyledSider
      trigger={null}
      collapsed={collapsed}
      theme="light"
      width="220"
      collapsedWidth="64"
      className="z-20"
      collapsible
    >
      {menuType === 'section' ? (
        <SidebarMenuWithSection
          collapsed={collapsed}
          isOnMobile={isOnMobile}
          menu={menu}
          selectedItem={selectedItem}
          onItemClick={onItemClick}
          openItemKeys={openItemKeys}
        ></SidebarMenuWithSection>
      ) : (
        <SidebarMenu
          collapsed={collapsed}
          isOnMobile={isOnMobile}
          menu={menu}
          selectedItem={selectedItem}
          onItemClick={onItemClick}
          openItemKeys={openItemKeys}
        ></SidebarMenu>
      )}
    </StyledSider>
  );
};

export default function Sidebar({
  collapsed = false,
  isOnMobile = false,
  menu,
  selectedItem,
  onItemClick,
  openItemKeys,
  onMobileMenuClose = () => {}
}: LayoutSidebarProps) {
  return isOnMobile ? (
    <StyledDrawer
      visible={collapsed}
      placement="left"
      closable={false}
      width="220"
      onClose={() => isOnMobile && collapsed && onMobileMenuClose()}
    >
      <div className="p-4">{/* <Logo hasText /> */}</div>
      <SidebarSider
        collapsed={false}
        isOnMobile={true}
        menu={menu}
        openItemKeys={openItemKeys}
        selectedItem={selectedItem}
        onItemClick={onItemClick}
      />
    </StyledDrawer>
  ) : (
    <SidebarSider
      collapsed={collapsed}
      isOnMobile={false}
      menu={menu}
      openItemKeys={openItemKeys}
      selectedItem={selectedItem}
      onItemClick={onItemClick}
    />
  );
}
