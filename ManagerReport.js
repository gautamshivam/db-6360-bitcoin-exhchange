import React, { Component } from 'react';
const start_date=new Date( '2021-11-19T00:00:00.000Z')
const end_date=new Date( '2021-11-22T23:59:59.000Z')
class ManagerReport extends Component {
  
 
  constructor() {
    super();
    this.state = {
      customers: []
    };
  }

  componentDidMount() {
    fetch('/bank')
      .then(res => res.json())
      .then(customers => this.setState({customers}, () => console.log('Transactions fetched...', customers)));
  }
  render() {
    return (
      <div>
      <h2>Transactions</h2>  
      <table id="#table-example-1" style={{"borderWidth":"1px", 'borderColor':"#aaaaaa", 'borderStyle':'solid'}}>
      <th>TID</th>
      <th>client_id</th>
      <th>trader_id</th>
      <th> amount</th>
      <th>type</th>
      <th>timestamp</th>
      <th>status</th>
      <th>Client First Name</th>
      <th>Client Last Name</th>
      <th> Client Email</th>
      <th> Trader First Name</th>
      <th> Trader Last Name</th>
      <th> Trader Email</th>
      { 
         this.state.customers.filter((customers) => new Date(customers.timestamp).getTime()>=start_date.getTime() && new Date(customers.timestamp).getTime()<=end_date.getTime()).map(customers => 
        <tr>
          <td>{customers.tid}</td>
          <td>{customers.client_id}</td>
          <td>{customers.trader_id}</td>
          <td>{customers.amount}</td>
          <td>{customers.type}</td>
          <td>{customers.timestamp}</td>
          <td>{customers.status}</td>
          <td>{customers.client_fname}</td>
          <td>{customers.client_lname}</td>
          <td>{customers.client_email}</td>
          <td>{customers.trader_fname}</td>
          <td>{customers.trader_lname}</td>
          <td>{customers.trader_email}</td>
        </tr>
        )
     }
      </table>
    </div>
    );
  
} 
}

export default ManagerReport;
