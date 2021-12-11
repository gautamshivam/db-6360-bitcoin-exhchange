import { Typography } from '@mui/material';
import React, {useContext, useEffect, useState } from 'react'
import { UserContext } from "../UserProvider";
import Axios from 'axios';
import Button from '@mui/material/Button';
import { Divider, Box } from '@mui/material';

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
                        Membership Level: {client.membership_level}
                    </Typography>
                </div>
            }
            
            <div class="col-md-4">
                {user !== null && <><h1>Welcome {user.fname}</h1>
                        <Typography component='div'>
                            <Box fontWeight='bold' display='inline'>
                                User Type:
                            </Box> {user.user_type}
                        </Typography>
                        <Typography component='div'>
                            <Box fontWeight='bold' display='inline'>
                                First Name:
                            </Box> {user.fname}
                        </Typography>
                        <Typography component='div'>
                            <Box fontWeight='bold' display='inline'>
                                Last Name:
                            </Box> {user.lname}
                        </Typography>
                        <Typography component='div'>
                            <Box fontWeight='bold' display='inline'>
                                Phone:
                            </Box> {user.phone}
                        </Typography>
                        <Typography component='div'>
                            <Box fontWeight='bold' display='inline'>
                                Cell:
                            </Box> {user.cell_number}
                        </Typography>
                        <Typography component='div'>
                            <Box fontWeight='bold' display='inline'>
                                Email:
                            </Box> {user.email}
                        </Typography>
                        <Divider/>
                        <Typography fontWeight="bold">
                            Address
                        </Typography>
                        <Typography component='div'>
                            <Box fontWeight='bold' display='inline'>
                                Street:
                            </Box> {user.street}
                        </Typography>
                        <Typography component='div'>
                            <Box fontWeight='bold' display='inline'>
                                City:
                            </Box> {user.city}
                        </Typography>
                        <Typography component='div'>
                            <Box fontWeight='bold' display='inline'>
                                State:
                            </Box> {user.state}
                        </Typography>
                        <Typography component='div'>
                            <Box fontWeight='bold' display='inline'>
                                Zip Code:
                            </Box> {user.zip}
                        </Typography>

                    </>
                }
            </div>
            <div class="col-md-2"></div>
            
        </div>
    )
}

export default Profile
