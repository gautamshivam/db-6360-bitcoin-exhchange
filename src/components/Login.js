import React, { useState, useContext } from 'react'
import Axios from 'axios'
import { Link } from 'react-router-dom';
import Button from '@mui/material/Button';
import './Login.css'
import { UserContext } from "../UserProvider";
import { useNavigate } from 'react-router-dom';
import LoginIcon from '@mui/icons-material/Login';
import { Typography } from '@mui/material';
import MonetizationOnIcon from '@mui/icons-material/MonetizationOn';

const Login = () => {

    const {setUser} = useContext(UserContext);

    const [loginUsername, setLogingUsername] = useState("");
    const [loginPassword, setLogingPassword] = useState("");

    const [isError, setIsError] = useState(false);
    const [error, setError] = useState("");

    let navigate = useNavigate();

    const getUser = () => {
        Axios.get(`/auth/user`,{
            withCredentials: true
        }).then((res) => {
            setUser(res.data);
            navigate('/')
        })
    }

    const onInputChange = () => {
        setIsError(false);
        setError("");
    }

    const login = () => {
        if(loginUsername === null || loginUsername === "") {
            setIsError(true);
            setError("username is empty");
            return;
        }
        if(loginPassword === null || loginPassword === "") {
            setIsError(true);
            setError("password is empty");
            return;
        }
        Axios.post(`/auth/login`, {
            username: loginUsername,
            password: loginPassword
        }, {
            withCredentials: true
        }).then((res) => {
            if(res.status === 200 && res.data === "successfully authenticated") {
                console.log(res);
                getUser();
            } else {
                setIsError(true);
                setError(res.data);
            }
        }).catch((err) => console.log('error', err.message));
    }
    return (
        <div class="login-page">
            <div class="form">
                <Typography marginTop='25px' marginBottom='50px'>
                    <MonetizationOnIcon style={{color:'#4CAF50', fontSize:'80px'}}/>
                    <p style={{color:'#4CAF50',fontWeight:'bold'}}>BITCOIN TRADING</p>
                </Typography>
                <form class="login-form" onChange={onInputChange}>
                    <input type="text" name="username" class="form-control" placeholder="username" required={true} onChange={e => setLogingUsername(e.target.value)}/>
                    <input type="password" name="password" class="form-control" placeholder="password" required={true} onChange={e => setLogingPassword(e.target.value)}/>
                    <Button onClick={login} variant='contained' startIcon={<LoginIcon/>}>login</Button>
                    { isError && <Typography marginTop='25px' color='red' fontWeight='bold'>Error: {error}</Typography>}
                    <p class="message">Not registered? <Link to="/register">Create an account</Link></p>
                </form>
            </div>
        </div>
    )
}

export default Login
