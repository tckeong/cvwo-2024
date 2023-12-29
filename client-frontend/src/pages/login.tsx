import logo from "../resources/logo/logo.jpg";
import { Box, Typography, Link } from "@mui/material";
import Button from 'react-bootstrap/Button';
import Form from 'react-bootstrap/Form';

import "./css/login.css";

function Login() {
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
                            <Form.Control type="text" placeholder="Enter username" />
                        </Form.Group>

                        <Form.Group className="mb-3" controlId="password">
                            <Form.Label>Password: </Form.Label>
                            <Form.Control type="password" placeholder="Password" />
                        </Form.Group>
                        <Button variant="outline-light" type="reset" style={{justifySelf: "center", alignSelf: "center", marginTop: "0.5rem"}}>
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