import { Hidden } from '@mui/material';
import React, { Component} from 'react'
import {Form, Table} from 'react-bootstrap'
import './DashboardManager.css'

    class ManagerReport extends Component {
    constructor(props){
        super(props);
        this.state = {
        customers: [],
        result:[],
        type:'all', //Daily, weekly or monthly
        start_date:'',
        end_date:'',
        month:'all',
        count:0
        };
        this.handleType=this.handleType.bind(this);
        this.handleStartDate=this.handleStartDate.bind(this);
        this.handleEndDate=this.handleEndDate.bind(this);
        this.handleMonth=this.handleMonth.bind(this);
        this.handleSubmit=this.handleSubmit.bind(this);
    }

    handleType(event){
        console.log('filter type changed '+event.target.value);
        this.setState({type:event.target.value});
    }
    handleStartDate(event){
        console.log('filter start date changed '+event.target.value);
        this.setState({start_date:event.target.value});
    }
    handleEndDate(event){
        console.log('filter end date changed '+event.target.value);
        this.setState({end_date:event.target.value});
    }
    handleMonth(event){
        console.log('filter month changed '+event.target.value);
        this.setState({month:event.target.value});
    }
    handleSubmit(event){ 
        if(this.state.type=='daily' || this.state.type=='monthly'){
        if(!Date.parse(this.state.start_date) && !Date.parse(this.state.end_date) && this.state.type!='all' && this.state.month!='all'){
            alert('Enter the date format correctly')
        }
        }
        fetch('http://localhost:5000/btc/trade')
        .then(res => res.json())
        .then(data => this.setState({customers:data}, () => console.log('Transactions fetched...', data)));
        var date=new Date(this.state.start_date)
        this.setState({result:this.state.customers});
        console.log(this.state.type);
        if(this.state.type==='all'){
            var all_contents=this.state.customers;
            console.log(this.state.result);
            this.setState({result:all_contents})
            let c=all_contents.length;
            this.setState({count:c})
        }
        else if(this.state.type==='daily'){
        console.log("d");
        //var end_date=new Date(this.state.start_date.getFullYear(),this.state.start_date.getMonth(),this.state.start_date.getDate(),23,59,59,0);
        //this.setState({end_date:end_date});

            var filtered=this.state.customers.filter((customers) =>new Date(customers.timestamp).getDate()  === date.getDate()+1
            && new Date(customers.timestamp).getMonth()  === date.getMonth()
            && new Date(customers.timestamp).getFullYear()=== date.getFullYear());
            this.setState({result:filtered})
            console.log(filtered)
            let c=filtered.length;
            this.setState({count:c})
            var buy_fil=this.state.result.filter((result)=> result.transaction_type==='BUY')
            var c_fil=buy_fil.length
            this.setState({buy_count:c_fil})
        }

        else if(this.state.type==='weekly'){
            var end_date=new Date(this.state.end_date)
        console.log("w");
        var filtered=this.state.customers;
        //var currDAte = new Date();
    
        // var weekBeforeDate = new Date(currDAte.getTime() - (3*24*60*60*1000));
        //var req_date=new Date(date.getFullYear(),date.getMonth(),(date.getDate()+1))
        var s_date=new Date(date.getFullYear(),date.getMonth(),(date.getDate()+1))
        //6 days + 24Hrs + 60Mins + 60 Secs=7 days
        //var weekBeforeDate=new Date((req_date).getTime()- (6*24*60*60*1000))
        var e_date=new Date(date.getFullYear(),date.getMonth(),(end_date.getDate())+1)
        console.log(s_date.getDate());
        console.log(e_date.getDate())
        var filtered=this.state.customers.filter((customers) =>new Date(customers.timestamp).getMonth()===s_date.getMonth() &&
        new Date(customers.timestamp).getMonth()===e_date.getMonth() &&
        new Date(customers.timestamp).getFullYear()===e_date.getFullYear()&&
        new Date(customers.timestamp).getFullYear()===s_date.getFullYear() &&
        new Date(customers.timestamp).getDate()>=s_date.getDate() && new Date(customers.timestamp).getDate()<=e_date.getDate()
        );
        this.setState({result:filtered})
        console.log('filtered weekly',filtered);
        let c=filtered.length;
        this.setState({count:c})
        var buy_fil=this.state.result.filter((result)=> result.transaction_type==='BUY')
        var c_fil=buy_fil.length
        this.setState({buy_count:c_fil})
        
        }

        else if(this.state.type==='monthly'){
            //var req_date=new Date(date.getFullYear(),date.getMonth(),(date.getDate()+1))
            var cur_month=new Date(this.state.month);
            var msg="Month="
            console.log(msg+cur_month);
            var c_month=new Date(cur_month.getMonth());
            console.log(c_month);
            // console.log(MonthBeforeDate.toDateString());
            // console.log(req_date.toDateString());   
            // console.log(req_date.getDate())
            var filtered=this.state.customers.filter((customers) => new Date(customers.timestamp).getMonth()>=c_month && new Date(customers.timestamp).getMonth()<=c_month+1
            );
            this.setState({result:filtered})
            console.log('filtered monthly',filtered);
            let c=filtered.length;
            this.setState({count:c})
            var buy_fil=this.state.result.filter((result)=> result.transaction_type==='BUY')
            var c_fil=buy_fil.length
            this.setState({buy_count:c_fil})
        }
        
        
    }
    
    
    render() {
        return (
        <div>
        <Form onSubmit={this.handleSubmit}>
            <br/>
            <h3>Enter duration length of the transaction(Monthly, Weekly, Daily)</h3>
            <select value={this.state.type} onChange={this.handleType}>
            <option value='all'>All</option>
            <option value='daily'>Daily</option>
            <option value='weekly'>Weekly</option>
            <option value='monthly'>Monthly</option>
            </select>
            <br/>
            {this.state.type==='daily'?
            <div>
            <label>Enter a date:(in YYYY-MM-DD format) <br/>
                    <input type="text" value={this.state.start_date} onChange={this.handleStartDate} />
            </label><br/>
            </div>
            :null
        }
            {this.state.type==='weekly'?
            <div>
            <label>Enter a start date:(in YYYY-MM-DD format) <br/>
                    <input type="text" value={this.state.start_date} onChange={this.handleStartDate} />
            </label><br/>
            <label>Enter a end date:(in YYYY-MM-DD format) <br/>
                    <input type="text" value={this.state.end_date} onChange={this.handleEndDate}/>
            </label>
            </div>
            :null
        }
            <br/>
                        <br/>   
                        {
                        this.state.type==='monthly'?
                        <div>
                        <label>
                            
                            <br/>
                            Choose Month<br/>

                                <select value={this.state.month} onChange={this.handleMonth}>
                                <option value='January'>January</option>
                                <option value='February'>February</option>
                                <option value='March'>March</option>
                                <option value='April'>April</option>
                                <option value='May'>May</option>
                                <option value='June'>June</option>
                                <option value='July'>July</option>
                                <option value='August'>August</option>
                                <option value='September'>September</option>
                                <option value='October'>October</option>
                                <option value='November'>November</option>
                                <option value='December'>December</option>
                                
                                
                                
            </select>
            </label>
            </div>
            :null
    }
            <br/>
            <input type="button" value="Submit form"  onClick={this.handleSubmit}/>
                        

            </Form>    
        <div className="table">
        <h2>Transactions</h2> 
        
        <table id="ManagerReport">
        <thead>
        <tr>
        <th>TID</th>
        <th>Client Id</th>
        <th>Trader Id</th>
        <th>BTC Quantity</th>
        <th>BTC Rate</th>
        <th>Transaction Type</th>
        <th>Commission Type</th>
        <th>Commission Value</th>
        <th>Timestamp</th>
        <th> Client First Name</th>
        <th> Client Last Name</th>
        <th> Client email</th>
        <th> Trader First Name</th>
        <th>Trader Last Name </th>
        <th> Trader Email</th>
        </tr>
        </thead>
        <tbody>
        { 
            //this.state.customers.filter((customers) => new Date(customers.timestamp).getTime()>=start_date.getTime() && new Date(customers.timestamp).getTime()<=week_end_date.getTime()).
            this.state.result.map(result => 
            <tr key={result.tid}>
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
        <h5>Total Number of Transactions: {this.state.count}</h5>
        </div>
        );
    } 
    }

    export default ManagerReport;
