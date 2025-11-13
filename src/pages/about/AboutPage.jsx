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
                About Deskmate
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
                <Typography component='p' id='about-page-text' sx={{ maxWidth: 1280}}>
                    This application was developed to facilitate and easy and convienient way to manage a desk. <br/>
                </Typography>
            </Box>




        </Box>
    )
}