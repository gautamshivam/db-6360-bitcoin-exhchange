import React, { useState} from 'react'
import Button from '@mui/material/Button';
import TraderBuyBtc from './TraderBuyBtc';
import TraderSellBtc from './TraderSellBtc';
import { Divider, Typography } from '@mui/material'
import { useNavigate } from 'react-router';

const DashboardTrader = () => {
    const [showBuy, setShowBuy] = useState(true)
    let navigate = useNavigate();

    const showReport = () => {
        navigate('/trader-report');
    }

    const showAllClients = () => {
        navigate('/all-clients');
    }

    return (
        <div>
            <div class="col-12">
                <Typography>
                    
                    <Button  variant='contained' 
                    style={{marginRight:"10px"}}
                    onClick={() => setShowBuy(true)}>Buy BTC</Button>
                    <Button  variant='contained' color="warning" 
                    style={{marginRight:"10px"}}
                    onClick={() => setShowBuy(false)}>Sell BTC</Button>
                    <Button  variant='contained'
                    style={{marginRight:"10px"}}
                    onClick={showReport}>Show Report</Button>
                </Typography> 
            </div>
            <Divider style={{marginTop:"10px"}}/>
            <div class="row mt-5">
                <div class="col-md-3">
                </div>
                <div class="col-md-6">
                    {showBuy ? <TraderBuyBtc title="Buy BTC"/> : <TraderSellBtc title="Sell BTC"/>}
                </div>
                <div class="col-md-3">
                </div>
            </div>
        </div>
    )
}

export default DashboardTrader
