import React, { useMemo } from 'react';
import { RouteComponentProps, navigate } from '@reach/router';
import { useAppContext } from 'context/AppContext';
import { ROUTES } from 'constant/routes';
import Layout from 'components/Layout';
import { LayoutSidebarMenuItem } from 'components/Layout/Sider';

export interface HomePageProps extends RouteComponentProps {}

const menu: LayoutSidebarMenuItem[] = [
  {
    id: 'test-suites',
    link: ROUTES.TESTSUITE,
    name: 'Test Suites',
    icon: 'code-sandbox'
  },
  {
    id: 'test-cases',
    link: ROUTES.TESTCASE,
    name: 'Test Cases',
    icon: 'codepen'
  },
  {
    id: 'page',
    link: ROUTES.PAGE,
    name: 'Page',
    icon: 'build'
  },
  {
    id: 'environments',
    link: ROUTES.ENVIRONMENT,
    name: 'Environment',
    icon: 'sliders'
  },
  {
    id: 'test-results',
    link: ROUTES.TEST_RESULT,
    name: 'Test Result',
    icon: 'key'
  }
];
const HomePage: React.FC<HomePageProps> = ({ children, location }) => {
  const { isLogin, getProjectId } = useAppContext();
  const selectedKey = useMemo(() => {
    const item = menu.filter(({ link }) =>
      location?.pathname.startsWith(link || '*')
    )[0];
    return item?.id;
  }, [location]);
  const projectId = getProjectId();
  const isLoggedIn = isLogin();

  //   if (isLoggedIn && !projectId) {
  //     return <Redirect to={ROUTES.SELECT_PROJECT} noThrow />;
  //   }

  //   if (isLogin && projectId) {
  //     return <Redirect to={ROUTES.PROJECT} noThrow />;
  //   }

  return (
    <Layout
      collapsed={false}
      menu={menu}
      selectedItem={selectedKey}
      onItemClick={item => {
        if (item.external) {
          // TODO: not recommend
          // more info https://stackoverflow.com/questions/4907843/open-a-url-in-a-new-tab-and-not-a-new-window-using-javascript
          const win = window.open(item.link, '_blank');
          win && win.focus();
          return;
        }
        navigate(item.link);
      }}
    >
      {children}
    </Layout>
  );
};

export default HomePage;
