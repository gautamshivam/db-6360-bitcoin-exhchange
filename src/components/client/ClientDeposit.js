import React, {useContext, useState} from 'react'
import Box from "@mui/material/Box";
import { Card, CardContent, CardHeader, TextField } from "@mui/material";
import { UserContext } from '../../UserProvider';
import Button from '@mui/material/Button';
import Axios from 'axios';

const ClientDeposit = () => {
    const {user} = useContext(UserContext);
    const [amount, setamount] = useState(0);

    const onTransfer = () => {
        if(isNaN(amount) || parseInt(amount) === 0) {
            alert("Invalid amount");
            return;
        }
        Axios.post("/bank/deposit", {
            client_id:user.user_id,
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
                            label="Amount" 
                            style={{marginTop:"5px", marginBottom:"5px"}}
                            value={amount}
                            autoComplete='off'
                            onChange={(e) => setamount(e.target.value)} required="true" />
                        <Button variant="contained" onClick={onTransfer}>Transfer</Button>
                    </CardContent>
                </Card>
            </Box>
        </div>
    )
}

export default ClientDeposit
