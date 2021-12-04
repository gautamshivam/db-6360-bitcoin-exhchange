import React, {useState, useContext} from 'react'
import Box from "@mui/material/Box";
import { Card, CardContent, CardHeader, TextField } from "@mui/material";
import Button from '@mui/material/Button';
import Axios from 'axios';
import { Typography } from '@mui/material'
import { MenuItem } from '@mui/material';
import { UserContext } from '../../UserProvider';


const ClientBuyBtc = (props) => {
    const {user} = useContext(UserContext)
    const [quantity, setQuantity] = useState(0);
    const [btcRate, setBtcRate] = useState(20);
    const [commissionRate, setCommissionRate] = useState(5);
    const [commissionType, setCommissionType] = useState("FIAT");
    const [commissionValue, setCommissionValue] = useState(0);
    const [totalTxnValue, setTotalTxnVal] = useState(0);

    const onBuy = () => {
        Axios.post("/btc/trade", {
            client_id:user.user_id,
            trader_id:null,
            btc_qty:quantity,
            btc_rate:btcRate,
            transaction_type:"BUY",
            commission_type:commissionType,
            commission_value:commissionValue
        }).then((res) => {
            console.log("client buy success",res.data);
        }).catch((err) => {
            alert(err);
        })
    }

    const onQtyChange = (e) => {
        setQuantity(e.target.value)
        if(commissionType === "FIAT") {
            let com = (commissionRate * e.target.value * btcRate) / 100;
            setCommissionValue(com)
            setTotalTxnVal(com + e.target.value * btcRate);
        } else if(commissionType === "BTC") {
            setCommissionValue(Math.ceil((commissionRate * e.target.value) / 100))
            setTotalTxnVal(e.target.value * btcRate);
        }
    }
    const onCommissionTypeChange = (e) => {
        setCommissionType(e.target.value);
        if(e.target.value === "FIAT") {
            let com = (commissionRate * quantity * btcRate) / 100;
            setCommissionValue(com)
            setTotalTxnVal(com + quantity * btcRate);
        } else if(e.target.value === "BTC") {
            setCommissionValue(Math.ceil((commissionRate * quantity) / 100))
            setTotalTxnVal(quantity * btcRate);
        }
    }

    return (
        <div>
            <Box sx={{ boxShadow: 3, mb: 2 }}>
                <Card variant="outlined">
                    <CardHeader title={props.title} titleTypographyProps={{variant:'h5', fontWeight:'bold' }}></CardHeader>
                    <CardContent>
                        <TextField fullWidth id="standard-basic" 
                        select
                        label="Commission Type" 
                        style={{marginTop:"5px", marginBottom:"5px"}}
                        value={commissionType}
                        onChange={onCommissionTypeChange} required="true" >
                                <MenuItem key="Fiat" value="FIAT">
                                    FIAT
                                </MenuItem>
                                <MenuItem key="Btc" value="BTC">
                                    BTC
                                </MenuItem>
                        </TextField>
                        <TextField fullWidth id="standard-basic" 
                            label="Quantity" 
                            style={{marginTop:"5px", marginBottom:"5px"}}
                            value={quantity}
                            autoComplete='off'
                            onChange={onQtyChange} required="true" />
                        <Button variant="contained" onClick={onBuy}>Transfer</Button>
                        <Typography marginTop="10px"> 
                            <b>BTC Rate: </b>{btcRate}
                        </Typography>
                        <Typography> 
                            <b>Commision Rate: </b>{commissionRate}
                        </Typography>
                        <Typography> 
                            <b>BTC Value: </b>{btcRate*quantity}
                        </Typography>
                        <Typography> 
                            <b>Commision Value: </b>{commissionValue}
                        </Typography>
                        <Typography> 
                            <b>Total Transaction Value: {totalTxnValue}</b>
                        </Typography>
                    </CardContent>
                </Card>
            </Box>
        </div>
    )
}

export default ClientBuyBtc