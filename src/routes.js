import React from 'react';
import { Redirect } from 'react-router-dom';
import EVoucher from './views/eVoucher/EVoucher.js';
import CreateEVoucher from './views/eVoucher/create/CreateEVoucher.js';
import UpdateEVoucher from './views/eVoucher/update/UpdateEVoucher.js';

const routes = [
  { path: '/', exact: true, name: 'Home' },
  { path: '/e-voucher/create', exact: true, name: 'e-Voucher Create', component: CreateEVoucher },
  { path: '/e-voucher/:id/edit', name: 'e-Voucher Update', component: UpdateEVoucher },
  { path: '/e-voucher', exact: true, name: 'E-Voucher List', component: EVoucher },
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
