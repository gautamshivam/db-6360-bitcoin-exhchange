import React, { useEffect, useState } from 'react'

export const UserContext = React.createContext();


const UserProvider = ({children}) => {
    const [user, setUser] = useState({})
    const value = {user, setUser}

    useEffect(() => {
        fetch(`/auth/user`).then((res) => res.json())
        .then((data) => {
            console.log("provider",data);
            setUser(data);
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
