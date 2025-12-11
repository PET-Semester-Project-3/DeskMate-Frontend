import * as React from 'react';
import { Typography, Box, List } from '@mui/material';
import { useNavigate } from 'react-router';


/* Controller */
export default function HowToUsePageController() {

    const navigate = useNavigate();

    return (
        <HowToUsePage navigate={navigate}/>
    )
}

/* View */
export function HowToUsePage({ navigate }) {
    return (
        <Box component='main' id='howtouse-page' sx={{ width: '100%' }}>
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
                    bgcolor: '#667eea23',
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
                        bgcolor: '#fa709a23',
                        borderRadius: 2,
                        p: 2,
                        borderLeft: '4px solid #fa709a'
                    }}
                >
                    This web app is easy to use, and easy to begin using. <br/>
                    Just click any of the tabs on the top to navigate to a desired page. <br/>
                    Alternatively, the links in the footer at the bottom of the page can be used. <br/>
        
                    <br/>
                    The pages that you will have access to, and can navigate to, will be dependent on what your permission level are:
                    <br/>

                    The following is accessable for all users.
                    <ul id='howtouse-usage-link-list-user' style={{listStyle: 'disc'}} >
                        <li id='howtouse-usage-link-dashboard-user' onClick={() => navigate('/')}><b>Dashboard:</b> Seeing overview data (about you and your desks).</li>
                        <li id='howtouse-usage-link-howtouse-user' onClick={() => navigate('/howtouse')}><b>HowToUse:</b> Descriping how to use the app.</li>
                        <li id='howtouse-usage-link-about-user' onClick={() => navigate('/about')}><b>About:</b> See purpose of the web app.</li>
                        <li id='howtouse-usage-link-profile-user' onClick={() => navigate('/profile')}><b>Profile:</b> See profile data, Change email and/or password.</li>
                        <li id='howtouse-usage-link-deskmate-user' onClick={() => navigate('/deskmate')}><b>Deskmate:</b> See and create a Deskmate, Daily standup, Leaderboard.</li>
                    </ul>
                    The following pages are restricted via permissions:
                    <ul id='howtouse-usage-link-list-admin' style={{listStyle: 'disc'}} >
                        <li id='howtouse-usage-link-desk-admin' onClick={() => navigate('/desk')}><b>Desk</b> See Desks and change names, heights, and online status.</li>
                        <li id='howtouse-usage-link-maintenance-admin' onClick={() => navigate('/maintenance')}><b>Maintenance</b> See desks and their data. (Users with Management or Database permissions see all desks on this page)</li>
                        <li id='howtouse-usage-link-maintenance-admin' onClick={() => navigate('/management')}><b>Management</b> See users, adjust permissions and desks on users. (Users with Database permissions have higher permissions on this page)</li>
                        <li id='howtouse-usage-link-database-admin' onClick={() => navigate('/database')}><b>Database</b> Create, read, update, and delete data from or in the Database.</li>
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
                        bgcolor: '#ec489a23',
                        borderRadius: 2,
                        p: 2,
                        borderLeft: '4px solid #ec4899'
                    }}
                >
                    On this page you will be able to see and control your own desk(s). <br/>
                    You will be able to see general information about the desk, like what its position is, what is called, etc. <br/>
                    On this page you will also be able to give commands to the desk, like to move it up or down. <br/>
                    You can set a main desk via the star icon.
                </Box>
            </Box>
    
            <Box component='article' id='howtouse-maintenance-container' sx={{ mt: 3 }}>
                <Typography component='h6' id='howtouse-maintenance-header' variant="h6" sx={{ fontWeight: 600, mb: 1, color: '#8b5cf6' }}>
                    Maintenance
                </Typography>
                <Box
                    component="p"
                    id='howtouse-maintenance-text'
                    sx={{
                        bgcolor: '#8a5cf623',
                        borderRadius: 2,
                        p: 2,
                        borderLeft: '4px solid #8b5cf6'
                    }}
                >
                    On this page multiple users will be shown. <br/>
                    This page will show every user and clicking on them will open the adjust permissions and desk access popup. <br/>
                    It is also possible to delete and create users on this page.
                    <b>Without Database Permission: </b> Have access to adjust all their own desks and permissions and <b>cannot</b> adjust their own permissions.<br/>
                    <b>With Database Permission: </b> Have access to adjust all desks and permissions and can also adjust their own permissions.<br/>
                </Box>
            </Box>
    
            <Box component='article' id='howtouse-management-container' sx={{ mt: 3 }}>
                <Typography component='h6' id='howtouse-management-header' variant="h6" sx={{ fontWeight: 600, mb: 1, color: '#5ccaf6ff' }}>
                    Management
                </Typography>
                <Box
                    component="p"
                    id='howtouse-management-text'
                    sx={{
                        bgcolor: '#5ccaf623',
                        borderRadius: 2,
                        p: 2,
                        borderLeft: '4px solid #5ccaf6ff'
                    }}
                >
                    On this page multiple desks will be shown. <br/>
                    This page will show every desk that is being administratet, and will show more information about the individual desk. <br/>
                    This info includes the manufacture, the current position, how many times it has been activated, etc. <br/>
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
                    Access to create, read, update, and delete data raw directly into and from the database.
                </Box>
            </Box>
        </Box>
    )
}
