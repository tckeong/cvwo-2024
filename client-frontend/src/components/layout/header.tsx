import logo from "../../resources/logo/logo.jpg";
import "../css/header.css";
import { Link } from "react-router-dom";
import TextField from '@mui/material/TextField';
import Button from '@mui/material/Button';
import UserLoginButton from "./userLoginButton";
import { useNavigate } from "react-router-dom";

function Header() {
    const navigate = useNavigate();
    let keywords: string = "";

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
                            sx={{minWidth: '10rem', justifySelf: "center", alignSelf: "center"}} onChange={(e) => keywords = e.target.value} />
                <Button className="searchBtn" onClick={() => navigate("/search/" + keywords)}
                        sx={{marginTop: "0.5rem", marginLeft: '0.5rem', width: "auto", fontSize: '0.8rem', height: "60%",
                            justifySelf: "center", alignSelf: "center", padding: "0.2rem", minWidth: "fit-content"}}>
                    Search
                </Button>
            </div>
            <UserLoginButton loginState={true} />
        </div>
    );
}

export default Header;