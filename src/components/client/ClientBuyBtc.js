import React, {useState, useContext, useEffect, useRef} from 'react'
import Box from "@mui/material/Box";
import { Card, CardContent, CardHeader, TextField } from "@mui/material";
import Button from '@mui/material/Button';
import Axios from 'axios';
import { Typography } from '@mui/material'
import { MenuItem } from '@mui/material';
import { UserContext } from '../../UserProvider';


const ClientBuyBtc = (props) => {
    const {user, btcCurrentRate} = useContext(UserContext)
    const [quantity, setQuantity] = useState(0);
    const [commissionRate, setCommissionRate] = useState(5);
    const [commissionType, setCommissionType] = useState("FIAT");
    const [commissionValue, setCommissionValue] = useState(0);
    const [totalTxnValue, setTotalTxnVal] = useState(0);
    
    const quantityRef = useRef(quantity);
    quantityRef.current = quantity;
    const currRateRef = useRef(btcCurrentRate);
    currRateRef.current = btcCurrentRate;

    useEffect(() => {
        let interval = setInterval(() => {
          calculate(quantityRef.current, currRateRef.current);
        }, 500);
        return () => {clearInterval(interval)}
    }, []);

    const calculate = (qty, rate) => {
        if(commissionRate === 0 || qty === 0) return;
        if(commissionType === "FIAT") {
            let com = (commissionRate * qty * rate) / 100;
            setCommissionValue(com)
            setTotalTxnVal(com + qty * rate);
        } else if(commissionType === "BTC") {
            setCommissionValue(Math.ceil((commissionRate * qty) / 100))
            setTotalTxnVal(qty * rate);
        }
    }

    const onBuy = () => {
        Axios.post("/btc/trade", {
            client_id:user.user_id,
            trader_id:null,
            btc_qty:quantity,
            btc_rate:btcCurrentRate,
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
            let com = (commissionRate * e.target.value * btcCurrentRate) / 100;
            setCommissionValue(com)
            setTotalTxnVal(com + e.target.value * btcCurrentRate);
        } else if(commissionType === "BTC") {
            setCommissionValue(Math.ceil((commissionRate * e.target.value) / 100))
            setTotalTxnVal(e.target.value * btcCurrentRate);
        }
    }
    const onCommissionTypeChange = (e) => {
        setCommissionType(e.target.value);
        if(e.target.value === "FIAT") {
            let com = (commissionRate * quantity * btcCurrentRate) / 100;
            setCommissionValue(com)
            setTotalTxnVal(com + quantity * btcCurrentRate);
        } else if(e.target.value === "BTC") {
            setCommissionValue(Math.ceil((commissionRate * quantity) / 100))
            setTotalTxnVal(quantity * btcCurrentRate);
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
                        <Button variant="contained" onClick={onBuy}>Buy</Button>
                        <Typography marginTop="10px"> 
                            <b>BTC Current Rate: </b>${btcCurrentRate}
                        </Typography>
                        <Typography> 
                            <b>Commision Rate: </b>{commissionRate}%
                        </Typography>
                        <Typography> 
                            <b>BTC Value: </b>{btcCurrentRate*quantity}
                        </Typography>
                        <Typography> 
                            <b>Commision Value: </b>${commissionValue}
                        </Typography>
                        <Typography> 
                            <b>Total Transaction Value: ${totalTxnValue}</b>
                        </Typography>
                    </CardContent>
                </Card>
            </Box>
        </div>
    )
}

export default ClientBuyBtc
