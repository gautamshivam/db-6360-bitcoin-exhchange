import React, {useContext, useState, useEffect} from 'react'
import {UserContext} from '../../UserProvider'
import { Container,Nav, Navbar, NavDropdown, Form, FormControl, Button, Breadcrumb } from 'react-bootstrap'
import { Card, Row, Col, Table, ProgressBar} from 'react-bootstrap'

const TraderReport = (props) => {

	const {user} = useContext(UserContext);
	const [filterText, setFilterText] = useState('');
	const [selectValue, setSelectValue] = useState('');
	const [bankReport, setBankReport] = useState([]);
	const [bitcoinReport, setBitCoinReport] = useState([]);
	const [allUsers, setAllUsers] = useState([]);



	
	useEffect(() => {
		fetch(`/traders/${user.user_id}/clients`)
	    .then(res => res.json())
	    .then((data) => {
			console.log('all clients data fetched for trader:'+user.user_id, data)
			if(Array.isArray(data))setAllUsers(data);
	    })
	}, [])

	const handleSelectChange = (event)  => {
		setSelectValue(event.target.value);
		fetch(`/bank?client_id='+ ${event.target.value} + '&trader_id=${user.user_id}`)
	    .then(res => res.json())
	    .then((data) => {
			console.log('bank report fetched', data);
			if(Array.isArray(data))setBankReport(data);
	    })

	   	fetch(`/btc/trade?client_id='+ ${event.target.value} + '&trader_id=${user.user_id}`)
	    .then(res => res.json())
	    .then((data) => {
			console.log('btc report fetched', data);
			if(Array.isArray(data))setBitCoinReport(data);
	    })
	}


	const handleChange = (event) => {
		setFilterText(event.target.value);
	}
	const handleSubmit = () => {
	    fetch(`/bank?trader_id=${user.user_id}`)
	    .then(res => res.json())
	    .then((data) => {
			console.log('bank report fetched', data);
			if(Array.isArray(data)){
				data = data.filter((item) => item.client_fname.toLowerCase().includes(filterText.toLowerCase()));
				setBankReport(data);
			}
	    })

	   	fetch(`/btc/trade?trader_id=${user.user_id}`)
	    .then(res => res.json())
	    .then((data) => {
			console.log('btc report fetched', data);
			data = data.filter((item) => item.client_fname.toLowerCase().includes(filterText.toLowerCase()));
			if(Array.isArray(data))setBitCoinReport(data);
	    })
	}

	return (
		<div >
			<div>
				<h4> Client Report and History </h4>

				<p> Filter Client Based on : </p>

				<Form>
					<select value={selectValue} onChange={handleSelectChange} >
						{
							allUsers.map((item) => (
								<option value={item.client_id}>{item.fname} {item.lname}</option>
	  						))
						}
					</select>

					<br/><br/>
					<label>
					  Enter Name/Address: <br/>
					  <input type="text" value={filterText} onChange={handleChange} />
					</label><br/>
					<input type="button" value="Submit" onClick={handleSubmit} />
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
							{bankReport.map(({ tid, client_id, client_fname, timestamp, type, amount, status }) => (
								<tr key={tid}>
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
							{bitcoinReport.map(({ tid, client_id, client_fname, timestamp, transaction_type, btc_qty, btc_rate, commission_value, commission_type }) => (
								<tr key={tid}>
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



export default TraderReport
