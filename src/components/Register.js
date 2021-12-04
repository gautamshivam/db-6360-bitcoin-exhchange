import {React, useState} from 'react'
import Axios from 'axios'
import { Link } from 'react-router-dom';
import './Register.css'
import PersonAddAltIcon from '@mui/icons-material/PersonAddAlt';
import Button from '@mui/material/Button';
import { Typography } from '@mui/material';
import MonetizationOnIcon from '@mui/icons-material/MonetizationOn';
import TextField from '@mui/material/TextField';
import { MenuItem } from '@mui/material';


const Register = () => {
    const [registerUsername, setRegisterUsername] = useState("");
    const [registerPassword, setRegisterPassword] = useState("");
    const [fname, setFname] = useState("");
    const [lname, setLname] = useState("");
    const [phone, setPhone] = useState("");
    const [cell, setCell] = useState("");
    const [userType, setUserType] = useState("");

    const [isError, setIsError] = useState(false);
    const [error, setError] = useState("");
    const [msg, setMsg] = useState("");
    //let navigate = useNavigate();


    const onFormChange = () => {
        setIsError(false);
        setMsg("")
    }
    const register = () => {
        Axios.post(`/users`, {
            fname:fname,
            lname:lname,
            phone:phone,
            cell_number:cell,
            user_type:userType,
            email:registerUsername,
            password:registerPassword,
        }, {
            withCredentials: true
        }).then((res) =>{ 
            console.log(res)
            if(res.data.email !== undefined) {
                //navigate('/login');  
                setIsError(false);
                setMsg(`Successfully registered, login with username: ${res.data.email}`);

            } else {
                setIsError(true);
                setError(res.data);
            }
        }).catch((err) => console.log('err:',err));
    }
    return (
        <div class="register-page">
            <div class="form">
                <Typography marginTop='15px' marginBottom='50px'>
                    <MonetizationOnIcon style={{color:'#4CAF50', fontSize:'80px'}}/>
                    <p style={{color:'#4CAF50',fontWeight:'bold'}}>BITCOIN TRADING</p>
                </Typography>
                <form class="Register-form" onChange={onFormChange}>
                    <TextField fullWidth id="standard-basic" 
                    select
                    label="User Type" 
                    style={{marginTop:"5px", marginBottom:"5px"}}
                    value={userType}
                    onChange={(e) => setUserType(e.target.value)} required="true" >
                            <MenuItem key="Client" value="CLIENT">
                               Client
                            </MenuItem>
                            <MenuItem key="Trader" value="TRADER">
                                Trader
                            </MenuItem>
                            <MenuItem key="Manager" value="MANAGER">
                                Manager
                            </MenuItem>
                    </TextField>
                    <TextField fullWidth id="standard-basic" 
                        label="First Name" 
                        style={{marginTop:"5px", marginBottom:"5px"}}
                        value={fname}
                        autoComplete='off'
                        onChange={(e) => setFname(e.target.value)} required="true" />
                    <TextField fullWidth id="standard-basic" 
                        label="Last Name" 
                        style={{marginTop:"5px", marginBottom:"5px"}}
                        value={lname}
                        autoComplete='off'
                        onChange={(e) => setLname(e.target.value)} required="true" />
                    <TextField fullWidth id="standard-basic" 
                        label="Phone" 
                        style={{marginTop:"5px", marginBottom:"5px"}}
                        value={phone}
                        autoComplete='off'
                        onChange={(e) => setPhone(e.target.value)}/>
                    <TextField fullWidth id="standard-basic" 
                        label="Cell" 
                        style={{marginTop:"5px", marginBottom:"5px"}}
                        value={cell}
                        autoComplete='off'
                        onChange={(e) => setCell(e.target.value)}/>
                    <TextField fullWidth id="standard-basic" 
                        label="Email" 
                        style={{marginTop:"5px", marginBottom:"5px"}}
                        value={registerUsername}
                        autoComplete='off'
                        onChange={(e) => setRegisterUsername(e.target.value)} required="true" />
                    <TextField fullWidth id="standard-basic" 
                        label="Password" 
                        style={{marginTop:"5px", marginBottom:"5px"}}
                        value={registerPassword}
                        autoComplete='off'
                        onChange={(e) => setRegisterPassword(e.target.value)} required="true" />
                    <Button onClick={register} 
                    type="button" variant='contained' 
                    startIcon={<PersonAddAltIcon/>}
                    disabled={isError}>Create Account</Button>
                    { isError && <Typography marginTop='25px' color='red' fontWeight='bold'>Error: {error}</Typography>}
                    { !isError  && <p> {msg}</p>}
                    <p class="message">Already registered? <Link to="/login">Sign in</Link></p>
                </form>
            </div>
        </div>
    )
}

export default Register
