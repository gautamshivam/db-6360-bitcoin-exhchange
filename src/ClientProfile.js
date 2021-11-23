import React from 'react'
import { Container,Nav, Navbar, NavDropdown, Form, FormControl, Button, Breadcrumb } from 'react-bootstrap'
import { Card, Row, Col, Table, ProgressBar} from 'react-bootstrap'


class Client_Profile extends React.Component{
	constructor(props) {
	    super(props);


	    this.state = {
	      fname: '',
	      lname : '',
	      phone : '',
	      email : ''
	    };

	}

	componentDidMount() {
	    fetch('http://localhost:5000/clients/7')
	    .then(res => res.json())
	    .then((data) => {
	      this.setState({ 
	      	fname: data[0].fname,
	      	lname: data[0].lname,
	      	phone : data[0].phone,
	      	email : data[0].email,
	      }, () => console.log('data fetched' + data[0].user_type))
	    })
	    .catch(console.log)
	  }

    render(){
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
					  <Breadcrumb.Item active>Client Profile</Breadcrumb.Item>
					</Breadcrumb>
					<h4> Bio Graph </h4>

					  <Row>

					    <Col xs={6} md={4}>
					      	<Card style={{ width: '18rem' }}>
							  <Card.Img variant="top" src="https://www.pngall.com/wp-content/uploads/5/Profile-Male-PNG.png" />
							  <Card.Body>
							    <Card.Title>{this.state.fname} {this.state.lname}</Card.Title>
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
							      <td> {this.state.fname} {this.state.lname}</td>
							    </tr>
							    <tr>
							      <td>Email</td>
							      <td>{this.state.email}</td>
							    </tr>
							    <tr>
							      <td>Phone</td>
							      <td colSpan="2">{this.state.phone}</td>
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
}

export default Client_Profile
