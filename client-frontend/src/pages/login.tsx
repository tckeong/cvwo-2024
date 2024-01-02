import logo from "../resources/logo/logo.jpg";
import { Box, Typography, Link } from "@mui/material";
import Button from 'react-bootstrap/Button';
import Form from 'react-bootstrap/Form';
import API_URL from "../api/apiConfig";
import Cookies from "js-cookie";

import "./css/login.css";
import { useState } from "react";
import { useNavigate } from "react-router-dom";

function Login() {
    const [username, setUsername] = useState("");
    const [password, setPassword] = useState("");

    const navigate = useNavigate();

    const handleCLick = () => {
        fetch(`${API_URL}login`, {
            method: "POST",
            headers: {
              "Content-Type": "application/json",
            },
            body: JSON.stringify({
              username: username,
              password: password
            })
          }).then((res) => {
            // Check if the response is successful
            if (res.ok) {
              // Parse the JSON response
              res.json().then(data => {
                // Display a success message
                alert(data.message);
          
                // Set cookies using the response data
                Cookies.set("Authorization", data.value.token, { expires: 1 });
                Cookies.set("username", data.value.username, { expires: 1 });
                Cookies.set("userId", data.value.id, { expires: 1 });
          
                // Navigate to the home page
                navigate("/");
              });
            } else {
              // If the response is not successful, handle the error
              res.json().then(data => {
                alert(data.message);
              });
            }
          }).catch((err) => {
            // Display an error message if there's an error
            alert(err);
          });
          
    };

    return (
        <div className="login-page">
            <div style={{gridArea: "logo", display: "flex", flexDirection: "row", justifyContent: "center", alignContent: "center"}}>
                <Link href="/" style={{justifySelf: "center", alignSelf: "center"}}>
                    <img src={logo} alt="logo" id="logoImg"/>
                </Link>
                <h4 id="logoTopic">Web Forum</h4>
            </div>
            <Box className="login-page-content">
                <Typography variant="h4" style={{textAlign: "center", color: "#ffffff", margin: "1rem"}}>Login</Typography>
                <Box style={{display: "flex", flexDirection: "column", justifyContent: "center", alignContent: "center", margin: "1rem"}}>
                    <Form 
                        style={{display: "flex", flexDirection: "column", justifyContent: "center", alignContent: "center", width: "80%", justifySelf: "center", alignSelf: "center"}}>
                        <Form.Group className="mb-3" controlId="username">
                            <Form.Label>Username: </Form.Label>
                            <Form.Control type="text" placeholder="Enter username" value={username} onChange={(e) => setUsername(e.target.value)}/>
                        </Form.Group>

                        <Form.Group className="mb-3" controlId="password">
                            <Form.Label>Password: </Form.Label>
                            <Form.Control type="password" placeholder="Password" value={password} onChange={(e) => setPassword(e.target.value)}/>
                        </Form.Group>
                        <Button variant="outline-light" type="reset" style={{justifySelf: "center", alignSelf: "center", marginTop: "0.5rem"}} onClick={handleCLick}>
                            Submit
                        </Button>
                    </Form>
                    <Link href="/signup" underline="hover" color="white" sx={{justifySelf: "center", alignSelf: "center", marginTop: "0.5rem", fontSize: "0.8rem"}}>
                        Don't have an account? Sign up here!
                    </Link>
                </Box>
            </Box>
        </div>
    );
}

export default Login;