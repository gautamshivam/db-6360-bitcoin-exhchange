import React from 'react'
import './Navbar.css'
import { useHistory } from 'react-router'

const Navbar = () => {
    const history=useHistory();
    const showDashboard=()=>{
        history.push('/dashboard_client')
    }
    const showProfile=()=>{
        history.push('/Client_profile')
    }
    const showDeposit=()=>{
        history.push('/deposit')
    }
    const showTransaction=()=>{
        history.push('/transaction')
    }
    return (
        <div class="topnav">
            <a class="active" href="#dashboard" onClick={showDashboard}>My Dashboard</a>
            <a href="#profile" onClick={showProfile}>My Profile</a>
            <a href="#deposit" onClick={showDeposit}>Deposit</a>
            <a href="#transaction" onClick={showTransaction}>Transaction</a>
            <a>Logout</a>
        </div>
    )
}

export default Navbar
