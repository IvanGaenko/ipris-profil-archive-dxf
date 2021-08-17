// Imports
import React, { lazy, Suspense } from 'react';
import { HashRouter, Switch, Route, Redirect } from 'react-router-dom';

// App Imports
import Loading from '../modules/Loading';

import NotFound from './NotFound';

import { ROOT, ORDER } from './routes';

const Order = lazy(() => import('../pages/Order'));

const RouterConfig = () => {
  return (
    <HashRouter>
      <Suspense fallback={<Loading />}>
        <Switch>
          <Route path={ROOT} exact>
            <Redirect to={ORDER} />
          </Route>
          <Route component={Order} path={ORDER} exact />
          <Route path="*">
            <NotFound />
          </Route>
        </Switch>
      </Suspense>
    </HashRouter>
  );
};

export default RouterConfig;
