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
let apiBaseUrl=SystemParameters.apiBaseUrl;
function SharesTable(props) {
    let i = 0;
    let totalValue = 0;
    let totalShares = 0;
    const content = [];
    for (const share of  props.shares) {
        // count += item.content.value
        //share.share_amount;
        i++;
        content.push(<tr key={share.share_id}>
            <td>{i}</td>
            <td>{share.share_amount}</td>
            <td>{share.share_value.toFixed(2).replace(/\d(?=(\d{3})+\.)/g, '$&,')}</td>
        </tr>)
        totalValue += share.share_value;
        totalShares += share.share_amount;

    }
    content.push(<tr key={'totalRow'}>
        <td><b>TOTAL</b></td>
        <td><b>{totalShares.toFixed(0).replace(/\d(?=(\d{3})+\.)/g, '$&,')}</b></td>
        <td><b>{totalValue.toFixed(2).replace(/\d(?=(\d{3})+\.)/g, '$&,')}</b></td>
    </tr>)
    return (
        <Table hover bordered striped responsive size="sm">
            <thead>
            <tr>
                <th>SN</th>
                <th>No Of Shares</th>
                <th>Value</th>
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

class Shares extends Component {
    constructor(props) {
        super(props);

        this.handleShareAmount = this.handleShareAmount.bind(this);
        this.handleShareValue = this.handleShareValue.bind(this);
        // this.getData = this.getData.bind(this);
        this.handleSubmit = this.handleSubmit.bind(this);
        this.state = {
            shareAmount: '',
            sharevalue: '',
            member_id: this.props.match.params.id,
            shares: []
        };
    }
    handleShareAmount(e) {
        this.setState({shareAmount: e.target.value});
    }

    handleShareValue(e) {
        this.setState({sharevalue: e.target.value});
    }

    // handlePassword(e) {
    //     this.setState({password: e.target.value});
    // }

    handleSubmit(e) {
        e.preventDefault();
        const data = {
            shareAmount: this.state.shareAmount,
            sharevalue: this.state.sharevalue,
            member_id: this.state.member_id,
        }
        let token = localStorage.getItem('token');
        const headers = {
            //'Content-Type': 'application/json',
            'Authorization': 'Bearer ' + token
        }

        let url = apiBaseUrl+'/buy_share';
        axios.post(url, data, {headers: headers}).then((response) => {
            console.log(response.data);
            this.setState({
                shareAmount: '',
                sharevalue: ''
            });
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
        let member_id = this.props.match.params.id;
        let token = localStorage.getItem('token');
        let uri = apiBaseUrl+'/get_shares';
        let config = {
            headers: {'Authorization': 'Bearer ' + token},
            params: {
                member_id: member_id
            },
        }
        axios.get(uri, config).then(response => {
            this.setState({
                shares: response.data
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
                                    <strong>Buy</strong> Shares
                                </CardHeader>
                                <CardBody>
                                    <FormGroup row>
                                        <Col md="3">
                                            <Label htmlFor="text-input">No Of Share</Label>
                                        </Col>
                                        <Col xs="12" md="9">
                                            <Input
                                                onChange={this.handleShareAmount}
                                                value={this.state.shareAmount}
                                                type="number" id="text-input"
                                                name="text-input" placeholder="Share Amount"
                                                required/>
                                            {/*<FormText color="muted">This is a help text</FormText>*/}
                                        </Col>
                                    </FormGroup>
                                    <FormGroup row>
                                        <Col md="3">
                                            <Label htmlFor="email-input">Share Value</Label>
                                        </Col>
                                        <Col xs="12" md="9">
                                            <Input
                                                onChange={this.handleShareValue}
                                                value={this.state.sharevalue}
                                                type="number"
                                                step="0.01"
                                                id="share-value"
                                                name="email-input"
                                                placeholder="Share Value"/>
                                            {/*<FormText className="help-block">Please enter your email</FormText>*/}
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
                                <i className="fa fa-align-justify"></i> Share Account
                            </CardHeader>
                            <CardBody>
                                <SharesTable  shares={this.state.shares}/>
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

export default Shares;
