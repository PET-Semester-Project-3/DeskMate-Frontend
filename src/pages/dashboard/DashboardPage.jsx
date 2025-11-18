import * as React from 'react';
import RestrictedPage from '../restricted/RestrictedPage'
import { Typography, Box } from '@mui/material';

/* Controller */
export default function DashboardPageController({ desk }) {

  return (
    <RestrictedPage Page={
      <DashboardPage 
        desk={desk}
      />} 
    />
  )
}

/* View */
export function DashboardPage( desk ) {
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
        Welcome to Dashboard
      </Typography>
      
      {/* Greeting text */}
      <Box 
        component='p' 
        id='dashboard-greeting-text' 
        sx={{
          bgcolor: 'rgba(20, 50, 136, 0.55)',
          borderRadius: 2,
          p: 2,
          borderLeft: '4px solid rgba(20, 150, 255, 0.55)',
          mt: 2,
          mb: 2
          }}
        >
        Welcome to the DeskMate Dashboard! <br/>
        You have been gone for: <i>TBD</i> {/* This should pull last logoff time from the database */}
      </Box>
      
      {/* Desk position */}
      <Box component='article' id='dashboard-desk-position-container'>
        <Typography 
          component='p' 
          id='dashboard-error-list-title' 
          variant='h5'
          sx={{
            fontWeight: 600,
            mt: 3,
            mb: 1,
            color: 'rgba(100, 250, 0, 0.50)'
          }}
          >
            Desk position
          </Typography>
        
        <Box
          component='' 
          id='dashboard-desk-position'
          sx={{
            bgcolor: 'rgba(100, 250, 100, 0.1)',
            borderRadius: 2,
            p: 2,
            borderLeft: '4px solid rgba(100, 250, 0, 0.50)',
            mt: 2,
            mb: 2
          }}
        >
          <Typography component='p' id='dashboard-desk-position-value'>
            
          </Typography>
          
          <i>TBD</i>
        </Box>
      </Box>

      {/* Error list */}
      <Box component='article' id='dashboard-error-list-container'>
        <Typography 
          component='p' 
          id='dashboard-error-list-title' 
          variant='h5'
          sx={{
            fontWeight: 600,
            mt: 3,
            mb: 1,
            color: 'rgba(250, 50, 50, 0.75)'
          }}
          >
            Error list
          </Typography>

        <Box
          component=''
          id='dashboard-error-list-list'
          sx={{
            bgcolor: 'rgba(250, 112, 154, 0.1)',
            borderRadius: 2,
            p: 2,
            borderLeft: '4px solid rgba(250, 10, 0, 0.75)',
            mt: 2,
            mb: 2
          }}
        >
          <i>TBD</i>
          {/* Insert list of errors from desk(s) here */}

        </Box>
      </Box>


      {/* Data visualization */}
      <Box>
        <Typography 
          component='p' 
          id='dashboard-data-visualization-title' 
          variant='h5'
          sx={{
            fontWeight: 600,
            mt: 3,
            mb: 1,
            color: 'rgba(250, 50, 250, 0.55)'
          }}
          >
            Data visualization
          </Typography>

        <Box
          component=''
          id='dashboard-data-visualization-body'
          sx={{
            bgcolor: 'rgba(250, 50, 250, 0.1)',
            borderRadius: 2,
            p: 2,
            borderLeft: '4px solid rgba(250, 50, 250, 0.75)',
            mt: 2,
            mb: 2
          }}
        >
          <i>WIP</i>
        </Box>
      </Box>
      

      <Typography variant='h5' sx={{ color: 'red', fontStyle: 'italic'}}>TODO:</Typography>
      <ul style={{listStyle: 'disc', color: 'red'}}>
        <li>Add desk overview</li>
          <ul>
            <li>Add current desk posistion</li>
            <li>Add data visualization for desk(s)</li>
            <li>Add error warning for assigned desk</li>
          </ul>
      </ul>

    </Box>

  )
}
