import React, {useContext} from 'react'
import {UserContext} from '../../UserProvider'
import { Container,Nav, Navbar, NavDropdown, Form, FormControl, Button, Breadcrumb } from 'react-bootstrap'
import { Card, Row, Col, Table, ProgressBar} from 'react-bootstrap'

class AllClients extends React.Component{

	 
	 constructor(props) {
	    super(props);
	    this.state = {
	    	allUsers : []
	    };

	  }

	  componentDidMount(){
	  	fetch('http://localhost:5000/traders/2/clients')
	    .then(res => res.json())
	    .then((data) => {
	      this.setState({ allUsers: data }, () => console.log('data fetched' + data))
	    })
	    .catch(console.log)

	  }


    render(){
    	return (
    		
			<div >
				<div>
					<h4> All Clients </h4>
					
					<div>
						<Table border='2'>
							<thead>
								<tr> 
									<td>Client ID </td>
									<td>Client Name </td>
									<td>Email</td>
									<td>Bitcoin Balance</td>
									<td>Fiat Balance </td>
									
								</tr>
							</thead>
							<tbody>
								{this.state.allUsers.map(({ client_id, fname, email, phone, bitcoin_balance, fiat_balance, commission_value, commission_type }) => (
							        <tr>
							        	<td> {client_id} </td>
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
}



export default AllClients
