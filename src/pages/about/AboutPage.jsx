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
        <Box sx={{ boxShadow: 2}}>

            <Typography
                variant='h4'
                sx={{
                    fontWeight: 700,
                    mb: 2,
                    color: '#667eea'
                }}>
            About Deskmate
            </Typography>

            <Box
                sx={{
                    bgcolor: 'rgba(102, 126, 234, 0.1)',
                    borderRadius: 2,
                    p: 2,
                    mb: 3,
                    borderLeft: '4px solid #667eea'
                }}
            >
                <Typography sx={{ maxWidth: 1280}}>
                    This application was developed to facilitate and easy and convienient way to manage a desk in an office enviroment. <br/>
                </Typography>
            </Box>




        </Box>
    )
}