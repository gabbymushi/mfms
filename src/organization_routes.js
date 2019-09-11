import React from 'react';

import DefaultLayout from './containers/DefaultLayout/DefaultLayout1';
// import ManagementDefaultLayout from './containers/DefaultLayout/Management/DefaultLayout';

const ManagementDashboard = React.lazy(() => import('./views/Management/Dashboard/Dashboard'));
const Groups = React.lazy(() => import('./views/Groups/GroupManagement'));
const RegisterUser = React.lazy(() => import('./views/Users/RegisterUser'));

// https://github.com/ReactTraining/react-router/tree/master/packages/react-router-config
const routes = [
    { path: '/', name: 'Dashboard', component: DefaultLayout },
    { path: '/dashboard',exact: true, name: 'Dashboard', component: ManagementDashboard },
    { path: '/groups',exact: true, name: 'Group Management', component: Groups },
    { path: '/registerUser/:id', name: 'Register User', component: RegisterUser },
];

export default routes;
