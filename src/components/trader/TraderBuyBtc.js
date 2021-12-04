import React, {useContext} from 'react'
import {UserContext} from '../../UserProvider'

const TraderBuyBtc = () => {
    const {user} = useContext(UserContext);


    return (
        <div>
            Buy BTC by Trader {user.fname}
        </div>
    )
}

export default TraderBuyBtc
