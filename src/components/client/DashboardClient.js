import React, { useState} from 'react'
import Button from '@mui/material/Button';
import ClientDeposit from './ClientDeposit';
import ClientBuyBtc from './ClientBuyBtc';
import ClientSellBtc from './ClientSellBtc';
import { Typography } from '@mui/material'

const DashboardClient = () => {
    const [showBuy, setShowBuy] = useState(true)

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
                </Typography> 
            </div>
            <div class="row mt-5">
                <div class="col-md-2">
                </div>
                <div class="col-md-4">
                    <ClientDeposit/>
                </div>
                <div class="col-md-4">
                    {showBuy ? <ClientBuyBtc title="Buy BTC"/> : <ClientSellBtc title="Sell BTC"/>}
                </div>
                <div class="col-md-2">
                </div>
            </div>
        </div>
    )
}

export default DashboardClient
