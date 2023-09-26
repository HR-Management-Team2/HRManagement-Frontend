import React from "react";
import Box from '@mui/material/Box';
import ManagerSidenav from '../components/ManagerSidenav';
import ManagerNavbar from '../components/ManagerNavbar';
import AdvanceListManager from "../components/Advancelistmanager";

export default function AdvanceList() {
    return (
    <>
    <ManagerNavbar />
    <Box height={70} />
        <Box sx={{ display: 'flex' }}>
            <ManagerSidenav />
            <Box component="main" sx={{ flexGrow: 1, p: 3 }}>
                <AdvanceListManager/>       
            </Box>
        </Box>
    </>   
    )
}