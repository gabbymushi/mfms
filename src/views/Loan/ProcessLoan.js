import React, {Component} from 'react';
import SystemParameters from '../../SystemParameters';
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
    Pagination, PaginationItem, PaginationLink, Table
} from 'reactstrap';

let apiBaseUrl = SystemParameters.apiBaseUrl;

function LoansTable(props) {
    let i = 0;
    let totalPrincipal = 0;
    let totalInterest = 0;
    const content = [];
    for (const loan of  props.loansProp) {
        // count += item.content.value
        //share.share_amount;
        const loanLink = `#/installments/${loan.member_id}/${loan.loan_id}`
        i++;
        content.push(<tr key={loan.loan_id}>
            <td>{i}</td>
            <td><a href={loanLink}>{loan.loan_principal.toFixed(2).replace(/\d(?=(\d{3})+\.)/g, '$&,')}</a></td>
            <td>{loan.loan_interest.toFixed(2).replace(/\d(?=(\d{3})+\.)/g, '$&,')}</td>
            <td>0.00</td>
            <td>0.00</td>
        </tr>)
        totalPrincipal += loan.loan_principal;
        totalInterest += loan.loan_interest;

    }
    content.push(<tr key={'totalRow'}>
        <td><b>TOTAL</b></td>
        <td><b>{totalPrincipal.toFixed(2).replace(/\d(?=(\d{3})+\.)/g, '$&,')}</b></td>
        <td><b>{totalInterest.toFixed(2).replace(/\d(?=(\d{3})+\.)/g, '$&,')}</b></td>
        <td><b>0.00</b></td>
        <td><b>0.00</b></td>
    </tr>)
    return (
        <Table hover bordered striped responsive size="sm">
            <thead>
            <tr>
                <th>SN</th>
                <th>Principal</th>
                <th>Interest</th>
                <th>Principal Repaid</th>
                <th>Interest Received</th>
                {/*<th>Role</th>*/}
                {/*<th>Status</th>*/}
            </tr>
            </thead>
            <tbody>
            {content}
            </tbody>
        </Table>
    )
}

class ProcessLoan extends Component {
    constructor(props) {
        super(props);
        this.member_id = this.props.match.params.id;
        this.handlePrincipalAmount = this.handlePrincipalAmount.bind(this);
        this.handleInterest = this.handleInterest.bind(this);
        this.handleLoanFee = this.handleLoanFee.bind(this);
        this.handleLoanDuration = this.handleLoanDuration.bind(this);
        this.handleLoanInsurance = this.handleLoanInsurance.bind(this);
        this.handleDurationType = this.handleDurationType.bind(this);
        this.handleReturnDuration = this.handleReturnDuration.bind(this);
        this.handleReturnDurationType = this.handleReturnDurationType.bind(this);
        this.handleLoanDate = this.handleLoanDate.bind(this);
        // this.getData = this.getData.bind(this);
        this.handleSubmit = this.handleSubmit.bind(this);
        this.state = {
            principal: '',
            interest: '',
            loanfee: '',
            loanduration: '',
            loaninsurance: '',
            durationtype: '',
            returnduration: '',
            returndurationtype: '',
            loandate: '',
            member_id: this.props.match.params.id,
            loans: []
        };
    }

    handlePrincipalAmount(e) {
        this.setState({principal: e.target.value});
        let rate = e.target.value * 3 / 100;
        let fee = e.target.value * 1.5 / 100;
        let insuarance = e.target.value * 4 / 100;
        this.setState({interest: rate});
        this.setState({loanfee: fee});
        this.setState({loaninsurance: insuarance});
    }

    handleInterest(e) {
        this.setState({interest: e.target.value});
    }

    handleLoanFee(e) {
        this.setState({loanfee: e.target.value});
    }

    handleLoanDuration(e) {
        this.setState({loanduration: e.target.value});
    }

    handleDurationType(e) {
        this.setState({durationtype: e.target.value});
    }
    handleLoanInsurance(e) {
        this.setState({loaninsurance: e.target.value});
    }
    handleReturnDuration(e) {
        this.setState({returnduration: e.target.value});
    }
    handleReturnDurationType(e) {
        this.setState({returndurationtype: e.target.value});
    }
    handleLoanDate(e) {
        this.setState({loandate: e.target.value});
    }

