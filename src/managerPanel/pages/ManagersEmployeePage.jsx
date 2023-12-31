import React from "react";
import Box from '@mui/material/Box';
import ManagerSidenav from '../components/ManagerSidenav';
import ManagerNavbar from '../components/ManagerNavbar';

export default function ManagersEmployeePage(){
    return (
        <>
        <ManagerNavbar />
        <Box height={30} />
            <Box sx={{ display: 'flex' }}>
                <ManagerSidenav />
                <Box component="main" sx={{ flexGrow: 1, p: 3 }}>
                    <h1> Manager'ın profil sayfası</h1>    
                </Box>
            </Box>
        </>   
    )
}