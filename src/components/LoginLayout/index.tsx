import React from 'react';
import './index.css';

const Layout = ({ children }: { children: React.ReactNode }) => {
  return (
    <div className="antd-pro-layouts-user-layout-container">
      <div className="antd-pro-layouts-user-layout-content">
        <div className="antd-pro-pages-user-login-style-main">{children}</div>
      </div>
    </div>
  );
};

export default Layout;
