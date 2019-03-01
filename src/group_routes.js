import React from 'react';
import Loadable from 'react-loadable'

import DefaultLayout from './containers/DefaultLayout/DefaultLayout';

function Loading() {
    return <div>Loading...</div>;
}

const Dashboard = Loadable({
    loader: () => import('./views/Dashboard/Dashboard'),
    loading: Loading,
});
const Users = Loadable({
    loader: () => import('./views/Users/Users'),
    loading: Loading,
});

const User = Loadable({
    loader: () => import('./views/Users/User'),
    loading: Loading,
});
const RegisterUser = Loadable({
    loader: () => import('./views/Users/RegisterUser'),
    loading: Loading,
});
const Ledger = Loadable({
    loader: () => import('./views/Ledger/Ledger'),
    loading: Loading,
});
const UserShare = Loadable({
    loader: () => import('./views/Shares/Shares'),
    loading: Loading,
});
const ProcessLoan = Loadable({
    loader: () => import('./views/Loan/ProcessLoan'),
    loading: Loading,
});
const LoanTransactions = Loadable({
    loader: () => import('./views/Loan/LoanTransactions'),
    loading: Loading,
});
const LoanInstallments = Loadable({
    loader: () => import('./views/Loan/LoanInstallments'),
    loading: Loading,
});


// https://github.com/ReactTraining/react-router/tree/master/packages/react-router-config
const routes = [
    { path: '/', name: 'Home', component: DefaultLayout },
    { path: '/dashboard',exact: true, name: 'Dashboard', component: Dashboard },
    { path: '/registerUser/:id', name: 'Register User', component: RegisterUser },
    { path: '/members/:id', exact: true,  name: 'Users', component: Users },
    { path: '/users/:id', exact: true, name: 'User Details', component: User },
    { path: '/ledgers', exact: true, name: 'Ledgers', component: Ledger },
    { path: '/shares/:id', exact: true, name: 'User Shares', component: UserShare },
    { path: '/processLoan/:id', exact: true, name: 'User Shares', component: ProcessLoan },
    { path: '/transactions/:id/:loan_id', exact: true, name: 'Loan Transaction', component: LoanTransactions },
    { path: '/installments/:id/:loan_id', exact: true, name: 'Loan Installments', component: LoanInstallments },
];

export default routes;
