import React from 'react'
import { useState } from 'react'

const Transaction = () => {
    const [btc_quan,setBtcQuan]=useState("")
    const [trans_type,setTransType]=useState("")
    const [comm_type,setCommType]=useState("")
    const proceedToTransaction=()=>{
        alert('Transaction completed!')
    }
    return (
        <div>
            <form>
            <fieldset>
            <legend>Transaction Form</legend>
  <div class="container">
    <h1>Bitcoin Transaction</h1>
    <hr/>
    <label for="fname"><b>Bitcoin Quantity</b></label>
    <input type="text" placeholder="Enter the bitcoin quantity you want to buy/sell" onChange={(e)=>setBtcQuan(e.target.value)} value={btc_quan} id="btc_quan" required/>

    <label for="trans_type"><b>Transaction Type</b></label>
    <input type="text" placeholder="Enter the transaction type buy/sell" onChange={(e)=>setTransType(e.target.value)} value={trans_type} id="trans_type" required/>

    <label for="comm_type"><b>Commission Type</b></label>
    <input type="text" placeholder="Enter the Commission Type FIAT/BTC" onChange={(e)=>setCommType(e.target.value)} value={comm_type} id="comm_type" required/>

    <button type="submit" class="registerbtn" onClick={proceedToTransaction}>Continue</button>

      </div>
  </fieldset>
</form>

        </div>

    )
}

export default Transaction
