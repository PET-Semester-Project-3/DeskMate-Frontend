import * as React from 'react';
import { Typography, Box } from '@mui/material';

/* Controller */
export default function HowToUsePageController() {
    return (
        <HowToUsePage/>
    )
}

/* View */
export function HowToUsePage() {
    return (
        <Box component='main' id='howtouse-page' sx={{ boxShadow: 2 }}>
            <Typography
                component='h4'
                id='howtouse-page-header'
                variant="h4"
                sx={{
                fontWeight: 700,
                mb: 2,
                color: '#667eea'
                }}
            >
                Welcome to DeskMate
            </Typography>
            <Box
                component='section'
                id='howtouse-welcome-container'
                sx={{
                bgcolor: 'rgba(102, 126, 234, 0.1)',
                borderRadius: 2,
                p: 2,
                mb: 3,
                borderLeft: '4px solid #667eea'
                }}
            >
                <Typography component='p' id='howtouse-welcome-text' >
                    Welcome to your DeskMate.  <br/>
                    This page will explain how to use DeskMate, and give a short explanation of the different pages available. <br/>
                    Be aware that not all pages described here might be accessible to you.
                </Typography>
            </Box>
    
            <Box component='article' id='howtouse-usage-container'>
                <Typography
                    component="h5"
                    id='howtouse-usage-header'
                    variant="h5"
                    sx={{
                        fontWeight: 600,
                        mt: 3,
                        mb: 1,
                        color: '#fa709a'
                    }}
                >
                    Usage
                </Typography>
                <Box
                    component="p"
                    id='howtouse-usage-text'
                    sx={{
                        bgcolor: 'rgba(250, 112, 154, 0.1)',
                        borderRadius: 2,
                        p: 2,
                        borderLeft: '4px solid #fa709a'
                    }}
                >
                    This webapp is easy to use, and easy to begin using. <br/>
                    Just click any of the taps on the top to navigate to a desired page. <br/>
                    Alternatively, the links in the footer at the bottom of the page can be used. <br/>
        
                    <br/>
                    The pages that you will have access to, and can navigate to, will be dependent on what your permission level is.
                    <br/>
                    If you are a regular user, you will have access to the following pages:
                    <ul id='howtouse-usage-link-list-regular' style={{listStyle: 'disc'}}>
                        <li id='howtouse-usage-link-desk-regular' >Desk</li>
                    </ul>
        
                    If you are a admin, you will have access to the following pages:
                    <ul id='howtouse-usage-link-list-admin' style={{listStyle: 'disc'}}>
                        <li id='howtouse-usage-link-desk-admin'>Desk</li>
                        <li id='howtouse-usage-link-maintenance-admin'>Maintenance</li>
                        <li id='howtouse-usage-link-database-admin'>Database</li>
                    </ul>
                    
                    All users have access to: <br/>
                    <ul>
                        <li>The dashboard, where an overview of assigned desk(s) can be seen. </li>
                        <li>This page, describing how to use the app. </li>
                        <li>The about page, describing what the purpose of this web app is.</li>
                    </ul>
                </Box>
            </Box>
    
            <Box component='article' id='howtouse-desk-container' sx={{ mt: 3 }}>
                <Typography component='h6' id='howtouse-desk-header' variant="h6" sx={{ fontWeight: 600, mb: 1, color: '#ec4899' }}>
                    Desk
                </Typography>
                <Box
                    component="p"
                    id='howtouse-desk-text'
                    sx={{
                        bgcolor: 'rgba(236, 72, 153, 0.1)',
                        borderRadius: 2,
                        p: 2,
                        borderLeft: '4px solid #ec4899'
                    }}
                >
                    On this page you will be able to see and control your own desk. <br/>
                    You will be able to see general information about the desk, like what its position is, what is called, etc. <br/>
                    On this page you will also be able to give commands to the desk, like to move it up or down.
                </Box>
            </Box>
    
            <Box component='article' id='howtouse-desk-container' sx={{ mt: 3 }}>
                <Typography component='h6' id='howtouse-desk-header' variant="h6" sx={{ fontWeight: 600, mb: 1, color: '#8b5cf6' }}>
                    Maintenance
                </Typography>
                <Box
                    component="p"
                    id='howtouse-desk-text'
                    sx={{
                        bgcolor: 'rgba(139, 92, 246, 0.1)',
                        borderRadius: 2,
                        p: 2,
                        borderLeft: '4px solid #8b5cf6'
                    }}
                >
                    On this page multiple desks will be shown. <br/>
                    This page will show every desk that is being administratet, and will show more information about the individual desk. <br/>
                    This info includes the manufacture, the current position, how many times it has been activated, etc.
                    If a desk is reporting an error, this is where the details of said error will be shown.
                </Box>
            </Box>
    
            <Box component='article' id='howtouse-database-container' sx={{ mt: 3 }}>
                <Typography component='h6' id='howtouse-database-header' variant="h6" sx={{ fontWeight: 600, mb: 1, color: '#10b981' }}>
                    Database
                </Typography>
                <Box
                    component="p"
                    id='howtouse-database-text'
                    sx={{
                        bgcolor: 'rgba(16, 185, 129, 0.1)',
                        borderRadius: 2,
                        p: 2,
                        borderLeft: '4px solid #10b981'
                    }}
                >
                    On this page data from the database can be accessed. <br/>
                    New desks and users can be added and deleted, permissions for users can be updated <br/>
                    and the relation between users, desks and permissions can be modified. <br/>
                </Box>
            </Box>
        </Box>
    )
}
