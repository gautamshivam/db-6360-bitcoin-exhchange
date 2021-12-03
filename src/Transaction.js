import React from 'react'
import { useState } from 'react'
import Navbar from './Navbar'
import { useContext } from 'react'
import { UserContext } from './UserContext'
import Axios from 'axios'

const Transaction = () => {
    const {value,setValue}=useContext(UserContext)
    const [btc_qty,setBtcQuan]=useState("")
    const [transaction_type,setTransType]=useState("")
    const [commission_type,setCommType]=useState("")
    const client_id=6;
    const proceedToTransaction=()=>{
      Axios.post(`http://localhost:5000/btc/trade`, {

        client_id: 6,
        trader_id: null,
        btc_qty: 10,
        btc_rate: 16,
        transaction_type: "BUY",
        commission_type: "FIAT",
        commission_value: 5
        
        }).then((res) => {

        }).catch((error)=>{

        })

      
    }

    return (
        <div>
            <Navbar/>
            <div>{value}</div>
            <form>
            <fieldset>
            <legend>Transaction Form</legend>
  <div class="container">
    <h1>Bitcoin Transaction</h1>
    <hr/>
    <label for="fname"><b>Bitcoin Quantity</b></label>
    <input type="text" placeholder="Enter the bitcoin quantity you want to buy/sell" onChange={(e)=>setBtcQuan(e.target.value)} value={btc_qty} id="btc_qty" required/>

    <label for="trans_type"><b>Transaction Type</b></label>
    <input type="text" placeholder="Enter the transaction type buy/sell" onChange={(e)=>setTransType(e.target.value)} value={transaction_type} id="transaction_type" required/>

    <label for="comm_type"><b>Commission Type</b></label>
    <input type="text" placeholder="Enter the Commission Type FIAT/BTC" onChange={(e)=>setCommType(e.target.value)} value={commission_type} id="commission_type" required/>

    <button type="button" class="registerbtn" onClick={proceedToTransaction}>Continue</button>

      </div>
  </fieldset>
</form>

        </div>

    )
}

export default Transaction
