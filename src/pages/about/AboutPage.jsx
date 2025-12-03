import * as React from 'react';
import { Typography, Box } from '@mui/material';

/* Controller */
export default function AboutPageController() {
    return (
        <AboutPage/>
    )
}

/* View */
export function AboutPage() {
    return (
        <Box component='main' id='about-page' sx={{ boxShadow: 2}}>

            <Typography
                component='h4'
                id='about-page-header'
                variant='h4'
                sx={{
                    fontWeight: 700,
                    mb: 2,
                    color: '#667eea'
                }}>
                About DeskMate
            </Typography>

            <Box
                component='section'
                id='about-page-text-container'
                sx={{
                    bgcolor: 'rgba(102, 126, 234, 0.1)',
                    borderRadius: 2,
                    p: 2,
                    mb: 3,
                    borderLeft: '4px solid #667eea'
                }}
            >
                <Typography component='p' id='about-page-text' sx={{ maxWidth: 1280 }}>
                    DeskMate is an application for companies to easily maintaine and schedule the height of a large number of desks at once and was<br/>      
                    developed to facilitate an easy and convienient way for employees to manage their desk in an office enviroment over a wireless connection. <br/>

                    <br/>

                    DeskMate was developed by a group of Software Engineering student from the University of Southen Denmark, as part of a semester project: <br/>
                    
                    <ul>
                        <li>Patrick G. Schemel</li>
                        <li>Asbjørn E. Rom</li>
                        <li>Miroslav Andrejcak</li>
                        <li>Rafał Kamil Fuchs</li>
                        <li>Victor Petrica</li>
                        <li>Maksym Andrzej Drzyzgiewicz</li>
                    </ul>

                    The project was to develop a webapplication that could connect to a desk over wifi using a provided API. 
                    The application should be able to control the height of the desk, and incoperate a Raspberry Pi Pico W as an embedded system.
                    Further more, a database was to be used for storing the desk information and the information should be able to be 
                    created, read, updated and deleted (CRUD operations) as necessary.<br/>
                    
                    <br/>
                    
                    Within the group, it was decided to combine the semester project with the exam project for the course Web Technologies. <br/>
                    However, that semester group was not the same in the Web Technologies course and therefore has a different group composition: <br/>
                    
                    <ul>
                        <li>Patrick G. Schemel</li>
                        <li>Asbjørn E. Rom</li>
                        <li>Miroslav Andrejcak</li>
                        <li>Victor Petrica</li>
                        <li>Maksym Andrzej Drzyzgiewicz</li>
                    </ul>

                </Typography>
            </Box>

        </Box>
    )
}