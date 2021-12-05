import React, {useContext, useEffect, useState} from 'react'
import {UserContext} from '../../UserProvider'
import { Container,Nav, Navbar, NavDropdown, Form, FormControl, Button, Breadcrumb } from 'react-bootstrap'
import { Card, Row, Col, Table, ProgressBar} from 'react-bootstrap'

const AllClients = (props) => {

	const {user} = useContext(UserContext);
	const [allUsers, setAllUsers] = useState([])

	useEffect(() => {
		fetch(`/traders/${user.user_id}/clients`)
	    .then(res => res.json())
	    .then((data) => {
			console.log('data fetched',data);
	      	if(Array.isArray(data))setAllUsers(data);
	    })
	    .catch(console.log)

	}, [])

	return (
		<div >
			<div>
				<h4> With Client Report </h4>
				
				<div>
					<Table border='2'>
						<thead>
							<tr> 
								<td>Client Name </td>
								<td>Email</td>
								<td>Bitcoin Balance</td>
								<td>Fiat Balance </td>
								
							</tr>
						</thead>
						<tbody>
							{allUsers.map(({ client_id, fname, email, phone, bitcoin_balance, fiat_balance, commission_value, commission_type }) => (
								<tr>
									<td> {fname} </td>
									<td> {email} </td>
									<td> {bitcoin_balance} </td>
									<td> {fiat_balance} </td>
									
								</tr>
							  ))}
						</tbody>
					</Table>
				</div>

			</div>
		</div>
	)
}



export default AllClients
