import * as React from 'react';
import RestrictedPage from '../restricted/RestrictedPage'
import { Typography, Box, Stack } from '@mui/material';
import { asyncGetUserDesks } from '../../models/api-comm/APIUsers';
import useSession from '../../models/SessionContext';
import dayjs from 'dayjs';

/* Controller */
export default function DashboardPageController() {

  const [waitingForResponse, setWaitingForResponse] = React.useState(false);

  const [desks, setDesks] = React.useState([]);
  const { session } = useSession();

  React.useEffect(() => {
    async function getDesks(id) {
      setWaitingForResponse(true);
      const desks = await asyncGetUserDesks(id);
      setDesks(desks);
      setWaitingForResponse(false);
    }
    getDesks(session?.user?.id);
  }, []);

  return (<RestrictedPage Page={<DashboardPage desks={desks} session={session} />} />)

}

/* View */
export function DashboardPage({ desks, session }) {
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
        {/*Hello {String(session?.user?.email).replace('@deskmate.com', '')} <br/>*/} {/* Will say: Hello admin */}
        Hello {session?.user?.email} <br/>                                            {/* Will say: Hello admin@deskmate.com */}
        Welcome to the DeskMate Dashboard! <br/>
        <br/>
        Your account was created on: {dayjs(session?.user?.created_at).format('DD-MM-YYYY')} <br/>
        Your account last had updates on: {dayjs(session?.user?.updated_at).format('DD-MM-YYYY')} <br/>
      </Box>
      
      {/* Desk position */}
      <Box component='article' id='dashboard-desk-position-container'>
        <Typography 
          component='p' 
          id='dashboard-desk-position-title' 
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
            bgcolor: 'rgba(100, 250, 200, 0.1)',
            borderRadius: 2,
            p: 2,
            borderLeft: '4px solid rgba(100, 250, 0, 0.50)',
            mt: 2,
            mb: 2
          }}
        >
          <Typography component='p' id='dashboard-desk-position-value'>

            The current position of desks assigned to {session?.user?.email}
            
            {desks.map(desk => (
              <Box 
                component=''
                id={'dashboard-desk-position-value-' + desk.id}
                sx={{
                  bgcolor: 'rgba(100, 200, 100, 0.2)',
                  borderLeft: '4px solid rgba(100, 250, 0, 0.50)',
                  borderRadius: 2,
                  p: 2,
                  mt: 2,
                  mb: 2
                }}
              >
                {desk.name} <br/>
                Current height: {desk.height} cm
              </Box>
            ))}
          </Typography>
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
            bgcolor: 'rgba(250, 100, 100, 0.1)',
            borderRadius: 2,
            p: 2,
            borderLeft: '4px solid rgba(250, 0, 0, 0.75)',
            mt: 2,
            mb: 2
          }}>

          Detected Errors for desks assigned to {session?.user?.email}
          
          { /* Insert check if there is a errors or not */
          desks.map(desk =>(
            <Box
              component=''
              id={'dashboard-error-list-' + desk.id}
              sx={{
                bgcolor: 'rgba(250, 10, 10, 0.2)',
                borderLeft: '4px solid rgba(250, 50, 50, 0.75)',
                borderRadius: 2,
                p: 2,
                mt: 2,
                mb: 2
              }}
            >
              {desk.name} <br/>
              {desk.last_data} {/* Might need to map errors into a list for showing */}
            </Box>
          ))}

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
          <i>Will be implemented as part of an individual extension to the project.</i>
          {/* Insert graphs and other data visualization here */}

        </Box>
      </Box>
      

      <Typography variant='h5' sx={{ color: 'red', fontStyle: 'italic'}}>TODO:</Typography>
      <ul style={{listStyle: 'disc', color: 'red'}}>
        <li>Add desk overview</li>
          <ul>
            <li>Add error warning for assigned desk</li>
          </ul>
      </ul>

    </Box>

  )
}
