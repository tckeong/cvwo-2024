import logo from "../resources/logo/logo.jpg";
import { Box, Typography, Link } from "@mui/material";
import Button from 'react-bootstrap/Button';
import Form from 'react-bootstrap/Form';

import "./css/signup.css";

function SignUp() {
    return (
        <div className="signup-page">
            <div style={{gridArea: "logo", display: "flex", flexDirection: "row", justifyContent: "center", alignContent: "center"}}>
                <Link href="/" style={{justifySelf: "center", alignSelf: "center"}}>
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
                            <Form.Control type="text" placeholder="Enter username" />
                        </Form.Group>

                        <Form.Group className="mb-3" controlId="password">
                            <Form.Label>Password: </Form.Label>
                            <Form.Control type="password" placeholder="Password" />
                        </Form.Group>
                        <Form.Group className="mb-3" controlId="confirmPassword">
                            <Form.Label>Confirm Password: </Form.Label>
                            <Form.Control type="password" placeholder="Password" />
                        </Form.Group>
                        <Button variant="outline-dark" type="reset" style={{justifySelf: "center", alignSelf: "center", marginTop: "0.5rem"}}>
                            Submit
                        </Button>
                    </Form>
                </Box>
            </Box>
        </div>
    );
}

export default SignUp;