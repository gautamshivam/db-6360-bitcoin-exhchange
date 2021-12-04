import { Typography } from '@mui/material'
import React, {useContext, useState} from 'react'
import { UserContext } from './UserProvider'
import DashboardClient from './components/client/DashboardClient'



function Home(){
    const {user} = useContext(UserContext)
    
    return (
        <div class="row">
            <div class="col-12 my-3">
                { user && <h1>Welcome {user.fname}</h1>}
            </div>
            {
                user.user_type === "CLIENT" && <DashboardClient/>
            }
        </div>
    )
}

export default Home
