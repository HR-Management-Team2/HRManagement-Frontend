import React from "react";
import Sidenav from "../components/Sidenav";
import Box from '@mui/material/Box';
import Navbar from "../components/Navbar";


export default function ManagerRegister(){
    return(
    <>
    <Navbar />
    <Box height={70} />
        <Box sx={{ display: 'flex' }}>
            <Sidenav />
            <Box component="main" sx={{ flexGrow: 1, p: 3 }}>  
            <h1>ManagerList Damla için deneyeyim</h1>   
            </Box>
        </Box>
    </>   
    );
}