import React from 'react'
import { useState } from 'react'
import Navbar from './Navbar'

const Deposit = () => {
    const [deposit,setDeposit]=useState("")
    return (
        <div>
            <Navbar/>
             <form>
            <fieldset>
            <legend>Deposit Form</legend>
  <div class="container">
    <h1>Deposit</h1>
    <hr/>
    <label for="fname"><b>Deposit Money</b></label>
    <input type="text" placeholder="Enter the bitcoin quantity you want to buy/sell" onChange={(e)=>setDeposit(e.target.value)} value={deposit} id="btc_deposit" required/>
      </div>
  </fieldset>
</form>
        </div>
    )
}

export default Deposit
