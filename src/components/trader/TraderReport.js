import React, {useContext} from 'react'
import {UserContext} from '../../UserProvider'

const TraderReport = () => {
    const {user} = useContext(UserContext);

    return (
        <div className="row mt-3 justify-content-center">
            Showing Trader Report for {user.fname}
        </div>
    )
}

export default TraderReport
