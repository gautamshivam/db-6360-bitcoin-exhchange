import React, {useContext} from 'react'
import {UserContext} from '../../UserProvider'

const TraderSellBtc = () => {
    const {user} = useContext(UserContext);


    return (
        <div>
            Sell BTC by Trader {user.fname}
        </div>
    )
}

export default TraderSellBtc
