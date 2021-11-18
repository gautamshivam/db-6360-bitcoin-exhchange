import React from 'react'
import { Container,Nav, Navbar, NavDropdown, Form, FormControl, Button, Breadcrumb } from 'react-bootstrap'
import { Card, Row, Col, Table, ProgressBar} from 'react-bootstrap'


function Trader_Profile(){
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
			  <Breadcrumb.Item active>Trader Profile</Breadcrumb.Item>
			</Breadcrumb>
			<h4> Bio Graph </h4>

			  <Row>

			    <Col xs={6} md={4}>
			      	<Card style={{ width: '18rem' }}>
					  <Card.Img variant="top" src="https://library.kissclipart.com/20180905/arq/kissclipart-businessman-icon-png-clipart-computer-icons-user-p-f040ea1493575c42.jpg" />
					  <Card.Body>
					    <Card.Title>James Porter</Card.Title>
					    <Card.Text>
					      I like Trading Bitcoins
					    </Card.Text>
					  </Card.Body>
					</Card>
			    </Col>

			   	<Col xs={12} md={8}>
			      	<Table striped bordered hover size="sm">
					  <tbody>
					    <tr>
					      <td>Name</td>
					      <td> James Porter</td>
					    </tr>
					    <tr>
					      <td>Email</td>
					      <td>john.doe@gmail.com</td>
					    </tr>
					    <tr>
					      <td>Phone</td>
					      <td colSpan="2">4699271111</td>
					    </tr>
					    <tr>
					      <td>Address</td>
					      <td colSpan="2">1001 Bay area San Franscisco, CA</td>
					    </tr>
					  </tbody>
					</Table>
					<h3> Balances </h3>
					  <Row>
					    <Col>
					    	<h5> Fiat Currency </h5>
					    	<ProgressBar now={55} />
					    </Col>
					    <Col>
					    	<h5> Fiat Currency </h5>
							<ProgressBar now={80} />
					    </Col>
					  </Row>
					
			    </Col>
			  </Row>
		</div>
	</div>
    )
}

export default Trader_Profile
