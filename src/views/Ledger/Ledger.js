import React, {Component} from 'react';
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
class Ledger extends Component {
    constructor(props) {
        super(props);

       // this.handleName = this.handleName.bind(this);
        this.handleLedgerType = this.handleLedgerType.bind(this);
        this.handleLedgerName = this.handleLedgerName.bind(this);
        this.handleSubmit = this.handleSubmit.bind(this);
        this.state = {
            ledger_name: '',
            interest: '',
        };
    }

    handleLedgerName(e) {
        this.setState({ledger_name: e.target.value});
    }

    handleLedgerType(e) {
        this.setState({interest: e.target.value});
    }

    // handlePassword(e) {
    //     this.setState({password: e.target.value});
    // }

    handleSubmit(e) {
        e.preventDefault();
        const data = {
            ledger_name:this.state.ledger_name,
            interest: this.state.interest,
        }
        let  token =localStorage.getItem('token');
        const headers = {
            //'Content-Type': 'application/json',
            'Authorization': 'Bearer ' + token
        }

        let url = 'http://localhost:8000/api/add_ledger';
        axios.post(url, data,{headers:headers}).then((response) => {
            console.log(response.data);
            this.setState({
                ledger_name: '',
                interest: '',
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
                            <Form  onSubmit={this.handleSubmit} action="" method="post" encType="multipart/form-data"
                                   className="form-horizontal">
                                <CardHeader>
                                    <strong>Add</strong> Ledger
                                </CardHeader>
                                <CardBody>
                                    <FormGroup row>
                                        <Col md="3">
                                            <Label htmlFor="text-input">Ledger Name</Label>
                                        </Col>
                                        <Col xs="12" md="9">
                                            <Input
                                                onChange={this.handleLedgerName}
                                                value={this.state.ledger_name}
                                                type="text" id="text-input"
                                                name="ledger" placeholder="Ledger Name"
                                                required/>
                                            {/*<FormText color="muted">This is a help text</FormText>*/}
                                        </Col>
                                    </FormGroup>
                                    <FormGroup row>
                                        <Col md="3">
                                            <Label htmlFor="email-input">Ledger Type</Label>
                                        </Col>
                                        <Col xs="12" md="9">
                                            {/*<select onChange={this.handleLedgerType}*/}
                                                    {/*value={this.state.interest}>*/}
                                                {/*<option value="">Please select</option>*/}
                                                {/*<option value="no">Non-Interest</option>*/}
                                                {/*<option value="yes">Interest</option>*/}
                                            {/*</select>*/}
                                            <Input type="select"
                                                   onChange={this.handleLedgerType}
                                                   value={this.state.interest}
                                                   name="select" id="select" required>
                                            <option value="">Please select</option>
                                            <option value="no">Non-Interest</option>
                                            <option value="yes">Interest</option>
                                            </Input>
                                        </Col>
                                    </FormGroup>
                                    {/*<FormGroup row>*/}
                                        {/*<Col md="3">*/}
                                            {/*<Label htmlFor="password-input">Password</Label>*/}
                                        {/*</Col>*/}
                                        {/*<Col xs="12" md="9">*/}
                                            {/*<Input*/}
                                                {/*onChange={this.handlePassword}*/}
                                                {/*value={this.state.password}*/}
                                                {/*type="password" id="password-input"*/}
                                                {/*name="password-input"*/}
                                                {/*placeholder="Password" autoComplete="new-password"/>*/}
                                            {/*/!*<FormText className="help-block">Please enter a complex password</FormText>*!/*/}
                                        {/*</Col>*/}
                                    {/*</FormGroup>*/}
                                    {/*<FormGroup row>*/}
                                    {/*<Col md="3">*/}
                                    {/*<Label htmlFor="date-input">Date Input </Label>*/}
                                    {/*</Col>*/}
                                    {/*<Col xs="12" md="9">*/}
                                    {/*<Input type="date" id="date-input" name="date-input" placeholder="date"/>*/}
                                    {/*</Col>*/}
                                    {/*</FormGroup>*/}
                                    {/*<FormGroup row>*/}
                                    {/*<Col md="3">*/}
                                    {/*<Label htmlFor="select">Select</Label>*/}
                                    {/*</Col>*/}
                                    {/*<Col xs="12" md="9">*/}
                                    {/*<Input type="select" name="select" id="select">*/}
                                    {/*<option value="0">Please select</option>*/}
                                    {/*<option value="1">Option #1</option>*/}
                                    {/*<option value="2">Option #2</option>*/}
                                    {/*<option value="3">Option #3</option>*/}
                                    {/*</Input>*/}
                                    {/*</Col>*/}
                                    {/*</FormGroup>*/}

                                </CardBody>
                                <CardFooter>
                                    <Button type="submit" size="sm" color="primary">
                                        <i className="fa fa-dot-circle-o"></i> Submit</Button>
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

export default Ledger;
