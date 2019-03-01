import React from 'react';
import Loadable from 'react-loadable'

import DefaultLayout from './containers/DefaultLayout/DefaultLayout1';
// import ManagementDefaultLayout from './containers/DefaultLayout/Management/DefaultLayout';
function Loading() {
    return <div>Loading...</div>;
}

const ManagementDashboard = Loadable({
    loader: () => import('./views/Management/Dashboard/Dashboard'),
    loading: Loading,
});
const Groups = Loadable({
    loader: () => import('./views/Groups/GroupManagement'),
    loading: Loading,
});
const RegisterUser = Loadable({
    loader: () => import('./views/Users/RegisterUser'),
    loading: Loading,
});


// https://github.com/ReactTraining/react-router/tree/master/packages/react-router-config
const routes = [
    { path: '/', name: 'Dashboard', component: DefaultLayout },
    { path: '/dashboard',exact: true, name: 'Dashboard', component: ManagementDashboard },
    { path: '/groups',exact: true, name: 'Group Management', component: Groups },
    { path: '/registerUser/:id', name: 'Register User', component: RegisterUser },
];

export default routes;
