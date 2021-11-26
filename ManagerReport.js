//Goals to implement still.........
// 1. Input start date from the user and use it as the start date for javascript 
// 2. Dropdown Menu for monthly, weekly and monthly transaction
// 3. Applying above filters for daily, weekly and monthly transactions
// 4. Displaying the table using map.filter()
// 5. filling the null values of the trader id with 'NULL' character in the table

//Daily Transactions
//const start_date=new Date('2021-11-20')
//const daily_end_date=new Date(start_date.getFullYear(),start_date.getMonth(),start_date.getDate(),23,59,59,0)
//const daily_end_date=new Date(start_date.getFullYear(),start_date.getMonth(),start_date.getDate(),23,59,59,0)



//weekly Transactions
//const start_date=new Date('2021-11-20')
//const week_end_date=new Date(start_date.getFullYear(),start_date.getMonth(),start_date.getDate()+7,23,59,59,0)
//this.state.customers.filter((customers) => new Date(customers.timestamp).getTime()>=start_date.getTime() &&
//new Date(customers.timestamp).getTime()<=week_end_date.getTime()


//Monthly Transactions
//const start_date=new Date('2021-11-19')
//const month_end_date=new Date(start_date.getFullYear(),start_date.getMonth()+1,start_date.getDate(),23,59,59,0)
//this.state.customers.filter((customers) => 
//new Date(customers.timestamp).getTime()>=start_date.getTime() &&
//new Date(customers.timestamp).getTime()<=month_end_date.getTime())




import React, { Component } from 'react';
//start_date => variable in javascript which is entered by user
const start_date=new Date('2021-11-19')
const start_date1=new Date('2021-11-19'.concat('T23:59:59'))
const daily_end_date=new Date(start_date.getFullYear(),start_date.getMonth(),start_date.getDate(),23,59,59,0)
const week_end_date=new Date(start_date.getFullYear(),start_date.getMonth(),start_date.getDate()+7,23,59,59,0)
const month_end_date=new Date(start_date.getFullYear(),start_date.getMonth()+1,start_date.getDate(),23,59,59,0)
class ManagerReport extends Component {
  constructor(){
    super();
    this.state = {
      customers: []
    };
  }
  //Main Logic
  //Daily Transactions--start-date= new Date(<START _DATE_VARIABLE_INPUT>.concat('T00:00:00Z'))
  //this.state.customers.filter((customers) => new Date(customers.timestamp).getTime()<=daily_end_date.getTime())
  //this.state.customers.filter((customers) => new Date(customers.timestamp).getTime()>=start_date.getTime() && new Date(customers.timestamp).getTime()<=week_end_date.getTime())
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
        //this.state.customers.filter((customers) => new Date(customers.timestamp).getTime()>=start_date.getTime() && new Date(customers.timestamp).getTime()<=week_end_date.getTime()).
         this.state.customers.filter((customers) => 
         new Date(customers.timestamp).getTime()>=start_date.getTime() &&
         new Date(customers.timestamp).getTime()<=month_end_date.getTime()
         ).map(customers => 
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


//1. Getting start date from the user and using it in javascript
//2. Getting 


/*
{"tid":5,
"client_id":9,
"trader_id":3,                    
"amount":3000,
"type":"DEPOSIT",
"timestamp":"2021-11-22T06:00:00.000Z",
"status":"APPROVED",
"client_fname":"client4",
"client_lname":"c4_lastname",
"client_email":"c4@gmail.com",
"trader_fname":"srushti",
"trader_lname":"sachdev",
"trader_email":"ss@gmail.com"}
*/

/*
var t = "2010-06-09 13:12:01".split(/[- :]/);

// Apply each element to the Date function
var d = new Date(Date.UTC(t[0], t[1]-1, t[2], t[3], t[4], t[5]));

console.log(d);
// -> Wed Jun 09 2010 14:12:01 GMT+0100 (BST)
console.log(d.toDateString())
var t1 = "2010-06-09 00:00:00".split(/[- :]/);

// Apply each element to the Date function
var d1= new Date(Date.UTC(t1[0], t1[1]-1, t1[2], t1[3], t1[4], t1[5]));
console.log(d.toDateString()===d.toDateString())
*/
