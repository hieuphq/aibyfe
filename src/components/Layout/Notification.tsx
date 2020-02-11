import React from 'react';
import { Alert } from 'antd';

export interface LayoutNotificationProps {
  closable?: boolean;
  showIcon?: boolean;
  afterClose?: () => void;
  type?: 'success' | 'info' | 'warning' | 'error';
}

const Notification: React.FC<LayoutNotificationProps> = ({
  children,
  closable = true,
  afterClose,
  showIcon = true,
  type = 'warning',
}) => {
  return (
    <Alert
      type={type}
      message={children}
      closable={closable}
      afterClose={afterClose}
      showIcon={showIcon}
      banner
    />
  );
};

export default Notification;
