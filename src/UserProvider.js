import React, { useEffect, useState } from 'react'

export const UserContext = React.createContext();

function getRandomInt(max) {
    return Math.floor(Math.random() * max);
}

const UserProvider = ({children}) => {
    const [user, setUser] = useState({})
    const [clients, setClients] = useState([])
    const [btcCurrentRate, setBtcRate] = useState(20)
    const [traders, setTraders] = useState([])
    const value = {user, setUser, clients, setClients, traders, setTraders, btcCurrentRate}

    useEffect(() => {
        fetch(`/auth/user`).then((res) => res.json())
        .then((data) => {
            console.log("provider",data);
            setUser(data);
        })
        .catch((err) => {
            console.log(err);
        });

        // fetch clients
        fetch(`/clients`).then((res) => res.json())
        .then((data) => {
            console.log("provider",data);
            setClients(data);
        })
        .catch((err) => {
            console.log(err);
        });

        // fetch clients
        fetch(`/traders`).then((res) => res.json())
        .then((data) => {
            console.log("provider",data);
            setTraders(data);
        })
        .catch((err) => {
            console.log(err);
        });

        setInterval(() => {
            let baseRate = 25;
            let direction = getRandomInt(2);
            let rand = getRandomInt(20);
            if(direction === 0) {
                setBtcRate(baseRate + rand)
            } else {
                setBtcRate(baseRate - rand < 10 ? 25 : baseRate - rand)
            }
        }, 5000)

    },[])

    return (
        <UserContext.Provider value={value}>
            {children}
        </UserContext.Provider>
    )
}

export default UserProvider
