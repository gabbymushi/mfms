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
import navigation from '../../organization_nav';
//import navigation from '../../_nav';
// routes config
import routes from '../../organization_routes';
//import routes from '../../routes';
import DefaultAside from './DefaultAside';
import DefaultFooter from './DefaultFooter';
import DefaultHeader from './DefaultHeader';
import EnsureLoggedInContainer from "../../EnsureLoggedInContainer";
// function SystemRoutes() {
//     if (localStorage.getItem('user_type')== "member") {
//         return (
//             <Redirect from="/" to="/dashboard" />
//         );
//     } else if (localStorage.getItem('user_type')== "manager") {
//         return (
//             <Redirect from="/" to="/dashboardd" />
//
//         );
//     }
// }
class DefaultLayout1 extends Component {

    render() {
        // const {match} = this.props;
        // let 
        //     shouldRedirect = match.url === window.location.pathname,
        //     redirectTo = <Redirect to="/dashboard" />;
        //     console.log('test',match.url);
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
                                {/*<SystemRoutes/>*/}
                                <Redirect to="/dashboard" />
                                {/* {shouldRedirect && redirectTo} */}
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

export default DefaultLayout1;
