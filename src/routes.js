import React from 'react';
import { Redirect } from 'react-router-dom';

const Dashboard = React.lazy(() => import('./views/dashboard/Dashboard'));

const routes = [
  { path: '/', exact: true, name: 'Home' },
  { path: '/dashboard', name: 'Dashboard', component: Dashboard },
  {
    path: '/errors/error-404',
    name: 'Page404',
    exact: true,
    component: React.lazy(() => import('./views/pages/page404/Page404')),
  },
  {
    name: '404',
    component: () => <Redirect to='/errors/error-404' />,
  },
];

export default routes;
