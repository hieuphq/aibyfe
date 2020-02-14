import React from 'react';
import './App.css';
import ComponentRoute from 'components/ComponentRoute';
import { Router as ReachRouter } from '@reach/router';
import { ROUTES } from './constant/routes';
import { useAppContext } from 'context/AppContext';
import NoAuthenPage from 'pages/403';
import NotFoundPage from 'pages/404';
import ServerErrorPage from 'pages/500';
import LoginPage from 'pages/Login';
import SignupPage from 'pages/SignUp';
import ForgotPasswordPage from 'pages/ForgotPassword';
import SelectProject from 'pages/SelectProject';
import HomePage from 'pages/Home';
import Project from 'pages/Project';
import TestSuitePage from 'pages/TestSuite';
import TestCasePage from 'pages/TestCase';
import UIPage from 'pages/UI';
import Environment from 'pages/Environment';
import TestResult from 'pages/TestResult';
import TestSuiteCreatePage from 'pages/TestSuiteCreate';
import TestSuiteDetailPage from 'pages/TestSuiteDetail';

const App = () => {
  return (
    <useAppContext.Provider>
      <ReachRouter primary={false}>
        <ComponentRoute path={ROUTES.LOGIN} Component={LoginPage} />
        <ComponentRoute path={ROUTES.SIGNUP} Component={SignupPage} />
        <ComponentRoute
          path={ROUTES.FORGOT_PASSWORD}
          Component={ForgotPasswordPage}
        />
        <HomePage path={ROUTES.HOME}>
          <ComponentRoute path={ROUTES.HOME} Component={Project} />
          <ComponentRoute
            path={ROUTES.SELECT_PROJECT}
            Component={SelectProject}
          />
          <ComponentRoute path={ROUTES.TESTSUITE} Component={TestSuitePage} />
          <ComponentRoute
            path={ROUTES.TESTSUITE_NEW}
            Component={TestSuiteCreatePage}
          />
          <ComponentRoute
            path={ROUTES.TESTSUITE_DETAIL}
            Component={TestSuiteDetailPage}
          />
          <ComponentRoute path={ROUTES.TESTCASE} Component={TestCasePage} />
          <ComponentRoute path={ROUTES.PAGE} Component={UIPage} />
          <ComponentRoute path={ROUTES.ENVIRONMENT} Component={Environment} />
          <ComponentRoute path={ROUTES.TEST_RESULT} Component={TestResult} />
          <ComponentRoute path={ROUTES.PAGE} Component={UIPage} />
          <ComponentRoute path={ROUTES.NO_AUTHEN} Component={NoAuthenPage} />
          <ComponentRoute
            path={ROUTES.SERVER_ERROR}
            Component={ServerErrorPage}
          />
          <ComponentRoute path={'/*'} Component={NotFoundPage} />
        </HomePage>
      </ReachRouter>
    </useAppContext.Provider>
  );
};

export default App;
