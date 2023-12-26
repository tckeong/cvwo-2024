import logo from "../resources/logo/logo.jpg";
import "./css/header.css";
import { Link } from "react-router-dom";
import TextField from '@mui/material/TextField';
import Button from '@mui/material/Button';
import PersonIcon from '@mui/icons-material/Person';
import { IconButton, Typography } from "@mui/material";
import DropdownButton from 'react-bootstrap/DropdownButton';
import Dropdown from 'react-bootstrap/Dropdown';

function Header() {
    return (
        <div className="header">
            <div className="logo">
                <Link to="/" >
                    <img src={logo} alt="logo" id="logoImg"/>
                </Link>
                <h4 id="logoTopic">Web Forum</h4>
            </div>
            <div className="searchBar" style={{display: "flex", justifyContent: "center", alignContent: "center"}}>
                <TextField fullWidth={true} id="outlined-search" label="Search field"  type="search" margin="normal" 
                            sx={{minWidth: '10rem', justifySelf: "center", alignSelf: "center"}}/>
                <Button className="searchBtn" sx={{marginTop: "0.5rem", marginLeft: '0.5rem', width: "auto", fontSize: '0.8rem', height: "60%",
                                                    justifySelf: "center", alignSelf: "center", padding: "0.2rem", minWidth: "fit-content"}}>
                    Search
                </Button>
            </div>
            {/* <Link to="/login" className="loginButton">
                <Button variant="contained" endIcon={<Icon icon="oi:account-login" />} color="success">
                    Login
                </Button>
            </Link> */}
            <IconButton color="primary" aria-label="user" className="userButton">
                <PersonIcon />
                <Typography>username</Typography>
            </IconButton>
        </div>
    );
}

export default Header;