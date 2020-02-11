import React from 'react';
import './App.css';
import ComponentRoute from 'components/ComponentRoute';
import { Router as ReachRouter, Redirect } from '@reach/router';
import { Button } from 'antd';
import { ROUTES } from './constant/routes';
import NoAuthenPage from './pages/403';
import NotFoundPage from './pages/404';
import ServerErrorPage from './pages/500';
import LoginPage from 'pages/Login/Login';
import { useAppContext } from 'context/AppContext';

const App = () => {
  return (
    <useAppContext.Provider>
      <ReachRouter primary={false}>
        {/* <div className="App">
        <Button type="primary">Button</Button>
      </div> */}
        <ComponentRoute path={ROUTES.LOGIN} Component={LoginPage} />
        <ComponentRoute path={ROUTES.NO_AUTHEN} Component={NoAuthenPage} />
        <ComponentRoute
          path={ROUTES.SERVER_ERROR}
          Component={ServerErrorPage}
        />
        <ComponentRoute path={'/*'} Component={NotFoundPage} />
      </ReachRouter>
    </useAppContext.Provider>
  );
};

export default App;
