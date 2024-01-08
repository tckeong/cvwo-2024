import logo from "../resources/logo/logo.jpg";
import { Box, Typography, Link } from "@mui/material";
import Button from 'react-bootstrap/Button';
import Form from 'react-bootstrap/Form';
import { useState } from "react";
import { useNavigate } from "react-router-dom";

import "./css/signup.css";
import API_URL from "../api/apiConfig";

function SignUp() {
    const [username, setUsername] = useState("");
    const [password, setPassword] = useState("");
    const [confirmPassword, setconfirmPassword] = useState("");

    const navigate = useNavigate();

    const handleClick = () => {
        if (password !== confirmPassword) {
            alert("Passwords do not match!");
            return;
        }

        fetch(`${API_URL}signup`, {
            method: "POST",
            headers: {
                "Content-Type": "application/json",
            },
            body: JSON.stringify({
                username: username,
                password: password
            })
        }).then(res => {
            if (res.ok) {
                return res.json();
            } else {
                throw new Error("Sign up failed!");
            }
        })
          .then(data => alert(data.message))
          .then(() => navigate("/login"))
          .catch(err => alert(err));
    };

    return (
        <div className="signup-page">
            <div style={{gridArea: "logo", display: "flex", flexDirection: "row", justifyContent: "center", alignContent: "center"}}>
                <Link onClick={() => navigate("/")} sx={{justifySelf: "center", alignSelf: "center", ":hover": {"cursor": "pointer"}}}>
                    <img src={logo} alt="logo" id="logoImg"/>
                </Link>
                <h4 id="logoTopic">Web Forum</h4>
            </div>
            <Box className="signup-page-content">
                <Typography variant="h4" style={{textAlign: "center", color: "#000000", margin: "1rem"}}>Sign Up</Typography>
                <Box style={{display: "flex", flexDirection: "column", justifyContent: "center", alignContent: "center", margin: "1rem"}}>
                    <Form 
                        style={{display: "flex", flexDirection: "column", justifyContent: "center", alignContent: "center", width: "80%", justifySelf: "center", alignSelf: "center"}}>
                        <Form.Group className="mb-3" controlId="username">
                            <Form.Label>Username: </Form.Label>
                            <Form.Control type="text" placeholder="Enter username" value={username} onChange={(e) => setUsername(e.target.value)} />
                        </Form.Group>

                        <Form.Group className="mb-3" controlId="password">
                            <Form.Label>Password: </Form.Label>
                            <Form.Control type="password" placeholder="Password" value={password} onChange={(e) => setPassword(e.target.value)} />
                        </Form.Group>
                        <Form.Group className="mb-3" controlId="confirmPassword">
                            <Form.Label>Confirm Password: </Form.Label>
                            <Form.Control type="password" placeholder="Password"  value={confirmPassword} onChange={(e) => setconfirmPassword(e.target.value)} />
                        </Form.Group>
                        <Button variant="outline-dark" type="reset" style={{justifySelf: "center", alignSelf: "center", marginTop: "0.5rem"}} onClick={handleClick}>
                            Submit
                        </Button>
                    </Form>
                </Box>
            </Box>
        </div>
    );
}

export default SignUp;