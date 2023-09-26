import React from "react";
import Box from '@mui/material/Box';
import ManagerSidenav from '../components/ManagerSidenav';
import ManagerNavbar from '../components/ManagerNavbar';
import PermissionListManager from "../components/Permissionlistmanager";

export default function PermissionList() {
    return (
        <>
    <ManagerNavbar />
    <Box height={70} />
        <Box sx={{ display: 'flex' }}>
            <ManagerSidenav />
            <Box component="main" sx={{ flexGrow: 1, p: 3 }}>
                <PermissionListManager/>       
            </Box>
        </Box>
    </>   
    )
    
}