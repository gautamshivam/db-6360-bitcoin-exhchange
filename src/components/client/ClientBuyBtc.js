import React, {useState, useContext, useEffect, useRef} from 'react'
import Box from "@mui/material/Box";
import { Card, CardContent, CardHeader, TextField } from "@mui/material";
import Button from '@mui/material/Button';
import Axios from 'axios';
import { Typography } from '@mui/material'
import { MenuItem } from '@mui/material';
import { UserContext } from '../../UserProvider';
import Snackbar from '@mui/material/Snackbar';
import MuiAlert from '@mui/material/Alert';

const ClientBuyBtc = (props) => {
    const {user, btcCurrentRate} = useContext(UserContext)
    const [showMsg, setShowMsg] = useState(false);
    const [msg, setMsg] = useState(false);
    
    const [quantity, setQuantity] = useState(0);
    const [commissionRate, setCommissionRate] = useState(0);
    const [commissionType, setCommissionType] = useState("FIAT");
    const [commissionValue, setCommissionValue] = useState(0);
    const [totalTxnValue, setTotalTxnVal] = useState(0);
    
    const quantityRef = useRef(quantity);
    quantityRef.current = quantity;
    const currRateRef = useRef(btcCurrentRate);
    currRateRef.current = btcCurrentRate;
    const commTypeRef = useRef(commissionType);
    commTypeRef.current = commissionType;
    const commRateRef = useRef(commissionRate);
    commRateRef.current = commissionRate;

    useEffect(() => {
        let interval = setInterval(() => {
          calculate(quantityRef.current, currRateRef.current, commTypeRef.current, commRateRef.current);
        }, 500);
        return () => {clearInterval(interval)}
    }, []);

    const calculate = (qty, rate, type, commRate) => {
        if(commRate === 0 || qty === 0) return;
        if(type === "FIAT") {
            let com = (commRate * qty * rate) / 100;
            setCommissionValue(com)
            setTotalTxnVal(com + qty * rate);
        } else if(type === "BTC") {
            setCommissionValue(Math.ceil((commRate * qty) / 100))
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
            setShowMsg(true);
            setMsg("buy successfull");
        }).catch((err) => {
            alert(err);
        })
    }

    const onQtyChange = (e) => {
        let commRate = props.level === "SILVER" ? 10 : 5;
        setCommissionRate(commRate);
        setQuantity(e.target.value)
        if(commissionType === "FIAT") {
            let com = (commRate * e.target.value * btcCurrentRate) / 100;
            setCommissionValue(com)
            setTotalTxnVal(com + e.target.value * btcCurrentRate);
        } else if(commissionType === "BTC") {
            setCommissionValue(Math.ceil((commRate * e.target.value) / 100))
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

    const Alert = React.forwardRef(function Alert(props, ref) {
        return <MuiAlert elevation={6} ref={ref} variant="filled" {...props} />;
    });

    const handleClose = (event, reason) => {
        if (reason === 'clickaway') {
            return;
        }
        setShowMsg(false);
    };

    return (
        <div>
            <Box sx={{ boxShadow: 3, mb: 2 }}>
                    <Snackbar open={showMsg} 
                            autoHideDuration={2000} 
                            onClose={handleClose} 
                            anchorOrigin={{vertical:'bottom',horizontal:'center'}}>
                            <Alert severity="info" sx={{ width: '100%' }}>
                                {msg}
                            </Alert>
                    </Snackbar>
                <Card variant="outlined">
                    <CardHeader title={'('+props.level+') '+props.title} titleTypographyProps={{variant:'h5', fontWeight:'bold' }}></CardHeader>
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

                        <Button variant="contained" onClick={onBuy} disabled={quantity < 5}>Buy</Button>

                        <Typography marginTop="10px"> 
                            <b>BTC Current Rate: </b>${btcCurrentRate}
                        </Typography>
                        <Typography> 
                            <b>Commision Rate: </b>{commissionRate}%
                        </Typography>
                        <Typography> 
                            <b>BTC Value: </b>${btcCurrentRate*quantity}
                        </Typography>
                        <Typography> 
                            <b>Commision Value: </b>{commissionValue}
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
