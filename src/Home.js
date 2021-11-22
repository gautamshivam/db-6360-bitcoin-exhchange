import React from 'react'
import Login from './Login'
import Register from './Register'
import {useState} from 'react';
function Home(){
    const [isOpenLogin, setIsOpenLogin] = useState(false)
  const [isOpenRegister, setIsOpenRegister] = useState(false)
    return (
        <div>
            <h1>Welcome to Bitcoin transaction System</h1>
            <button onClick={() => setIsOpenLogin(true)}>Login</button>
        <Login open={isOpenLogin} onClose={() => setIsOpenLogin(false)}></Login>
        <button onClick={() => setIsOpenRegister(true)}>Register</button>
        <Register open={isOpenRegister} onClose={() => setIsOpenRegister(false)}></Register>
        </div>
    )
}

export default Home
