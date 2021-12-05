import { Typography } from '@mui/material';
import React, {useContext, useEffect, useState } from 'react'
import { UserContext } from "../UserProvider";
import Axios from 'axios';
import Button from '@mui/material/Button';

const Profile = () => {
    // const[user, setUser] = useState({})
    const {user} = useContext(UserContext);
    const [client, setclient] = useState({})

    const fetchBalance = () => {
        Axios.get(`/clients/${user.user_id}`).then((res) => {
            console.log(res.data[0]);
            setclient(res.data[0])
        })
    }
    return (
        <div class="row justify-content-center mt-5">
            <div class="col-md-2"></div>
            {
                user.user_type === "CLIENT" && 
                <div class="col-md-4">
                    <Button variant="contained" onClick={fetchBalance}>Fetch Balances</Button>
                    <Typography fontSize="25px" fontWeight="bold" marginTop="50px">
                        Bitcoin Balance: {client.bitcoin_balance}
                    </Typography>
                    <Typography fontSize="25px" fontWeight="bold">
                        Fiat Balance: ${client.fiat_balance}
                    </Typography>
                    <Typography fontSize="25px" fontWeight="bold">
                        Membership Level: ${client.membership_level}
                    </Typography>
                </div>
            }
            
            <div class="col-md-4">
                {user !== null && <><h1>Welcome {user.fname}</h1>
                        <Typography>
                            User Type: {user.user_type}
                        </Typography>
                        <Typography>
                            First Name: {user.fname}
                        </Typography>
                        <Typography>
                            Last Name: {user.lname}
                        </Typography>
                        <Typography>
                            Phone: {user.phone}
                        </Typography>
                        <Typography>
                            Cell: {user.cell_number}
                        </Typography>
                        <Typography>
                            Email: {user.email}
                        </Typography>
                    </>
                }
            </div>
            <div class="col-md-2"></div>
            
        </div>
    )
}

export default Profile
