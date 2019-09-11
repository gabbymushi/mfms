import React, { Component } from 'react';
import { DefaultLayout } from '../../containers';
// import { withRouter } from 'react-router-dom';
import { withRouter, HashRouter, Route, Switch, Redirect } from 'react-router-dom';
import axios from 'axios';
import { Button, Card, CardBody, CardGroup, Col, Container, Form, Input, InputGroup, InputGroupAddon, InputGroupText, Row } from 'reactstrap';
import SystemParameters from '../../SystemParameters';
let apiBaseUrl = SystemParameters.apiBaseUrl;
class Login extends Component {
    constructor(props) {
        super(props);
        this.state = {
            username: '',
            password: '',
            redirectToReferrer: false
        };
        this.handleClick = this.handleClick.bind(this);
        this.handleUsername = this.handleUsername.bind(this);
        this.handlePassword = this.handlePassword.bind(this);
    }
    handleUsername(e) {
        this.setState({ username: e.target.value });
    }
    handlePassword(e) {
        this.setState({ password: e.target.value });
        //this.setState({isLogin:'test'});
    }
    handleClick(e) {
        e.preventDefault();
        localStorage.clear();
        let url = apiBaseUrl + '/login';
        console.log(this.state.username);
        axios.post(url, {
            email: this.state.username,
            password: this.state.password
        })
            .then((response) => {
                console.log(response);
                const token = response.data.token;
                const userType = response.data.user.user_type;
                //const userInfo = response.data.user;
                const userInfo = response.data.user_info
                localStorage.setItem('token', token);
                localStorage.setItem('user_type', userType);
                localStorage.setItem('userInfo', JSON.stringify(userInfo));
                console.log('emp', localStorage.getItem('userInfo'))
                console.log('raw', userInfo)
                if (userType === "member") {
                    const group_id = response.data.user.group_id;
                    localStorage.setItem('group_id', group_id);
                } else if (userType === "manager") {
                    const organization_id = response.data.user_info.organization_id;
                    localStorage.setItem('organization_id', organization_id);
                } 
                //console.log('mmmmh',JSON.parse(localStorage.getItem('userInfo')).email);
                console.log('mimi sasaa', localStorage.getItem('user_type'));
                //let path = `/`;
                //this.props.history.push(path);
                this.setState({ redirectToReferrer: true })
            })
            .catch((error) => {
                console.log(error);
                localStorage.removeItem('token');
            });
        // //this.setState({isLogin:'test'});
        // // if((this.state.username==="gabby" && this.state.password==="123")){
        // //     localStorage.setItem('isLogin',)
        // //     console.log(localStorage.getItem('isLogin'));
        // //     let path = `/`;
        // //     this.props.history.push(path);
        //     // this.setState({isLogin:'testt'}, function () {
        //     //
        //     // });
        //    // return <DefaultLayout login={this.state.isLogin}/>
        // }
    }

    render() {
        const { from } = this.props.location.state || { from: { pathname: '/' } }
        const { redirectToReferrer } = this.state;

        if (redirectToReferrer) {
            return (
                <Redirect isLogin={redirectToReferrer} to={from} />
            )
        }
        return (
            <div className="app flex-row align-items-center">
                <Container>
                    <Row className="justify-content-center">
                        <Col md="8">
                            <CardGroup>
                                <Card className="p-4">
                                    <CardBody>
                                        <Form onSubmit={this.handleClick} >
                                            <h1>Login</h1>
                                            <p className="text-muted">Signss In to your account</p>
                                            <InputGroup className="mb-3">
                                                <InputGroupAddon addonType="prepend">
                                                    <InputGroupText>
                                                        <i className="icon-user"></i>
                                                    </InputGroupText>
                                                </InputGroupAddon>
                                                <Input type="email"
                                                    required
                                                    value={this.state.username}
                                                    onChange={this.handleUsername}
                                                    placeholder="Username" />
                                            </InputGroup>
                                            <InputGroup className="mb-4">
                                                <InputGroupAddon addonType="prepend">
                                                    <InputGroupText>
                                                        <i className="icon-lock"></i>
                                                    </InputGroupText>
                                                </InputGroupAddon>
                                                <Input type="password" value={this.state.password}
                                                    required
                                                    onChange={this.handlePassword}
                                                    placeholder="Password" autoComplete="current-password" />
                                            </InputGroup>
                                            <Row>
                                                <Col xs="6">
                                                    <Button color="primary" className="px-4">Login</Button>
                                                </Col>
                                                <Col xs="6" className="text-right">
                                                    <Button color="link" className="px-0">Forgot password?</Button>
                                                </Col>
                                            </Row>
                                        </Form>
                                    </CardBody>
                                </Card>
                                <Card className="text-white bg-primary py-5 d-md-down-none" style={{ width: 44 + '%' }}>
                                    <CardBody className="text-center">
                                        <div>
                                            <h2>Sign up</h2>
                                            <p>Lorem ipsum dolor sit amet, consectetur adipisicing elit, sed do eiusmod tempor incididunt ut
                                                labore et dolore magna aliqua.</p>
                                            <Button color="primary" className="mt-3" active>Register Now!</Button>
                                        </div>
                                    </CardBody>
                                </Card>
                            </CardGroup>
                        </Col>
                    </Row>
                </Container>
            </div>

        );

    }
}

export default withRouter(Login);
