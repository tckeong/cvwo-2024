import PersonIcon from '@mui/icons-material/Person';
import { IconButton, Typography } from "@mui/material";
import { Link, useNavigate } from "react-router-dom";
import Button from '@mui/material/Button';
import LoginIcon from '@mui/icons-material/Login';
import { useState } from 'react';
import { Popover } from '@mui/material';
import Cookies from "js-cookie";
import { SubmitLikes, reset } from '../interact/likeInteract';
import { useDispatch } from 'react-redux';
import API_URL from '../../api/apiConfig';

interface PropsPopper {
    handleClose: () => void;
    setLoginState: (state: boolean) => void;
    anchorEl: HTMLButtonElement | null;
}

function UserButtonPopper(props: PropsPopper) {
    const { handleClose, anchorEl, setLoginState } = props;
    const dispatch = useDispatch();
    const navigate = useNavigate();

    const open = Boolean(anchorEl);
    const id = "user-button-popper";

    const handleLogout = async () => {
        await SubmitLikes(() => dispatch(reset()));
        await fetch(`${API_URL}logout/${Cookies.get("Authorization")}`);

        Cookies.remove("Authorization");
        Cookies.remove("username");
        Cookies.remove("userId");
        handleClose();
        setLoginState(false);
    }

    return (
        <Popover id={id} anchorEl={anchorEl} onClose={handleClose} open={open} anchorOrigin={{vertical: "bottom", horizontal: "left"}} >
            <div style={{display: "flex", flexDirection: "column"}}>
                <Button variant="contained" color="error" size='small' onClick={handleLogout}>
                    Logout
                </Button>
                <Button variant="outlined" onClick={() => navigate("/myThreads")} size='small'>
                    My Threads
                </Button>
            </div>
        </Popover>
    );
}

function UserLoginButton() {
    const [loginState, setLoginState] = useState(Cookies.get("Authorization") !== undefined);

    const [anchorEl, setAnchorEl] = useState<HTMLButtonElement | null>(null);
    
    const username = Cookies.get("username") || "";

    const handleClick = (event: React.MouseEvent<HTMLButtonElement>) => {
        setAnchorEl(event.currentTarget);
    };

    const handleClose = () => {
        setAnchorEl(null);
    };

    return (
        <div className='user-login-btn'>
            {(!loginState)
            ? (<Link to="/login">
                    <Button variant="contained" endIcon={<LoginIcon />}>
                        Login
                    </Button>
                </Link>)
            : (<IconButton color="primary" aria-label="user" onClick={handleClick}>
                <PersonIcon />
                <Typography>{username}</Typography>
            </IconButton>)}
            <UserButtonPopper handleClose={handleClose} anchorEl={anchorEl} setLoginState={setLoginState} /> 
        </div>
    );
}

export default UserLoginButton;

