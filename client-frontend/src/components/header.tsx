import logo from "../resources/logo/logo.jpg";
import "./css/header.css";
import { Link } from "react-router-dom";
import TextField from '@mui/material/TextField';
import Button from '@mui/material/Button';
import { Icon } from '@iconify/react';

function Header() {
    return (
        <div className="header">
            <div className="logo">
                <a href="/" className="aImg">
                    <img src={logo} alt="logo" id="logoImg"/>
                </a>
                <h4 id="logoTopic">Web Forum</h4>
            </div>
            <div className="searchBar">
                <TextField fullWidth={true} id="outlined-search" label="Search field"  type="search" margin="normal" />
                <button className="btn btn-info searchBtn">Search</button>
            </div>
            <Link to="/login" className="loginButton">
                {/* <Button variant="contained" endIcon={<Icon icon="oi:account-login" />} color="success">
                    Login
                </Button> */}
                <Button startIcon={<Icon icon="oi:person" />}>
                    username
                </Button>
            </Link>
        </div>
    );
}

export default Header;