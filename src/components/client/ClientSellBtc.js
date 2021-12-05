import React, {useState, useContext, useRef, useEffect} from 'react'
import Box from "@mui/material/Box";
import { Card, CardContent, CardHeader,  TextField } from "@mui/material";
import { UserContext } from '../../UserProvider';
import { Typography } from '@mui/material'
import Button from '@mui/material/Button';
import Axios from 'axios';
import { MenuItem } from '@mui/material';
import Snackbar from '@mui/material/Snackbar';
import MuiAlert from '@mui/material/Alert';
const ClientSellBtc = (props) => {
    const {user, btcCurrentRate} = useContext(UserContext)
    const [showMsg, setShowMsg] = useState(false);
    const [msg, setMsg] = useState(false);

    const [quantity, setQuantity] = useState(0);
    const [commissionRate, setCommissionRate] = useState(5);
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
            setTotalTxnVal(qty * rate - com);
        } else if(type === "BTC") {
            let com = Math.ceil((commRate * qty) / 100)
            setCommissionValue(com)
            setTotalTxnVal((qty - com) * rate);
        }
    }

    const onSell = () => {
        Axios.post("/btc/trade", {
            client_id:user.user_id,
            trader_id:null,
            btc_qty:quantity,
            btc_rate:btcCurrentRate,
            transaction_type:"SELL",
            commission_type:commissionType,
            commission_value:commissionValue
        }).then((res) => {
            console.log("client sell success",res.data);
            setMsg("Sold Successfully");
            setShowMsg(true)
        }).catch((err) => {
            alert(err);
        })
    }

    const onQtyChange = (e) => {
        setQuantity(e.target.value)
        if(commissionType === "FIAT") {
            let com = (commissionRate * e.target.value * btcCurrentRate) / 100;
            setCommissionValue(com)
            setTotalTxnVal(e.target.value * btcCurrentRate - com);
        } else if(commissionType === "BTC") {
            let com = Math.ceil((commissionRate * e.target.value) / 100)
            setCommissionValue(com)
            setTotalTxnVal((e.target.value - com) * btcCurrentRate);
        }
    }

    const onCommissionTypeChange = (e) => {
        setCommissionType(e.target.value);
        if(e.target.value === "FIAT") {
            let com = (commissionRate * quantity * btcCurrentRate) / 100;
            setCommissionValue(com)
            setTotalTxnVal(quantity * btcCurrentRate - com);
        } else if(e.target.value === "BTC") {
            let com = Math.ceil((commissionRate * quantity) / 100);
            setCommissionValue(com)
            setTotalTxnVal((quantity - com) * btcCurrentRate);
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
                    <CardHeader title={props.title} titleTypographyProps={{variant:'h5', fontWeight:'bold', color:'red' }}></CardHeader>
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
                        <Button variant="contained" onClick={onSell} disabled={quantity < 5}>SELL</Button>

                        <Typography marginTop="10px"> 
                            <b>BTC Rate: </b>${btcCurrentRate}
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

export default ClientSellBtc
