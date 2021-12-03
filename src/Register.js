import React from 'react'
import './Register.css'
import { FaWindowClose } from 'react-icons/fa'
import { useHistory } from 'react-router'
import {useState} from 'react'

const Register = ({open,onClose}) => {
  const [fname,setFname]=useState("")
  const [lname,setLname]=useState("")
  const [phone,setPhone]=useState("")
  const [cellNumber,setCellNumber]=useState("")
  const [userType,setUserType]=useState("")
  const [email,setEmail]=useState("")
  const [password,setPassword]=useState("")  
  const history=useHistory();
    if (!open) return null
    
    const signUp=async ()=>{
      let item={fname,lname,phone,cellNumber,userType,email,password}

      let result=fetch("http://localhost:5000/users",{
        method:'POST',
        body:JSON.stringify(item),
      
      })
  
      alert('You have registered sucessfully')
      localStorage.setItem("user-info",JSON.stringify(result))
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
    <label for="fname"><b>First Name</b></label>
    <input type="text" placeholder="Enter your first name" onChange={(e)=>setFname(e.target.value)} value={fname} id="fname" required/>

    <label for="lname"><b>Last Name</b></label>
    <input type="text" placeholder="Enter your last name" onChange={(e)=>setLname(e.target.value)} value={lname} id="lname" required/>

    <label for="phone"><b>Phone</b></label>
    <input type="text" placeholder="Enter phone" onChange={(e)=>setPhone(e.target.value)} value={phone} id="phone" required/>

    <label for="callNumber"><b>Cell number</b></label>
    <input type="text" placeholder="Enter Cell Number" onChange={(e)=>setCellNumber(e.target.value)} value={cellNumber} id="cellNumber" required/>
    
    <label for="userType"><b>User Type</b></label>
    <hr></hr>
    <select onChange={(e)=>setUserType(e.target.value)} value={userType} id="users">
    <option value="client">Client</option>
    <option value="trader">Trader</option>
    </select>
      <hr></hr>
    <label for="email"><b>Email</b></label>
    <input type="text" placeholder="Enter Email" onChange={(e)=>setEmail(e.target.value)} value={email} id="email" required/>

    <label for="pwd"><b>Password</b></label>
    <input type="password" placeholder="Enter Password" onChange={(e)=>setPassword(e.target.value)} value={password} id="pwd" required/>

    
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
