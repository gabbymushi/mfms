import React, {Component} from 'react';
import {Redirect, Route, Switch} from 'react-router-dom';
import {Container} from 'reactstrap';

import {
    AppAside,
    AppBreadcrumb,
    AppFooter,
    AppHeader,
    AppSidebar,
    AppSidebarFooter,
    AppSidebarForm,
    AppSidebarHeader,
    AppSidebarMinimizer,
    AppSidebarNav,
} from '@coreui/react';
// sidebar nav config
import navigation from '../../../_nav';
// routes config
//import routes from '../../../routes';
//import routes from '../../../organization_routes';
import DefaultAside from './DefaultAside';
import DefaultFooter from './DefaultFooter';
import DefaultHeader from '../DefaultHeader';
import Loadable from "react-loadable";
//import EnsureLoggedInContainer from "../../../EnsureLoggedInContainer";
function Loading() {
    return <div>Loading...</div>;
}

const ManagementDashboard = Loadable({
    loader: () => import('../../../views/Management/Dashboard/Dashboard'),
    loading: Loading,
});
const Groups = Loadable({
    loader: () => import('../../../views/Groups/GroupManagement'),
    loading: Loading,
});



// https://github.com/ReactTraining/react-router/tree/master/packages/react-router-config
const routes = [
    { path: '/manage', name: 'Management Dashboard', component: DefaultLayout },
    { path: '/dashboardd',exact: true, name: 'Dashboard', component: ManagementDashboard },
    { path: '/groups',exact: true, name: 'Group Management', component: Groups },
];

class DefaultLayout extends Component {

    render() {
        return (
            <div className="app">
                <AppHeader fixed>
                    <DefaultHeader/>
                </AppHeader>
                <div className="app-body">
                    <AppSidebar fixed display="lg">
                        <AppSidebarHeader/>
                        <AppSidebarForm/>
                        <AppSidebarNav navConfig={navigation} {...this.props} />
                        <AppSidebarFooter/>
                        <AppSidebarMinimizer/>
                    </AppSidebar>
                    <main className="main">
                        <AppBreadcrumb appRoutes={routes}/>
                        <Container fluid>
                            <Switch>
                                {routes.map((route, idx) => {
                                        return route.component ? (
                                                <Route key={idx} path={route.path} exact={route.exact} name={route.name}
                                                       render={props => (
                                                           <route.component {...props} />
                                                       )}/>)
                                            : (null);
                                    },
                                )}
                                <Redirect from="/manage" to="/dashboardd" />
                            </Switch>
                        </Container>
                    </main>
                    <AppAside fixed>
                        <DefaultAside/>
                    </AppAside>
                </div>
                <AppFooter>
                    <DefaultFooter/>
                </AppFooter>
            </div>
        );
    }
}

export default DefaultLayout;
