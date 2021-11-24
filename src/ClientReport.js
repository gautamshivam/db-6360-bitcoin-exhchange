import React from 'react'
import { Container,Nav, Navbar, NavDropdown, Form, FormControl, Button, Breadcrumb } from 'react-bootstrap'
import { Card, Row, Col, Table, ProgressBar} from 'react-bootstrap'


function Client_Report(){
    return (
	<div >
		<Navbar bg="light" bg="dark" variant="dark" expand="lg">
		  <Container fluid>
		    <Navbar.Brand href="#"> Wall Street Trader</Navbar.Brand>
		    <Navbar.Toggle aria-controls="navbarScroll" />
		    <Navbar.Collapse id=" WallStreetTrader">
		      <Nav
		        className="me-auto my-2 my-lg-0"
		        style={{ maxHeight: '100px' }}
		        Wall Street Trader
		      >
		        <Nav.Link href="#action1">Buy</Nav.Link>
		        <Nav.Link href="#action2">Sell</Nav.Link>
		        <Nav.Link href="#action2">Trade</Nav.Link>
		        <NavDropdown title="Options" id="navbarScrollingDropdown">
		          <NavDropdown.Item href="#clientProfile">Profile</NavDropdown.Item>
		          <NavDropdown.Item href="#clientReports">Reports & History</NavDropdown.Item>
		          <NavDropdown.Divider />
		          <NavDropdown.Item href="#logout">
		            Logout
		          </NavDropdown.Item>
		        </NavDropdown>
		      </Nav>
		      
		    </Navbar.Collapse>
		  </Container>
		</Navbar>


		<div>
			<Breadcrumb>
			  <Breadcrumb.Item href="#">Home</Breadcrumb.Item>
			  <Breadcrumb.Item active>Client Report & History</Breadcrumb.Item>
			</Breadcrumb>
			<h4> Client Report and History </h4>

			<p> Filter Client Based on : </p>

			<Form>
				<Form.Select>
			    	<option>--Choose--</option>
			    	<option>Name</option>
			    	<option>Address</option>
			  	</Form.Select>

			  <Form.Group className="mb-3" controlId="formBasicEmail">
			    <Form.Label>Enter Name/ Address appropriately</Form.Label>
			    <Form.Control type="email" placeholder="Enter email" />
			  </Form.Group>

			  	<Button variant="primary" type="submit">
			    	Submit
			  	</Button>
			</Form>

			<h4> Report of Client : </h4>
			
			<div>
			</div>

		</div>
	</div>
    )
}

export default Client_Report
