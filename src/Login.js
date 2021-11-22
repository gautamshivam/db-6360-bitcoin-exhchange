import React from 'react'
import { FaWindowClose } from 'react-icons/fa'
import './Login.css'

const Login = ({open,onClose}) => {
    if (!open) return null
    return (
        <div>
        <form>
            <button id="icon" onClick={onClose}><FaWindowClose/></button>
            <fieldset>
            <legend>Login Form</legend>
        <div class="container">
            
            <label for="uname"><b>Username</b></label>
             <input type="text" placeholder="Enter Username" name="uname" required/>

            <label for="psw"><b>Password</b></label>
            <input type="password" placeholder="Enter Password" name="psw" required/>

            <button type="submit">Login</button>
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
