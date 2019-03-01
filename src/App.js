import React, {Component} from 'react';
import {withRouter,HashRouter, Route, Switch,Redirect} from 'react-router-dom';
import './App.scss';

// Containers
import DefaultLayout1 from './containers/DefaultLayout/DefaultLayout1';
import DefaultLayout from './containers/DefaultLayout/DefaultLayout';
// Pages
import {Page404, Page500, Register} from './views/Pages';
import Login from './views/Users/Login';
import EnsureLoggedInContainer from './EnsureLoggedInContainer';
import Dashboard from './views/Dashboard/Dashboard';
import ManagementDashboard from './views/Management/Dashboard/Dashboard';
import ManagementDefaultLayout from './containers/DefaultLayout/Management/DefaultLayout';
// import DefaultHeader from "./containers/DefaultLayout/DefaultHeader";
import axios from 'axios';
import { Button, Card, CardBody, CardGroup, Col, Container, Form, Input, InputGroup, InputGroupAddon, InputGroupText, Row } from 'reactstrap';
import SystemParameters from './SystemParameters';
import ProtectedRoute from './ProtectedRoute';
//import EnsureLoggedInContainer from '../../EnsureLoggedInContainer';
let apiBaseUrl=SystemParameters.apiBaseUrl;
// import { renderRoutes } from 'react-router-config';
function SystemRoutes() {
    if (localStorage.getItem('user_type')== "member") {
        return (
            <Route path="/" name="Dashboard" component={DefaultLayout}/>
        );
    } else if (localStorage.getItem('user_type')== "manager") {
        return (

            <Route path="/" name="Management Dashboard"
                   component={DefaultLayout1}/>

        );
    }else{
        return (<Route path="/login" exact component={Login} />)
    }
}
// function refresh() {
//     window.location.reload();
// }
// const ProtectedRoute = ({ component: Comp, loggedIn, path, ...rest }) => {
//     return (
//         <Route
//             path={path}
//             {...rest}
//             render={(props) => {
//                 return localStorage.getItem('token') ? (
//                     <Comp {...props} />
//                 ) : (
//                     <Redirect
//                         to={{
//                             pathname: "/login",
//                             state: {
//                                 from: props.location
//                                 // error: "You need to login first!",
//                             },
//                         }}
//                     />
//                 );
//             }}
//         />
//     );
// };
// const reload = ()=>{
//     const current = props.location.pathname;
//     this.props.history.replace(`/reload`);
//        setTimeout(() => {
//          this.props.history.replace(current);
//        });
//    }
class App extends Component {
    render() {
        return(
            <HashRouter>
                <Switch>
                    {/* <Route path="/reload" component={reload} key="reload" /> */}
                    <Route path="/login" exact component={Login} />
                    <ProtectedRoute path="/"  component={SystemRoutes} />
                    {/* <DefaultLayout/> */}
                    {/*<Route path="/login" name="Login Page" component={Login}/>*/}
                    {/*<EnsureLoggedInContainer>*/}
                    {/*<SystemRoutes/>*/}
                    {/*</EnsureLoggedInContainer>*/}
                </Switch>
            </HashRouter>
        );
            }
}

export default App;