    // handlePassword(e) {
    //     this.setState({password: e.target.value});
    // }

    handleSubmit(e) {
        e.preventDefault();
        const data = {
            member_id: this.member_id,
            loan_principal: this.state.principal,
            loan_interest: this.state.interest,
            loan_fee: this.state.loanfee,
            loan_insurance: this.state.loaninsurance,
            loan_duration: this.state.loanduration,
            date_issued: this.state.loandate,
            duration_type: this.state.durationtype,
            return_duration: this.state.returnduration,
            return_duration_type: this.state.returndurationtype,
        }
        let token = localStorage.getItem('token');
        const headers = {
            //'Content-Type': 'application/json',
            'Authorization': 'Bearer ' + token
        }

        let url = apiBaseUrl + '/grant_loan';
        axios.post(url, data, {headers: headers}).then((response) => {
            console.log(response.data);
            // this.setState({
            //     principal: '',
            //     interest: '',
            //     loanfee: '',
            //     loanduration: '',
            //     loaninsurance: '',
            //     loandate: '',
            //     durationtype: '',
            //     returnduration: '',
            //     returndurationtype: '',
            // });
            this.getData();
        }).catch((error) => {
            console.log(error.request);
        });

        //this.setState({email: e.target.value });
        //alert(this.state.password);
    }

    componentDidMount() {
        this.getData();

    }

    getData() {
        // let member_id = this.props.match.params.id;
        let token = localStorage.getItem('token');
        let uri = apiBaseUrl + '/get_member_loan';
        let config = {
            headers: {'Authorization': 'Bearer ' + token},
            params: {
                member_id: this.member_id
            },
        }
        axios.get(uri, config).then(response => {
            this.setState({
                loans: response.data
            });
            console.log(response.data);
            //console.log(this.state.user);
        }).catch((error) => {
            console.log(error)
        });
    }

