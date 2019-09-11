import React, { Component } from 'react';
import axios from 'axios';
import {
    Badge,
    Button,
    ButtonDropdown,
    Card,
    CardBody,
    CardFooter,
    CardHeader,
    Col,
    Collapse,
    DropdownItem,
    DropdownMenu,
    DropdownToggle,
    Fade,
    Form,
    FormGroup,
    FormText,
    FormFeedback,
    Input,
    InputGroup,
    InputGroupAddon,
    InputGroupText,
    Label,
    Row,
} from 'reactstrap';
import SystemParameters from '../../SystemParameters';
let apiBaseUrl = SystemParameters.apiBaseUrl;
class RegisterUser extends Component {
    constructor(props) {
        super(props);

        this.handleFirstName = this.handleFirstName.bind(this);
        this.handleEmail = this.handleEmail.bind(this);
        this.handleMiddleName = this.handleMiddleName.bind(this);
        this.handleLastName = this.handleLastName.bind(this);
        this.handleSex = this.handleSex.bind(this);
        this.handleBirthday = this.handleBirthday.bind(this);
        this.handlePhoneNo = this.handlePhoneNo.bind(this);
        this.handlePhoneNo2 = this.handlePhoneNo2.bind(this);
        this.handleAddress = this.handleAddress.bind(this);
        this.handleResidence = this.handleResidence.bind(this);
        this.handleSubmit = this.handleSubmit.bind(this);
        this.state = {
            first_name: '',
            middle_name: '',
            last_name: '',
            gender: '',
            birthday: '',
            phone_no: '',
            phone_no_2: '',
            email: '',
            address: '',
            residence: '',
            business: '',
            joinDate: ''
        };
    }

    handleFirstName(e) {
        this.setState({ first_name: e.target.value });
    }
    handleMiddleName(e) {
        this.setState({ middle_name: e.target.value });
    }
    handleLastName(e) {
        this.setState({ last_name: e.target.value });
    }
    handleSex(e) {
        this.setState({ gender: e.target.value });
    }
    handleBirthday(e) {
        this.setState({ birthday: e.target.value });
    }
    handlePhoneNo(e) {
        this.setState({ phone_no: e.target.value });
    }
    handlePhoneNo2(e) {
        this.setState({ phone_no_2: e.target.value });
    }
    handleEmail(e) {
        this.setState({ email: e.target.value });
    }
    handleAddress(e) {
        this.setState({ address: e.target.value });
    }
    handleResidence(e) {
        this.setState({ residence: e.target.value });
    }
     handleJoinDate = (e) => {
        this.setState({ joinDate: e.target.value });
    }
    handleBusiness= (e) => {
        this.setState({ business: e.target.value });
    }

    handleSubmit(e) {
        e.preventDefault();
        let group_id = this.props.match.params.id;
        if (group_id === "group") {
            group_id = localStorage.getItem('group_id')
        } else {
            group_id = this.props.match.params.id
        }
        const data = {
            first_name: this.state.first_name,
            middle_name: this.state.middle_name,
            last_name: this.state.last_name,
            gender: this.state.gender,
            birthday: this.state.birthday,
            phone_no: this.state.phone_no,
            phone_no_2: this.state.phone_no_2,
            email: this.state.email,
            address: this.state.address,
            group_id: group_id,
            residence: this.state.residence
        };
        let token = localStorage.getItem('token');
        const headers = {
            //'Content-Type': 'application/json',
            'Authorization': 'Bearer ' + token
        }

        let url = apiBaseUrl + '/add_user';
        axios.post(url, data, { headers: headers }).then((response) => {
            console.log(response.data);
            this.setState({
                first_name: '',
                middle_name: '',
                last_name: '',
                gender: '',
                birthday: '',
                phone_no: '',
                phone_no_2: '',
                email: '',
                address: '',
                residence: '',
                business: '',
                joinDate: ''
            });
        }).catch((error) => {
            console.log(error.request);
        });

        //this.setState({email: e.target.value });
        //alert(this.state.password);
    }

