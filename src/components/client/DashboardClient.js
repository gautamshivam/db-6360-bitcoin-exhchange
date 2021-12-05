import React, { useState, useContext, useEffect} from 'react'
import Button from '@mui/material/Button';
import ClientDeposit from './ClientDeposit';
import ClientBuyBtc from './ClientBuyBtc';
import ClientSellBtc from './ClientSellBtc';
import { Divider, Typography } from '@mui/material'
import { useNavigate } from 'react-router';
import { UserContext } from '../../UserProvider';
import Axios from 'axios';

const DashboardClient = () => {
    const {user} = useContext(UserContext);
    const [showBuy, setShowBuy] = useState(true);
    const [level, setLevel] = useState("");

    let navigate = useNavigate();

    useEffect(() => {
        console.log("client fetching..",user.user_id);
        Axios.get(`/clients/${user.user_id}`).then((res) => {
            if(Array.isArray(res.data))setLevel(res.data[0].membership_level)
        })
    }, [user])

    return (
        <div>
            <div class="col-12">
                <Typography>

                    {
                        showBuy ?  <Button  variant='contained' color="warning" 
                        style={{marginRight:"10px"}}
                        onClick={() => setShowBuy(false)}>Sell BTC</Button> : 
                        <Button  variant='contained' 
                            style={{marginRight:"10px"}}
                            onClick={() => setShowBuy(true)}>Buy BTC</Button>
                    }
                    <Button  variant='contained'
                    style={{marginRight:"10px"}}
                    onClick={() => navigate('/client-report')}>Show Report</Button>
                </Typography> 
            </div>
            <Divider style={{marginTop:"10px"}}/>
            <div class="row mt-5">
                <div class="col-md-2">
                </div>
                <div class="col-md-4">
                    <ClientDeposit/>
                </div>
                <div class="col-md-4">
                    {showBuy ? <ClientBuyBtc title="Buy BTC" level={level}/> 
                    : <ClientSellBtc title="Sell BTC" level={level}/>}
                </div>
                <div class="col-md-2">
                </div>
            </div>
        </div>
    )
}

export default DashboardClient
