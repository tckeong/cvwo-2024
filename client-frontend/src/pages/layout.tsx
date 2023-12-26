import { Box, Button } from "@mui/material";
import Header from "../components/header";
import SideBar from "../components/sideBar";
import AddPosts from "../components/addPosts";
import React, { ReactNode } from 'react';
import HomeIcon from '@mui/icons-material/Home';

import "./css/style.css"
import { Link } from "react-router-dom";

interface Props {
    children: ReactNode;
}

function Layout(props: Props) {
    const { children } = props;
    
    return (
        <Box className="main-layout">
            <Header />
            <div className="home-btn">
            <Link to="/">
                <Button variant="outlined" startIcon={<HomeIcon />}>
                    Home
                </Button>
            </Link>
            </div>
            <div  className="topic" style={{padding: "0px", margin: "0px", borderBottom: "0.05rem solid #000000", borderRight: "0.05rem solid #000000"}}>
            <h4 style={{margin: '0px', padding: '0px', alignSelf: "center", justifySelf: "center"}}>Topics</h4>
            </div>
            <SideBar />
            <AddPosts />
            {children}
        </Box>
    );
}

export default Layout;