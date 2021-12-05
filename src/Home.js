import React, {useContext, useEffect} from 'react'
import { UserContext } from './UserProvider'
import DashboardClient from './components/client/DashboardClient'
import DashboardTrader from './components/trader/DashboardTrader'
import DashboardManager from './components/manager/DashboardManager'
import Landing from './Landing';
import Axios from 'axios'

function Home(){
    const {user, setClients, setTraders} = useContext(UserContext)
    
    useEffect(() => {
        Axios.get("/clients").then((res) => setClients(res.data))
        Axios.get("/traders").then((res) => setTraders(res.data))
    }, [])
    return (
        <div class="row m-0">
            <div class="col-12 my-3">
                {/* { user && <h1>Welcome {user.fname}</h1>} */}
            </div>
            {
                user.user_type === "CLIENT" && <DashboardClient/>
            }
            {
                user.user_type === "TRADER" && <DashboardTrader/>
            }
            {
                user.user_type === "MANAGER" && <DashboardManager/>
            }
            {
                user.fname == null && <Landing/>
            }
        </div>
    )
}

export default Home
