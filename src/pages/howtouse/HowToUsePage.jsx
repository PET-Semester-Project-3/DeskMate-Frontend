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
        <Box id='howtouse-page' sx={{ boxShadow: 2 }}>
            <Typography
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
                id='howtouse-welcome-container'
                sx={{
                bgcolor: 'rgba(102, 126, 234, 0.1)',
                borderRadius: 2,
                p: 2,
                mb: 3,
                borderLeft: '4px solid #667eea'
                }}
            >
                <Typography id='howtouse-welcome-text' >
                Welcome to your dashboard.  <br/>
                <i>
                    This page is a Work-In-Progress. Elements might/will change base on user priviliges. <br/>
                    Additional elements will also be added later to give a user a quick overview of their desk (or desks, if admin)
                </i>
                </Typography>
            </Box>
    
            <section id='howtouse-introduction-container'>
                <Typography
                    id='howtouse-introduction-header'
                    variant="h5"
                    component="h2"
                    sx={{
                        fontWeight: 600,
                        mt: 3,
                        mb: 1,
                        color: '#4facfe'
                    }}
                >
                Introduction
                </Typography>

                <Box
                    id='howtouse-introduction-text'
                    component="p"
                    sx={{
                        bgcolor: 'rgba(79, 172, 254, 0.1)',
                        borderRadius: 2,
                        p: 2,
                        borderLeft: '4px solid #4facfe'
                    }}
                >
                    On this page you can see an overview of your desk. <br/>
                    In the future this is where you can get a quick overview of the status of your desk. <br/>
                    Your will be able to see what position the desk is in, how long until required maintenance, <br/>
                    and any errors the desk might be reporting.
                </Box>
            </section>
    
            <section id='howtouse-usage-container'>
                <Typography
                    id='howtouse-usage-header'
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
                    id='howtouse-usage-container'
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
                    <ul id='howtouse-usage-link-list-regular' style={{listStyle: 'disc'}}>
                        <li id='howtouse-usage-link-desk-regular' >Desk</li>
                    </ul>
        
                    If you are a admin, you will have access to the taps:
                    <ul id='howtouse-usage-link-list-admin' style={{listStyle: 'disc'}}>
                        <li id='howtouse-usage-link-desk-admin'>Desk</li>
                        <li id='howtouse-usage-link-maintenance-admin'>Maintenance</li>
                        <li id='howtouse-usage-link-database-admin'>Database</li>
                    </ul>
                
                All users have access to the dashboard, where an overview of assigned desk(s) can be seen. <br/>
                </Box>
    
                <Box id='howtouse-desk-container' sx={{ mt: 3 }}>
                    <Typography id='howtouse-desk-header' variant="h6" sx={{ fontWeight: 600, mb: 1, color: '#ec4899' }}>
                        Desk
                    </Typography>
                    <Box
                        id='howtouse-desk-text'
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
    
                <Box id='howtouse-desk-container' sx={{ mt: 3 }}>
                    <Typography id='howtouse-desk-header' variant="h6" sx={{ fontWeight: 600, mb: 1, color: '#8b5cf6' }}>
                        Maintenance
                    </Typography>
                    <Box
                        id='howtouse-desk-text'
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
    
                <Box id='howtouse-database-container' sx={{ mt: 3 }}>
                    <Typography id='howtouse-database-header' variant="h6" sx={{ fontWeight: 600, mb: 1, color: '#10b981' }}>
                        Database
                    </Typography>
                    <Box
                        id='howtouse-database-text'
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
