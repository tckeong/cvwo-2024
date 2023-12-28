import PersonIcon from '@mui/icons-material/Person';
import { IconButton, Typography } from "@mui/material";
import { Link } from "react-router-dom";
import Button from '@mui/material/Button';
import LoginIcon from '@mui/icons-material/Login';
import { useState } from 'react';
import { Popover } from '@mui/material';

interface Props {
    state: boolean;
}

interface PropsPopper {
    handleClose: () => void;
    anchorEl: HTMLButtonElement | null;
}

function UserButtonPopper(props: PropsPopper) {
    const { handleClose, anchorEl } = props;

    const open = Boolean(anchorEl);
    const id = "user-button-popper";

    return (
        <Popover id={id} anchorEl={anchorEl} onClose={handleClose} open={open} anchorOrigin={{vertical: "bottom", horizontal: "left"}} >
            <div style={{display: "flex", flexDirection: "column"}}>
                <Button variant="contained" color="error" size='small'>
                    Logout
                </Button>
                <Button variant="outlined" href="/myPosts" size='small'>
                    My Posts
                </Button>
            </div>
        </Popover>
    );
}

function UserLoginButton(props: Props) {
    const {state} = props;
    const [anchorEl, setAnchorEl] = useState<HTMLButtonElement | null>(null);

    const handleClick = (event: React.MouseEvent<HTMLButtonElement>) => {
        setAnchorEl(event.currentTarget);
    };

    const handleClose = () => {
        setAnchorEl(null);
    };

    return (
        <div className='user-login-btn'>
            {(state)
            ? (<Link to="/login">
                    <Button variant="contained" endIcon={<LoginIcon />}>
                        Login
                    </Button>
                </Link>)
            : (<IconButton color="primary" aria-label="user" onClick={handleClick}>
                <PersonIcon />
                <Typography>username</Typography>
            </IconButton>)}
            <UserButtonPopper handleClose={handleClose} anchorEl={anchorEl} /> 
        </div>
    );
}

export default UserLoginButton;

