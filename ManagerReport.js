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


import React, { Component, createRef } from 'react'
import {Form} from 'react-bootstrap'
import {Table} from 'react-bootstrap'
import './ManagerReport.css';
//start_date => variable in javascript which is entered by user
//const start_date=new Date('2021-11-22')
//const start_date1=new Date('2021-11-19'.concat('T23:59:59'))
//const daily_end_date=new Date(start_date.getFullYear(),start_date.getMonth(),start_date.getDate(),23,59,59,0)
//const week_end_date=new Date(start_date.getFullYear(),start_date.getMonth(),start_date.getDate()+7,23,59,59,0)
//const month_end_date=new Date(start_date.getFullYear(),start_date.getMonth(),start_date.getDate()+30,23,59,59,0)



class ManagerReport extends Component {
  


  constructor(props){
    super(props);
    this.state = {
      customers: [],
      result:[],
      type:'all', //Daily weekly or monthly
      start_date:'',
      end_date:''
    };
    this.handleType=this.handleType.bind(this);
    this.handleStartDate=this.handleStartDate.bind(this);
    this.handleSubmit=this.handleSubmit.bind(this);
  }

  handleType(event){
    console.log('filter type changed '+event.target.value);
    this.setState({type:event.target.value});
  }
  handleStartDate(event){
    console.log('filter value changed '+event.target.value);

    this.setState({start_date:event.target.value});
  }
  handleSubmit(event){
    
    fetch('/btc/trade')
    .then(res => res.json())
    .then(data => this.setState({customers:data}, () => console.log('Transactions fetched...', data)));
      this.setState({result:this.state.customers});
      console.log(this.state.type);
      if(this.state.type==='all'){
         console.log(this.state.result);
      }
     else if(this.state.type==='daily'){
       console.log("d");
       //var end_date=new Date(this.state.start_date.getFullYear(),this.state.start_date.getMonth(),this.state.start_date.getDate(),23,59,59,0);
       //this.setState({end_date:end_date});
        var filtered=this.state.customers.filter((customers) =>new Date(customers.timestamp).getDate()== this.state.start_date);
        this.setState({result:filtered})
        console.log(filtered)
     }

     else if(this.state.type==='weekly'){
       console.log("w")
       var currDAte = new Date();
  
       var weekBeforeDate = new Date(currDAte.getTime() - (3*24*60*60*1000));

       console.log(weekBeforeDate.getDate());
      var filtered=this.state.customers.filter((customers) =>new Date(customers.timestamp).getTime() >=  weekBeforeDate.getTime());
      this.setState({result:filtered})
      console.log('filtered weekly',filtered);
     }

     else if(this.state.type==='monthly'){
       console.log("m")
       var end_date=new Date(this.state.start_date.getFullYear(),this.state.start_date.getMonth()+1,this.state.start_date.getDate(),23,59,59,0);
      this.setState({end_date:end_date});
      var filtered=this.state.customers.filter((customers) =>new Date(customers.timestamp).getTime()>=this.state.start_date.getTime()&&new Date(customers.timestamp).getTime()<=this.state.end_date .getTime());
      this.setState({result:filtered})
      console.log(filtered)
     }

  }
  
  //Main Logic
  //Daily Transactions--start-date= new Date(<START _DATE_VARIABLE_INPUT>.concat('T00:00:00Z'))
  //this.state.customers.filter((customers) => new Date(customers.timestamp).getTime()<=daily_end_date.getTime())
  //this.state.customers.filter((customers) => new Date(customers.timestamp).getTime()>=start_date.getTime() && new Date(customers.timestamp).getTime()<=week_end_date.getTime())

 
  render() {
    return (
      <div>
        
       <Form onSubmit={this.handleSubmit}>
         <select value={this.state.type} onChange={this.handleType}>
           <option value='all'>All</option>
           <option value='daily'>Daily</option>

           <option value='weekly'>Weekly</option>
           <option value='monthly'>Monthly</option>
         </select>
         <label>
				          Enter start date: <br/>
				          <input type="text" value={this.state.start_date} onChange={this.handleStartDate} />
				  </label><br/>
					  	 <input type="button" value="Submit form"  onClick={this.handleSubmit}/>

         </Form>

      <h2>Transactions</h2> 
      
      <table>
        <tbody><tr>
      <th>TID</th>
      <th>client_id</th>
      <th>trader_id</th>
      <th>btc_qty</th>
      <th>btc_rate</th>
      <th>transaction_type</th>
      <th>commission_type</th>
      <th>commission_value</th>
      <th>timestamp</th>
      <th> client_fname</th>
      <th> client_lname</th>
      <th> client_email</th>
      <th> trader_fname</th>
      <th>trader_lname </th>
      <th> trader_email</th>
      </tr>
      { 
        //this.state.customers.filter((customers) => new Date(customers.timestamp).getTime()>=start_date.getTime() && new Date(customers.timestamp).getTime()<=week_end_date.getTime()).
         this.state.result.map(result => 
           /*
  {"tid":6,
  "client_id":10,
  "trader_id":2,
  "btc_qty":2,
  "btc_rate":1000,
  "transaction_type":"BUY",
  "commission_type":"USD",
  "commission_value":5,
  "timestamp":"2021-11-24T06:00:00.000Z",
  "client_fname":"client5"
  ,"client_lname":"c5_lastname",
  "client_email":"c5@gmail.com",
  "trader_fname":"sourabh","
  trader_lname":"tantutway",
  "trader_email":"st@gmail.com"}
  
  */
        <tr>
          <td>{result.tid}</td>
          <td>{result.client_id}</td>
          <td>{result.trader_id}</td>
          <td>{result.btc_qty}</td>
          <td>{result.btc_rate}</td>
          <td>{result.transaction_type}</td>
          <td>{result.commission_type}</td>
          <td>{result.commission_value}</td>
          <td>{result.timestamp}</td>
          <td>{result.client_fname}</td>
          <td>{result.client_lname}</td>
          <td>{result.client_email}</td>
          <td>{result.trader_fname}</td>
          <td>{result.trader_lname}</td>
          <td>{result.trader_email}</td>
        </tr>
        )
     }
     </tbody>
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
