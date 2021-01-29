import '@fontsource/roboto/300.css';
import '@fontsource/roboto/400.css';
import '@fontsource/roboto/500.css';
import '@fontsource/roboto/700.css';
import React from 'react';
import { Route, Switch } from 'react-router';
import * as pages from '../pages';
import { routes } from '../routes';
import { AuthorizeRoute } from './Auth';
import { Layout } from './Layout';

export const Root = () => (
  <Layout>
    <Switch>
      <AuthorizeRoute component={pages.Default} exact path={routes.default} />
      <Route component={pages.SignIn} exact path={routes.auth.signIn} />
    </Switch>
  </Layout>
);
