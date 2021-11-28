import React from 'react'
import { FaWindowClose } from 'react-icons/fa'
import './Login.css'
import { useState } from 'react'

const Login = ({open,onClose}) => {
    const [email,setEmail]=useState("")
    const [password,setPassword]=useState("")
    if (!open) return null
    const login=async()=>{
        let item={email,password}
        let result=await fetch("/auth/login",{
            method:'POST',
            headers:{
                "Cache-Control":'no-cache',
                "Postman-Token":'<calculated when request is sent>',
                "Content-Type":'application/json',
                "Content-Length":'<calculated when request is sent>',
                "Host":'<calculated when request is sent>',
                "User-Agent":'PostmanRuntime/7.28.3',
                "Accept-Encoding":'gzip, deflate, br',
                "Connection":'keep-alive',
                "Accept":'*/*',
            },
            body:JSON.stringify(item)
        })
        result=await result.json()
      localStorage.setItem("user-info",JSON.stringify(result))
    }
    return (
        <div>
        <form>
            <button id="icon" onClick={onClose}><FaWindowClose/></button>
            <fieldset>
            <legend>Login Form</legend>
        <div class="container">
            
            <label for="email"><b>Email</b></label>
             <input type="text" placeholder="Enter Email" name="email" onChange={(e)=>setEmail(e.target.value)} required/>

            <label for="password"><b>Password</b></label>
            <input type="password" placeholder="Enter Password" name="password" onChange={(e)=>setPassword(e.target.value)} required/>

            <button type="submit" onClick={login}>Login</button>
            <label>
      <input type="checkbox" checked="checked" name="remember"/> Remember me
    </label>

    </div>
    </fieldset>
    </form>
    </div>
    )
}

export default Login
