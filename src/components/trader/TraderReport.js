import React, {useContext} from 'react'
import {UserContext} from '../../UserProvider'
import { Container,Nav, Navbar, NavDropdown, Form, FormControl, Button, Breadcrumb } from 'react-bootstrap'
import { Card, Row, Col, Table, ProgressBar} from 'react-bootstrap'

class TraderReport extends React.Component{

	 constructor(props) {
	    super(props);
	    this.state = {
	    	filterText: '',
	    	selectValue: 'clientid',
	    	bankReport : [],
	    	bitcoinReport : [],
	    	allUsers : []
	    };

	    this.handleChange = this.handleChange.bind(this);
	    this.handleSelectChange = this.handleSelectChange.bind(this);
	    this.handleSubmit = this.handleSubmit.bind(this);

	  }

	  handleChange(event) {
	    this.setState({filterText: event.target.value});
	  }

	  handleSelectChange(event) {
	    this.setState({selectValue: event.target.value});
	    fetch('http://localhost:5000/clients')
	    .then(res => res.json())
	    .then((data) => {
	      this.setState({ allUsers: data }, () => console.log('all users data fetched' + data))
	    })
	  }

	  handleSubmit(event) {
	    //alert('A name was submitted: ' + this.state.selectValue);
	    var client_id = this.state.filterText;
	    let filteredData;
		
	    // client_id = filteredData;

	    fetch('http://localhost:5000/bank?client_id='+ this.state.filterText + '&trader_id=2')
	    .then(res => res.json())
	    .then((data) => {
	      this.setState({ bankReport: data }, () => console.log('data fetched' + data))
	    })
	    .catch(console.log)

	   	fetch('http://localhost:5000/btc/trade?client_id='+ this.state.filterText + '&trader_id=2')
	    .then(res => res.json())
	    .then((data) => {
	      this.setState({ bitcoinReport: data }, () => console.log('bitcoin data fetched' + data))
	    })
	    .catch(console.log)

	    console.log(this.state.bitcoinReport);
	    event.preventDefault();
	  }

    render(){
    	return (
    		
			<div >
				<div>
					<h4> Client Report and History </h4>

					<p> Filter Client Based on : </p>

					<Form onSubmit={this.handleSubmit}>
						<select value={this.state.selectValue} onChange={this.handleSelectChange} >
						  <option value="clientid">Client ID</option>
						  <option value="name">Name</option>
						</select>

						<br/><br/>
						<label>
				          Enter Name/Address: <br/>
				          <input type="text" value={this.state.value} onChange={this.handleChange} />
				        </label><br/>
					  	
					  	 <input type="submit" value="Submit" />
					</Form>

					<h4> Report of Client : </h4>
					
					<h5> Bank Transaction </h5>
					<div>
						<Table border='2'>
							<thead>
								<tr> 
									<td>Client ID </td>
									<td>Client Name </td>
									<td>Date Of transaction</td>
									<td>Transaction Type </td>
									<td>Transaction Amount</td>
									<td>Status </td>
								</tr>
							</thead>
							<tbody>
								{this.state.bankReport.map(({ client_id, client_fname, timestamp, type, amount, status }) => (
							        <tr>
							        	<td> {client_id} </td>
							        	<td> {client_fname} </td>
							        	<td> {timestamp} </td>
							        	<td> {type} </td>
							        	<td> {amount} </td>
							        	<td> {status} </td>
							        </tr>
							      ))}
							</tbody>
						</Table>
					</div>

					<br/><br/>
					<br/><br/>
					<h5> Bitcoin Transaction </h5>
					<div>
						<Table border='2'>
							<thead>
								<tr> 
									<td>Client ID </td>
									<td>Client Name </td>
									<td>Date Of transaction</td>
									<td>Transaction Type </td>
									<td>Bitcoin Quantity</td>
									<td>Bitcoin Rate </td>
									<td>Commission Value</td>
									<td>Commission Type</td>
								</tr>
							</thead>
							<tbody>
								{this.state.bitcoinReport.map(({ client_id, client_fname, timestamp, transaction_type, btc_qty, btc_rate, commission_value, commission_type }) => (
							        <tr>
							        	<td> {client_id} </td>
							        	<td> {client_fname} </td>
							        	<td> {timestamp} </td>
							        	<td> {transaction_type} </td>
							        	<td> {btc_qty} </td>
							        	<td> {btc_rate} </td>
							        	<td> {commission_value} </td>
							        	<td> {commission_type} </td>
							        </tr>
							      ))}
							</tbody>
						</Table>
					</div>

				</div>
			</div>
		    )
    }
}



export default TraderReport
