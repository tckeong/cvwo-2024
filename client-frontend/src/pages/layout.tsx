import { Box, Button } from "@mui/material";
import Header from "../components/layout/header";
import SideBar from "../components/layout/sideBar";
import AddPostButton from "../components/layout/addPostButton";
import { ReactNode } from 'react';
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
            <Link to="/" className="home-btn">
                <Button variant="outlined" startIcon={<HomeIcon />} sx={{alignSelf: "center", justifySelf: "center"}}>
                    Home
                </Button>
            </Link>
            <SideBar />
            <AddPostButton />
            {children}
        </Box>
    );
}

export default Layout;