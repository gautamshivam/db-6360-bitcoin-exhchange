import React, {useContext, useState} from 'react'
import Box from "@mui/material/Box";
import { Card, CardContent, CardHeader, TextField } from "@mui/material";
import { UserContext } from '../../UserProvider';
import Button from '@mui/material/Button';
import Axios from 'axios';
import { MenuItem } from '@mui/material';

const ClientDeposit = () => {
    const {user, traders} = useContext(UserContext);
    const [amount, setamount] = useState(0);
    const [selectedTrader, setSelectedTrader] = useState("SELF");

    const onTransfer = () => {
        if(isNaN(amount) || parseInt(amount) === 0) {
            alert("Invalid amount");
            return;
        }
        Axios.post("/bank/deposit", {
            client_id:user.user_id,
            trader_id: selectedTrader === "SELF" ? null : selectedTrader,
            amount:amount
        }).then((res) => {
            console.log(res);
            alert(JSON.stringify(res.data));
        }).catch((err) => {
            console.log(err);
            alert(err);
        })
    }
    return (
        <div>
            <Box sx={{ boxShadow: 3, mb: 2 }}>
                <Card variant="outlined">
                    <CardHeader title="Deposit Money" titleTypographyProps={{variant:'h5', fontWeight:'bold' }}></CardHeader>
                    <CardContent>
                        <TextField fullWidth id="standard-basic" 
                            select
                            label="Select Trader" 
                            style={{marginTop:"5px", marginBottom:"5px"}}
                            value={selectedTrader}
                            onChange={(e) => setSelectedTrader(e.target.value)} required="true" >
                                <MenuItem key="self" value="SELF">
                                    Self
                                </MenuItem>
                                {
                                    traders.map((trader) => (
                                        <MenuItem key={trader.user_id} value={trader.user_id}>
                                            {trader.fname} {trader.lname}
                                        </MenuItem>
                                    ))
                                }
                        </TextField>
                        <TextField fullWidth id="standard-basic" 
                            label="Amount" 
                            style={{marginTop:"5px", marginBottom:"5px"}}
                            value={amount}
                            autoComplete='off'
                            onChange={(e) => setamount(e.target.value)} required="true" />
                        <Button variant="contained" onClick={onTransfer} disabled={amount < 1}>Transfer</Button>
                    </CardContent>
                </Card>
            </Box>
        </div>
    )
}

export default ClientDeposit