    render() {
        return (
            <div className="animated fadeIn">
                <Row>
                    <Col xs="12" md="6">
                        <Card>
                            <Form onSubmit={this.handleSubmit} action="" method="post" encType="multipart/form-data"
                                  className="form-horizontal">
                                <CardHeader>
                                    <strong>Loan</strong> Application
                                </CardHeader>
                                <CardBody>
                                    <FormGroup row>
                                        <Col md="3">
                                            <Label htmlFor="text-input">Principal Amount</Label>
                                        </Col>
                                        <Col xs="12" md="9">
                                            <Input
                                                onChange={this.handlePrincipalAmount}
                                                value={this.state.principal}
                                                type="number" id="text-input"
                                                name="text-input" placeholder="Principal Amount"
                                                required/>
                                            {/*<FormText color="muted">This is a help text</FormText>*/}
                                        </Col>
                                    </FormGroup>
                                    <FormGroup row>
                                        <Col md="3">
                                            <Label htmlFor="email-input">Interest</Label>
                                        </Col>
                                        <Col xs="12" md="9">
                                            <Input
                                                onChange={this.handleInterest}
                                                value={this.state.interest}
                                                type="number"
                                                step="0.01"
                                                id="share-value"
                                                name="email-input"
                                                readOnly="readOnly"
                                                placeholder="Interest"/>
                                            {/*<FormText className="help-block">Please enter your email</FormText>*/}
                                        </Col>
                                    </FormGroup>
                                    <FormGroup row>
                                        <Col md="3">
                                            <Label htmlFor="email-input">Loan Fee</Label>
                                        </Col>
                                        <Col xs="12" md="9">
                                            <Input
                                                onChange={this.handleLoanFee}
                                                value={this.state.loanfee}
                                                type="number"
                                                step="0.01"
                                                id="loan-fee"
                                                name="email-input"
                                                placeholder="Loan Fee"/>
                                            {/*<FormText className="help-block">Please enter your email</FormText>*/}
                                        </Col>
                                    </FormGroup>
                                    <FormGroup row>
                                        <Col md="3">
                                            <Label htmlFor="email-input">Loan Insurance</Label>
                                        </Col>
                                        <Col xs="12" md="9">
                                            <Input
                                                onChange={this.handleLoanInsurance}
                                                value={this.state.loaninsurance}
                                                type="number"
                                                step="0.01"
                                                id="share-value"
                                                name="email-input"
                                                placeholder="Loan Insurance"/>
                                            {/*<FormText className="help-block">Please enter your email</FormText>*/}
                                        </Col>
                                    </FormGroup>
                                    <FormGroup row>
                                        <Col md="3">
                                            <Label htmlFor="email-input">Start date</Label>
                                        </Col>
                                        <Col xs="12" md="9">
                                            <Input
                                                onChange={this.handleLoanDate}
                                                value={this.state.loandate}
                                                type="date"
                                                id="loan-date"
                                                name="email-input"
                                                placeholder="Start date"/>
                                            {/*<FormText className="help-block">Please enter your email</FormText>*/}
                                        </Col>
                                    </FormGroup>
                                    <FormGroup row>
                                        <Col md="3">
                                            <Label htmlFor="email-input">Duration</Label>
                                        </Col>
                                        <Col xs="12" md="5">
                                            <Input
                                                onChange={this.handleLoanDuration}
                                                value={this.state.loanduration}
                                                type="number"
                                                step="0.01"
                                                id="share-value"
                                                name="email-input"
                                                placeholder="Loan Duration"/>
                                            {/*<FormText className="help-block">Please enter your email</FormText>*/}
                                        </Col>
                                        <Col xs="12" md="4">
                                            <Input type="select"
                                                   onChange={this.handleDurationType}
                                                   value={this.state.durationtype}
                                                   name="select" id="select" required>
                                                <option value="">Select</option>
                                                <option value="day">Day(s)</option>
                                                {/*<option value="week">Week(s)</option>*/}
                                                <option value="month">Month(s)</option>
                                                <option value="year">Year(s)</option>
                                            </Input>
                                            {/*<FormText className="help-block">Please enter your email</FormText>*/}
                                        </Col>
                                    </FormGroup>
                                    <FormGroup row>
                                        <Col md="3">
                                            <Label htmlFor="email-input">Return after every</Label>
                                        </Col>
                                        <Col xs="12" md="5">
                                            <Input
                                                onChange={this.handleReturnDuration}
                                                value={this.state.returnduration}
                                                type="number"
                                                step="0.01"
                                                id="share-value"
                                                name="email-input"
                                                placeholder="Loan Duration"/>
                                            {/*<FormText className="help-block">Please enter your email</FormText>*/}
                                        </Col>
                                        <Col xs="12" md="4">
                                            <Input type="select"
                                                   onChange={this.handleReturnDurationType}
                                                   value={this.state.returndurationtype}
                                                   name="select" id="select" required>
                                                <option value="">Select</option>
                                                <option value="day">Day(s)</option>
                                                {/*<option value="week">Week(s)</option>*/}
                                                <option value="month">Month(s)</option>
                                                <option value="year">Year(s)</option>
                                            </Input>
                                            {/*<FormText className="help-block">Please enter your email</FormText>*/}
                                        </Col>
                                    </FormGroup>
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
                    <Col xs="12" md="6">
                        <Card>
                            <CardHeader>
                                <i className="fa fa-align-justify"></i> Loan Account
                            </CardHeader>
                            <CardBody>
                                <LoansTable loansProp={this.state.loans}/>
                                {/*<nav>*/}
                                {/*<Pagination>*/}
                                {/*<PaginationItem><PaginationLink previous tag="button">Prev</PaginationLink></PaginationItem>*/}
                                {/*<PaginationItem active>*/}
                                {/*<PaginationLink tag="button">1</PaginationLink>*/}
                                {/*</PaginationItem>*/}
                                {/*<PaginationItem><PaginationLink tag="button">2</PaginationLink></PaginationItem>*/}
                                {/*<PaginationItem><PaginationLink tag="button">3</PaginationLink></PaginationItem>*/}
                                {/*<PaginationItem><PaginationLink tag="button">4</PaginationLink></PaginationItem>*/}
                                {/*<PaginationItem><PaginationLink next tag="button">Next</PaginationLink></PaginationItem>*/}
                                {/*</Pagination>*/}
                                {/*</nav>*/}
                            </CardBody>
                        </Card>
                    </Col>
                </Row>
            </div>
        );
    }
}

export default ProcessLoan;
