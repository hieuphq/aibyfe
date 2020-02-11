import React, { Suspense } from 'react';
import { RouteComponentProps, Redirect } from '@reach/router';
// import { ROUTES } from 'constant/routes';
// import useAppIsReady from 'hooks/useAppIsReady';
// import useSelectLocations from 'containers/SelectLocation/useSelectLocations';
// import AppLoader from 'components/Loaders/AppLoader';

const AppContainer: React.FunctionComponent<RouteComponentProps> = ({
  children
}) => {
  // const { failedToFetch, isLoading, isLogin } = useAppIsReady();
  // const { configuredLocations } = useSelectLocations();

  // if (!isLogin) {
  //   return <Redirect to={ROUTES.LOGIN} noThrow />;
  // }

  // if (isLoading) {
  //   return <AppLoader />;
  // }

  // if (failedToFetch) {
  //   return null;
  // }

  // if (configuredLocations.length === 0) {
  //   return <Redirect to={ROUTES.CONFIGURATION} noThrow />;
  // }

  return (
    <main className="font-sans pt-14">
      <Suspense fallback={null}>{children}</Suspense>
    </main>
  );
};

export default AppContainer;
