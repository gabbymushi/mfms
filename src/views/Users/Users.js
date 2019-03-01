import React, { Component } from 'react';
import axios from 'axios';
import { Badge, Card, CardBody, CardHeader, Col, Row, Table } from 'reactstrap';

import SystemParameters from '../../SystemParameters';
let apiBaseUrl = SystemParameters.apiBaseUrl;
function MemberRow(props) {
    const member = props.members
    const userLink = `#/users/${member.member_id}`

    const getBadge = (status) => {
        return status === 'Active' ? 'success' :
            status === 'Inactive' ? 'secondary' :
                status === 'Pending' ? 'warning' :
                    status === 'Banned' ? 'danger' :
                        'primary'
    }
    return (
        <tr key={member.member_id.toString()}>
            <th scope="row"><a href={userLink}>{props.sn+1}</a></th>
            <td><a href={userLink}>{member.first_name} {member.middle_name} {member.last_name}</a></td>
            <td>{member.gender.charAt(0).toUpperCase() + member.gender.slice(1)}</td>
            <td>{member.phone_no}</td>
            <td>{member.residence}</td>
            <td><Badge href={userLink} color={getBadge('active')}>Active</Badge></td>
        </tr>

    )
}

class Users extends Component {
    constructor(props) {
        super(props);
        this.state = {
            value: '',
            members: []
        };
    }
    //let  uri = 'http://localhost:8000/api/get_users';
    componentDidMount() {
        let group_id = this.props.match.params.id;
        if (group_id == 'group') {
            group_id = localStorage.getItem('group_id')
        } else {
            group_id = this.props.match.params.id
        }
        let token = localStorage.getItem('token');
        let uri = apiBaseUrl + '/get_members/' + group_id;
        axios.get(uri, {
            headers: { 'Authorization': 'Bearer ' + token }
        }).then(response => {
            this.setState({
                members: response.data
            });
            console.log(this.state.members);
        }).catch((error) => {
            console.log(error)
        });
        return;
    }
    render() {

        //const userList = usersData.filter((user) => user.id < 10)
        return (
            <div className="animated fadeIn">
                <Row>
                    <Col xl={12}>
                        <Card>
                            <CardHeader>
                                <i className="fa fa-align-justify"></i> Users <small
                                    className="text-muted">example</small>
                            </CardHeader>
                            <CardBody>
                                <Table responsive hover>
                                    <thead>
                                        <tr>
                                            <th scope="col">Sn</th>
                                            <th scope="col">Full name</th>
                                            <th scope="col">Gender</th>
                                            <th scope="col">Phone no</th>
                                            <th scope="col">Residance</th>
                                            <th scope="col">status</th>
                                        </tr>
                                    </thead>
                                    <tbody>
                                        {this.state.members.map((member, index) =>
                                            <MemberRow sn={index}  key={index} members={member} />
                                        )}
                                    </tbody>
                                </Table>
                            </CardBody>
                        </Card>
                    </Col>
                </Row>
            </div>
        )
    }
}

export default Users;
