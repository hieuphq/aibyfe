import React from 'react';
import { RouteComponentProps } from '@reach/router';
import ErrorBoundary from '../ErrorBoundary';
import { Alert } from 'antd';

export interface ComponentRouteProps extends RouteComponentProps {
  Component: React.FunctionComponent<RouteComponentProps>;
}

const ComponentRoute = ({ Component, ...rest }: ComponentRouteProps) => {
  return (
    <ErrorBoundary
      fallback={
        <div className="p-6">
          <Alert
            message="Something Wrong"
            description="Try to reload the page or back to home page"
            type="error"
          />
        </div>
      }
    >
      <Component {...rest} />
    </ErrorBoundary>
  );
};

export default ComponentRoute;
