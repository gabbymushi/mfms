import React from 'react';
import DefaultLayout from './containers/DefaultLayout/DefaultLayout';

const Dashboard = React.lazy(() => import('./views/Dashboard/Dashboard'));
const Users = React.lazy(() => import('./views/Users/Users'));
const User = React.lazy(() => import('./views/Users/User'));
const RegisterUser = React.lazy(() => import('./views/Users/RegisterUser'));
const Ledger = React.lazy(() => import('./views/Ledger/Ledger'));
const UserShare = React.lazy(() => import('./views/Shares/Shares'));
const ProcessLoan = React.lazy(() => import('./views/Loan/ProcessLoan'));
const LoanTransactions = React.lazy(() => import('./views/Loan/LoanTransactions'));
const LoanInstallments = React.lazy(() => import('./views/Loan/LoanInstallments'));
const Heir = React.lazy(() => import('./views/Users/Heir'));

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
    { path: '/heir/:id/', exact: true, name: 'Heir', component: Heir },
];

export default routes;
