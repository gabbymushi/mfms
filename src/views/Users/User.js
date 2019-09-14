import React, { Component } from 'react';
import { Button, Badge, Card, CardBody, CardHeader, Col, Row, Table, ListGroup, ListGroupItem, ListGroupItemHeading, ListGroupItemText } from 'reactstrap';
import { Link } from 'react-router-dom';

import axios from "axios";
import SystemParameters from '../../SystemParameters';
let apiBaseUrl = SystemParameters.apiBaseUrl;
class User extends Component {
    constructor(props) {
        super(props);
        this.state = {
            value: '',
            member: []
        };
    }
    componentDidMount() {
        let member_id = this.props.match.params.id;
        let token = localStorage.getItem('token');
        let uri = apiBaseUrl + '/get_member/' + member_id;
        let config = {
            headers: { 'Authorization': 'Bearer ' + token },
            // params: {
            //     user:user
            // },
        }
        axios.get(uri, config).then(response => {
            this.setState({
                member: response.data
            });
            // console.log(response.data);
            //console.log(this.state.user);
        }).catch((error) => {
            console.log(error)
        });

    }
    render() {

        //user = usersData.find( user => user.id.toString() === this.props.match.params.id)
        //const user = this.state.user[0];
        //const info = user[0];
        if (this.state.member.length > 0) {
            //console.log(this.member.user[0]);
            const member = this.state.member[0];

            //const userDetails = user ? Object.entries(user) : [['id', (<span><i className="text-muted icon-ban"></i> Not found</span>)]]
            const sharesLink = `/shares/${this.props.match.params.id}`
            const loanLink = `/processLoan/${this.props.match.params.id}`
            return (
                <div className="animated fadeIn">
                    <Row>
                        <Col xs="12" md="12">
                            <Card>
                                <CardHeader>
                                    Select appropriate action
                  </CardHeader>
                                <CardBody>
                                    <Row className="align-items-center">
                                        {/*<Col col="12" xl className="mb-3 mb-xl-0">*/}
                                        {/*Normal*/}
                                        {/*</Col>*/}
                                        <Col col="6" sm="4" md="2" xl className="mb-3 mb-xl-0">
                                            <Button tag={Link} to={sharesLink} block color="primary">Buy Share</Button>
                                        </Col>
                                        <Col col="6" sm="4" md="2" xl className="mb-3 mb-xl-0">
                                            <Button tag={Link} to={loanLink} block color="danger">Grant Loan</Button>
                                        </Col>
                                        <Col col="6" sm="4" md="2" xl className="mb-3 mb-xl-0">
                                            <Button block color="secondary">Return Loan</Button>
                                        </Col>
                                        <Col col="6" sm="4" md="2" xl className="mb-3 mb-xl-0">
                                            <Button block color="success">Deposit</Button>
                                        </Col>
                                        <Col col="6" sm="4" md="2" xl className="mb-3 mb-xl-0">
                                            <Button block color="warning">Withdraw</Button>
                                        </Col>
                                    </Row>
                                </CardBody>
                            </Card>
                        </Col>
                    </Row>
                    <Row>
                        <Col lg={8}>
                            <Card>
                                <CardHeader>
                                    <strong><i className="icon-info pr-1"></i>Member's Information</strong>
                                </CardHeader>
                                <CardBody>
                                    <Table responsive striped hover>
                                        <tbody>
                                            <tr>
                                                <td>Full Name</td>
                                                <td><strong>{member.first_name} {member.middle_name} {member.last_name}</strong></td>
                                            </tr>
                                            <tr>
                                                <td>Gender</td>
                                                <td><strong>{member.gender}</strong></td>
                                            </tr>
                                            <tr>
                                                <td>Birthday</td>
                                                <td><strong>{member.birthday}</strong></td>
                                            </tr>
                                            <tr>
                                                <td>Phone No</td>
                                                <td><strong>{member.phone_no}</strong></td>
                                            </tr>
                                            <tr>
                                                <td>Altenative phone no</td>
                                                <td><strong>{member.phone_no_2}</strong></td>
                                            </tr>
                                            <tr>
                                                <td>E-mail</td>
                                                <td><strong>{member.email}</strong></td>
                                            </tr>
                                            <tr>
                                                <td>Address</td>
                                                <td><strong>{member.address}</strong></td>
                                            </tr> 
                                            <tr>
                                                <td>Business</td>
                                                <td><strong>{member.business}</strong></td>
                                            </tr>
                                            <tr>
                                                <td>Registered Date</td>
                                                <td><strong>{member.created_at}</strong></td>
                                            </tr>
                                            <tr>
                                                <td>Join Date</td>
                                                <td><strong>{member.join_date}</strong></td>
                                            </tr>
                                           
                                        </tbody>
                                    </Table>
                                </CardBody>
                            </Card>
                        </Col>
                        <Col sm="12" xl="4">
                            <Card>
                                <CardHeader>
                                    <i className="fa fa-align-justify"></i><strong>Accounts Summary</strong>
                                    <small> </small>
                                </CardHeader>
                                <CardBody>
                                    <ListGroup>
                                        <ListGroupItem className="justify-content-between">Savings Account <Badge className="float-right" pill>25,000,400 TZS</Badge></ListGroupItem>
                                        <ListGroupItem className="justify-content-between">Loans Account <Badge className="float-right" pill>2,000,040 TZS</Badge></ListGroupItem>
                                        <ListGroupItem className="justify-content-between">Share Account<Badge className="float-right" pill>4,000,000 TZS</Badge></ListGroupItem>
                                    </ListGroup>
                                </CardBody>
                            </Card>
                        </Col>
                    </Row>
                    <Row>
                        <Col lg={8}>
                            <Card>
                                <CardHeader>
                                    <strong><i className="icon-info pr-1"></i>Heir' deteils</strong>
                                </CardHeader>
                                <CardBody>
                                    <Table responsive striped hover>
                                        <tbody>
                                            <tr>
                                                <td>Full Name</td>
                                                <td><strong>{member.heir.first_name} {member.heir.middle_name} {member.heir.last_name}</strong></td>
                                            </tr>
                                            <tr>
                                                <td>Gender</td>
                                                <td><strong>{member.heir.gender}</strong></td>
                                            </tr>
                                            <tr>
                                                <td>Birthday</td>
                                                <td><strong>{member.heir.birthday}</strong></td>
                                            </tr>
                                            <tr>
                                                <td>Phone No</td>
                                                <td><strong>{member.heir.phone_no}</strong></td>
                                            </tr>
                                            <tr>
                                                <td>Altenative phone no</td>
                                                <td><strong>{member.heir.phone_no_2}</strong></td>
                                            </tr>
                                            <tr>
                                                <td>E-mail</td>
                                                <td><strong>{member.heir.email}</strong></td>
                                            </tr>
                                            <tr>
                                                <td>Address</td>
                                                <td><strong>{member.heir.address}</strong></td>
                                            </tr> 
                                            <tr>
                                                <td>Business</td>
                                                <td><strong>{member.heir.business}</strong></td>
                                            </tr>
                                            <tr>
                                                <td>Relation</td>
                                                <td><strong>{member.heir.relation}</strong></td>
                                            </tr>
                                           
                                        </tbody>
                                    </Table>
                                </CardBody>
                            </Card>
                        </Col>
                        <Col sm="12" xl="4">
                  {/*           <Card>
                                <CardHeader>
                                    <i className="fa fa-align-justify"></i><strong>Accounts Summary</strong>
                                    <small> </small>
                                </CardHeader>
                                <CardBody>
                                    <ListGroup>
                                        <ListGroupItem className="justify-content-between">Savings Account <Badge className="float-right" pill>25,000,400 TZS</Badge></ListGroupItem>
                                        <ListGroupItem className="justify-content-between">Loans Account <Badge className="float-right" pill>2,000,040 TZS</Badge></ListGroupItem>
                                        <ListGroupItem className="justify-content-between">Share Account<Badge className="float-right" pill>4,000,000 TZS</Badge></ListGroupItem>
                                    </ListGroup>
                                </CardBody>
                            </Card> */}
                        </Col>
                    </Row>
                </div>
            )
        } else return null;
    }
}

export default User;
