import React from 'react';
import { Layout as AntLayout } from 'antd';
import Header from './Header';
import Sidebar from './Sidebar';
import Content from './Content';
import Footer from './Footer';
import Notification from './Notification';

const Layout = ({ children }: { children: React.ReactNode }) => {
  return <AntLayout>{children}</AntLayout>;
};

Layout.Sidebar = Sidebar;
Layout.Header = Header;
Layout.Content = Content;
Layout.Footer = Footer;
Layout.Nofification = Notification;

export default Layout;
