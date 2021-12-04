import React, { useEffect, useState } from 'react'

export const UserContext = React.createContext();


const UserProvider = ({children}) => {
    const [user, setUser] = useState({})
    const [clients, setClients] = useState([])
    const [traders, setTraders] = useState([])
    const value = {user, setUser, clients, setClients, traders, setTraders}

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

    },[])

    return (
        <UserContext.Provider value={value}>
            {children}
        </UserContext.Provider>
    )
}

export default UserProvider
