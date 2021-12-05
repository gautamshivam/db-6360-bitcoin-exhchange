import React, { useContext } from 'react';
import { Link } from 'react-router-dom';
import './Navbar.css'
import { useNavigate } from 'react-router-dom';
import {UserContext} from '../UserProvider';
import HomeIcon from '@mui/icons-material/Home';
import AccountCircleIcon from '@mui/icons-material/AccountCircle';
import LoginIcon from '@mui/icons-material/Login';
import LogoutIcon from '@mui/icons-material/Logout';
import Menu from '@mui/material/Menu';
import MenuItem from '@mui/material/MenuItem';
import ListItemIcon from '@mui/material/ListItemIcon';
import Divider from '@mui/material/Divider';
import IconButton from '@mui/material/IconButton';
import Box from '@mui/material/Box';
import Avatar from '@mui/material/Avatar';
import Typography from '@mui/material/Typography';
import MonetizationOnIcon from '@mui/icons-material/MonetizationOn';

const Navbar = () => {
    const {user, setUser, btcCurrentRate} = useContext(UserContext)
    let navigate = useNavigate();

    const [anchorEl, setAnchorEl] = React.useState(null);
    const open = Boolean(anchorEl);
    const handleClick = (event) => {
        setAnchorEl(event.currentTarget);
    };
    const handleClose = () => {
        setAnchorEl(null);
    };

    const navigateToHome = () => {
        navigate('/');
    }
    const navigateToProfile = () => {
        navigate('/profile');
    }

    const onLogout = () => {
        fetch('/auth/logout').then(() => {
            console.log('logged out')
            setUser({});
            navigate('/login')
        }).catch((err) => console.log('error loggin out', err));
    }
    return (
        <div className="row justify-content-center NavbarItems align-items-center">
                <ul className='nav-menu justify-content-center align-items-center mt-3'>
                    <li>
                        <Link className="nav-links" to="/" color='primary'>
                            {user == null || user.fname === undefined ? <><HomeIcon/>Home</> : user.user_type}
                        </Link>
                    </li>
                    <li className="" style={{marginLeft:'150px', marginRight:'150px'}}>
                        <MonetizationOnIcon style={{color:'#FFFFFF', fontSize:'40px'}} onClick={navigateToHome}/>
                        <Typography fontWeight="bold" color="white" marginBottom="10px" fontSize="22px">
                            Current Price: ${btcCurrentRate}
                        </Typography>
                    </li>
                    {
                        user == null || user.fname === undefined ?
                        <li>
                            <Link className="nav-links" to="/login" color='inherit'>
                                Login / Register<LoginIcon/> 
                            </Link>
                        </li> :
                        <>
                            <Box sx={{ display: 'flex', alignItems: 'center', textAlign: 'center' }}>
                                <Typography sx={{ minWidth: 100, color:'white', fontWeight:'bold' }}>Hi {user.fname[0].toUpperCase() + user.fname.slice(1)}</Typography>
                                <IconButton onClick={handleClick} size="small" sx={{ ml: 2 }}>
                                    <Avatar sx={{ width: 32, height: 32 }}>{user.fname.charAt(0).toUpperCase()}</Avatar>
                                </IconButton>
                            </Box>
                            <Menu
                                anchorEl={anchorEl}
                                open={open}
                                onClose={handleClose}
                                onClick={handleClose}
                                PaperProps={{
                                elevation: 0,
                                sx: {
                                    overflow: 'visible',
                                    filter: 'drop-shadow(0px 2px 8px rgba(0,0,0,0.32))',
                                    mt: 1.5,
                                    '& .MuiAvatar-root': {
                                    width: 32,
                                    height: 32,
                                    ml: -0.5,
                                    mr: 1,
                                    },
                                    '&:before': {
                                    content: '""',
                                    display: 'block',
                                    position: 'absolute',
                                    top: 0,
                                    right: 14,
                                    width: 10,
                                    height: 10,
                                    bgcolor: 'background.paper',
                                    transform: 'translateY(-50%) rotate(45deg)',
                                    zIndex: 0,
                                    },
                                },
                                }}
                                transformOrigin={{ horizontal: 'right', vertical: 'top' }}
                                anchorOrigin={{ horizontal: 'right', vertical: 'bottom' }}
                            >
                                <MenuItem onClick={navigateToProfile}>
                                    <AccountCircleIcon /> Profile
                                </MenuItem>
                                <Divider />
                                <MenuItem onClick={onLogout}>
                                    <ListItemIcon>
                                        <LogoutIcon fontSize="small" />
                                    </ListItemIcon>
                                    Logout
                                </MenuItem>
                            </Menu>
                        </>
                    }   
                    
                </ul>
                
        
        </div>
    )
}

export default Navbar
