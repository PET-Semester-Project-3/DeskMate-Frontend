import * as React from 'react';
import RestrictedPage from '../restricted/RestrictedPage'
import { Typography, Box } from '@mui/material';

/* Controller */
export default function DashboardPageController() {
  return (
    <RestrictedPage Page={<DashboardPage/>} />
  )
}

/* View */
export function DashboardPage() {
  return (
    <Box id='dashboard-page' sx={{ boxShadow: 2 }}>
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
        

    <Typography variant='h5' sx={{ color: 'red', fontStyle: 'italic'}}>TODO:</Typography>
    <ul style={{listStyle: 'disc', color: 'red'}}>
      <li>Add desk overview</li>
        <ul>
          <li>Greeting / Welcome back message</li>
          <li>Desk posistion</li>
          <li>Add desk analytics</li>
          <li>Add error warning for assigned desk</li>
        </ul>
    </ul>

    </Box>

  )
}
