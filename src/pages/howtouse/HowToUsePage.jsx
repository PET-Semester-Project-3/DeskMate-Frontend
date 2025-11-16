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
        <Box title="" sx={{ boxShadow: 2 }}>
            <Typography
                variant="h4"
                sx={{
                fontWeight: 700,
                mb: 2,
                color: '#667eea'
                }}
            >
                Welcome to DeskMate
            </Typography>
    
            <section>
                <Typography
                    variant="h5"
                    component="h2"
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
                sx={{
                    bgcolor: 'rgba(250, 112, 154, 0.1)',
                    borderRadius: 2,
                    p: 2,
                    borderLeft: '4px solid #fa709a'
                }}
                >
                This webapp is easy to use, and easy to begin using. <br/>
                Just click any of the taps on the top to navigate to a desired page. <br/>
                Alternatively, the links in the footer at the bottom of the page can be used.
    
                <br/>
                The pages that you will have access to, and can navigate to, will be dependent on what you have access to.
                <br/>
                If you are a regular user, you will have access to the taps:
                <ul style={{listStyle: 'disc'}}>
                    <li>Desk</li>
                </ul>
    
                If you are a admin, you will have access to the taps:
                <ul style={{listStyle: 'disc'}}>
                    <li>Desk</li>
                    <li>Maintenance</li>
                    <li>Database</li>
                </ul>
                
                All users have access to the dashboard, where an overview of assigned desk(s) can be seen. <br/>
    
                </Box>
    
                <Box sx={{ mt: 3 }}>
                <Typography variant="h6" sx={{ fontWeight: 600, mb: 1, color: '#ec4899' }}>
                    Desk
                </Typography>
                <Box
                    component="p"
                    sx={{
                    bgcolor: 'rgba(236, 72, 153, 0.1)',
                    borderRadius: 2,
                    p: 2,
                    borderLeft: '4px solid #ec4899'
                    }}
                >
                    On this page you will be able to see and control your own desk. <br/>
                    You will be able to see general information about the desk, like what its position is, what is called, etc. <br/>
                    On this page you will also be able to give commands to the desk, like to move up or down.
                </Box>
                </Box>
    
                <Box sx={{ mt: 3 }}>
                <Typography variant="h6" sx={{ fontWeight: 600, mb: 1, color: '#8b5cf6' }}>
                    Maintenance
                </Typography>
                <Box
                    component="p"
                    sx={{
                    bgcolor: 'rgba(139, 92, 246, 0.1)',
                    borderRadius: 2,
                    p: 2,
                    borderLeft: '4px solid #8b5cf6'
                    }}
                >
                    On this page multiple desks <i>(WIP)</i> will be shown. <br/>
                    This page will show every desk that is being administratet, and will show more information about the individual desk. <br/>
                    This info includes the manufacture, the current position, how many times it has been activated, etc.
                    If a desk is reporting an error, this is where it will be shown.
                </Box>
                </Box>
    
                <Box sx={{ mt: 3 }}>
                <Typography variant="h6" sx={{ fontWeight: 600, mb: 1, color: '#10b981' }}>
                    Database
                </Typography>
                <Box
                    component="p"
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
                    This is where CRUD (Create, Read, Update, Delete) will be implemented and utilized.
                </Box>
                </Box>
            </section>
        </Box>
    )
}
