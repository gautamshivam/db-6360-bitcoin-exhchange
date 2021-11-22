import React from 'react'
import './Register.css'
import { FaWindowClose } from 'react-icons/fa'
import {useState} from 'react'

const Register = ({open,onClose}) => {
  const [email,setEmail]=useState("")
    const [password,setPassword]=useState("")
    const [repeatPassword,setRepeatPassword]=useState("")
    if (!open) return null
    
    const signUp=()=>{
      let item={email,password,repeatPassword}
      console.warn(item)
    }
    return (
        <div>
            <form>
            <button id="icon" onClick={onClose}><FaWindowClose/></button>
            <fieldset>
            <legend>Registration Form</legend>
  <div class="container">
    <h1>Register</h1>
    <p>Please fill in this form to create an account.</p>
    <hr/>

    <label for="email"><b>Email</b></label>
    <input type="text" placeholder="Enter Email" onChange={(e)=>setEmail(e.target.value)} value={email} id="email" required/>

    <label for="psw"><b>Password</b></label>
    <input type="password" placeholder="Enter Password" onChange={(e)=>setPassword(e.target.value)} value={password} id="psw" required/>

    <label for="psw-repeat"><b>Repeat Password</b></label>
    <input type="password" placeholder="Repeat Password" onChange={(e)=>setRepeatPassword(e.target.value)} value={repeatPassword} id="psw-repeat" required/>
    <hr/>
    <p>By creating an account you agree to our <a href="#">Terms & Privacy</a>.</p>

    <button type="submit" class="registerbtn" onClick={signUp}>Register</button>
  </div>
  
  <div class="container signin">
    <p>Already have an account? <a href="#">Sign in</a>.</p>
  </div>
  </fieldset>
</form>

        </div>
    )
}

export default Register
