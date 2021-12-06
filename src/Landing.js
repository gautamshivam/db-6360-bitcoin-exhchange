import React from 'react'
import logo from './bitcoin-btc-logo.svg';
import './App.css'
import { Typography } from '@mui/material';

const Landing = () => {
    return (
        <div className="App m-0">
            <header className="App-header">
            <img src={logo} className="App-logo" alt="logo" />
            <Typography color="black" variant="h3" marginTop="50px">
               Welcome to Bitcoin Exchange App
            </Typography>
            <Typography color="black" variant="h6" marginTop="50px">
               For the fun experience of Bitcoin trading register now and enjoy.
            </Typography>
            </header>
        </div>
    )
}

export default Landing