    render() {
        return (
            <div className="animated fadeIn">
                <Row>
                    <Col xs="12" md="12">
                        <Card>
                            <Form onSubmit={this.handleSubmit} action="" method="post" encType="multipart/form-data"
                                className="form-horizontal">
                                <CardHeader>
                                    <strong>Member</strong> Registration
                                </CardHeader>
                                <CardBody>
                                    <FormGroup row>
                                        <Col md="">
                                            <Label htmlFor="text-input">First Name</Label>
                                        </Col>
                                        <Col xs="12" md="4">
                                            <Input
                                                onChange={this.handleFirstName}
                                                value={this.state.first_name}
                                                type="text" id="text-input"
                                                name="text-input" placeholder="First Name"
                                                required />
                                            {/*<FormText color="muted">This is a help text</FormText>*/}
                                        </Col>  <Col md="2">
                                            <Label htmlFor="text-input">Middle Name</Label>
                                        </Col>
                                        <Col xs="12" md="4">
                                            <Input
                                                onChange={this.handleMiddleName}
                                                value={this.state.middle_name}
                                                type="text" id="text-input"
                                                name="text-input" placeholder="Middle Name"
                                                required />
                                            {/*<FormText color="muted">This is a help text</FormText>*/}
                                        </Col>
                                    </FormGroup>
                                    <FormGroup row>
                                        <Col md="">
                                            <Label htmlFor="text-input">Last Name</Label>
                                        </Col>
                                        <Col xs="12" md="4">
                                            <Input
                                                onChange={this.handleLastName}
                                                value={this.state.last_name}
                                                type="text" id="text-input"
                                                name="text-input" placeholder="Last Name"
                                                required />
                                            {/*<FormText color="muted">This is a help text</FormText>*/}
                                        </Col>  <Col md="2">
                                            <Label htmlFor="text-input">Sex</Label>
                                        </Col>
                                        <Col xs="12" md="4">
                                            <Input type="select"
                                                onChange={this.handleSex}
                                                value={this.state.gender}
                                                name="select" id="select" required>
                                                <option value="">Select Sex</option>
                                                <option value="male">Male</option>
                                                <option value="female">Female</option>
                                            </Input>
                                            {/*<FormText color="muted">This is a help text</FormText>*/}
                                        </Col>
                                    </FormGroup>
                                    <FormGroup row>
                                        <Col md="">
                                            <Label htmlFor="text-input">Birthday</Label>
                                        </Col>
                                        <Col xs="12" md="4">
                                            <Input
                                                onChange={this.handleBirthday}
                                                value={this.state.birthday}
                                                type="date" id="text-input"
                                                name="text-input" placeholder="Birthday"
                                                required />
                                            {/*<FormText color="muted">This is a help text</FormText>*/}
                                        </Col>  <Col md="2">
                                            <Label htmlFor="text-input">Phone No</Label>
                                        </Col>
                                        <Col xs="12" md="4">
                                            <Input
                                                onChange={this.handlePhoneNo}
                                                value={this.state.phone_no}
                                                type="text" id="text-input"
                                                name="text-input" placeholder="Phone No"
                                                required />
                                            {/*<FormText color="muted">This is a help text</FormText>*/}
                                        </Col>
                                    </FormGroup>
                                    <FormGroup row>
                                        <Col md="">
                                            <Label htmlFor="text-input">Alternative Phone No</Label>
                                        </Col>
                                        <Col xs="12" md="4">
                                            <Input
                                                onChange={this.handlePhoneNo2}
                                                value={this.state.phone_no_2}
                                                type="text" id="text-input"
                                                name="text-input" placeholder="Phone No"
                                                required />
                                            {/*<FormText color="muted">This is a help text</FormText>*/}
                                        </Col>  <Col md="2">
                                            <Label htmlFor="text-input">Email</Label>
                                        </Col>
                                        <Col xs="12" md="4">
                                            <Input
                                                onChange={this.handleEmail}
                                                value={this.state.email}
                                                type="email" id="text-input"
                                                name="text-input" placeholder="Name"
                                                required />
                                            {/*<FormText color="muted">This is a help text</FormText>*/}
                                        </Col>
                                    </FormGroup>
                                    <FormGroup row>
                                        <Col md="">
                                            <Label htmlFor="text-input">Address</Label>
                                        </Col>
                                        <Col xs="12" md="4">
                                            <Input
                                                onChange={this.handleAddress}
                                                value={this.state.address}
                                                type="text" id="text-input"
                                                name="text-input" placeholder="Address"
                                                required />
                                            {/*<FormText color="muted">This is a help text</FormText>*/}
                                        </Col>  <Col md="2">
                                            <Label htmlFor="text-input">Residence</Label>
                                        </Col>
                                        <Col xs="12" md="4">
                                            <Input
                                                onChange={this.handleResidence}
                                                value={this.state.residence}
                                                type="text" id="text-input"
                                                name="text-input" placeholder="Residence"
                                                required />
                                            {/*<FormText color="muted">This is a help text</FormText>*/}
                                        </Col>
                                    </FormGroup>
                                    <FormGroup row>
                                        <Col md="2">
                                            <Label htmlFor="text-input">Business</Label>
                                        </Col>
                                        <Col xs="12" md="4">
                                            <Input
                                                onChange={this.handleBusiness}
                                                value={this.state.business}
                                                type="text" id="text-input"
                                                name="text-input" placeholder="Business"
                                                required />
                                            {/*<FormText color="muted">This is a help text</FormText>*/}
                                        </Col>
                                        <Col md="">
                                            <Label htmlFor="text-input">Join Date</Label>
                                        </Col>
                                        <Col xs="12" md="4">
                                            <Input
                                                onChange={this.handleJoinDate}
                                                value={this.state.joinDate}
                                                type="date"
                                                name="text-input" placeholder="Join Date"
                                                required />
                                            {/*<FormText color="muted">This is a help text</FormText>*/}
                                        </Col>
                                    </FormGroup>
                                </CardBody>
                                <CardFooter>
                                    <Button type="submit" size="sm" color="primary">
                                        <i className="fa fa-dot-circle-o"></i> Next</Button>
                                    <Button type="reset" size="sm" color="danger">
                                        <i className="fa fa-ban"></i> Reset</Button>
                                </CardFooter>
                            </Form>
                        </Card>
                    </Col>
                </Row>
            </div>
        );
    }
}

export default RegisterUser;
