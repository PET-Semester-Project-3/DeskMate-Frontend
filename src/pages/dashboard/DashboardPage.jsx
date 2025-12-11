import * as React from 'react';
import { Typography, Box, CircularProgress } from '@mui/material';
import WarningIcon from '@mui/icons-material/Warning';
import { asyncGetUserDesks } from '../../models/api-comm/APIUsers';
import useSession from '../../models/SessionContext';
import dayjs from 'dayjs';
import { useSnackbar } from 'notistack';


/* Controller */
export default function DashboardPageController() {

  const { enqueueSnackbar } = useSnackbar();

  const [waitingForResponse, setWaitingForResponse] = React.useState(false);

  const [desks, setDesks] = React.useState([]);
  const { session } = useSession();

  React.useEffect(() => {
    async function getDesks(id) {
      setWaitingForResponse(true);
      const desks = await asyncGetUserDesks(id);
      if (desks.length)
        setDesks(desks);
      else
        enqueueSnackbar(`Failed to retrieve data`, { variant: 'error' });
      setWaitingForResponse(false);
    }
    getDesks(session?.user?.id);
  }, []);

  return (
    <DashboardPage 
      desks={desks} 
      session={session}
      waitingForResponse={waitingForResponse}
    />
  )
}

/* View */
export function DashboardPage({ desks, session, waitingForResponse }) {
  return (
    <Box id='dashboard-page' sx={{ width: '100%' }}>
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
            bgcolor: 'rgba(102, 126, 234, 0.1)',
            borderRadius: 2,
            p: 2,
            mb: 3,
            borderLeft: '4px solid #667eea'
          }}
        >
        Hello {String(session?.user?.email).split('@')[0]} <br/> {/* Will say: Hello admin */}
        {/*Hello {session?.user?.email} <br/> */}                {/* Will say: Hello admin@deskmate.com */}
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
          </Typography>

          <Box
          id='dashboard-desk-position-flex-box' 
          sx={{
            display: 'flex',
            flexWrap: 'wrap',
            flexDirection: 'row',
            gap: 3
          }}>
            {
              !waitingForResponse ? (
                desks.map(desk => (
                  <Box 
                    component=''
                    id={'dashboard-desk-position-value-' + desk.id}
                    sx={{
                      bgcolor: 'rgba(100, 200, 100, 0.2)',
                      borderLeft: '4px solid rgba(100, 250, 0, 0.50)',
                      borderRadius: 2,
                      width: 250,
                      p: 2,
                      mt: 2,
                      mb: 2
                    }}
                  >
                    {desk.name} <br/>
                    Current height: {desk.last_data.height} cm
                  </Box>
                ))
              ) : (
                <CircularProgress />
              )
            }
          </Box>
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
          }}
          >

            <Typography
            component='p'
            id='dashboard-error-list-message'
            >
              Detected Errors for desks assigned to {session?.user?.email} <br/>
            </Typography>

            <Box
            id='dashboard-error-list-flex-box'
            sx={{
              display: 'flex',
              flexWrap: 'wrap',
              flexDirection: 'row',
              gap: 3
            }}>
              {
                !waitingForResponse ? (
                  (desks.length > 0) ? (
                    desks.map(desk => (

                      desk.last_data.errors ? (
                        <Box
                        component=''
                        id={'dashboard-error-list-' + desk.id}
                        sx={{
                          bgcolor: 'rgba(250, 10, 10, 0.2)',
                          borderLeft: '4px solid rgba(250, 50, 50, 0.75)',
                          borderRadius: 2,
                          width: 250,
                          p: 2,
                          mt: 2,
                          mb: 2
                        }}
                        >
                          {desk.name} <br/>
                          {desk.last_data.errors.map(error =>(
                            
                            <Typography
                            component='p'
                            id={'dashboard-error-list-' + desk.id + error}
                            color='warning'
                            >
                              <WarningIcon id='dasboard-error-list-warning-icon'/>
                              {error} <br/>
                            </Typography>

                          ))}
                        </Box>
                      ) : (
                        <Box
                        component=''
                        id={'dashboard-error-list-' + desk.id}
                        sx={{
                          bgcolor: 'rgba(250, 10, 10, 0.2)',
                          borderLeft: '4px solid rgba(250, 50, 50, 0.75)',
                          borderRadius: 2,
                          width: 250,
                          p: 2,
                          mt: 2,
                          mb: 2
                        }}
                        >
                          {desk.name}

                          <Typography
                          component='p'
                          id='dashboard-error-list-no-errors'
                          sx={{
                            color: 'rgba(0, 250, 0, 0.5)'
                          }}
                          >
                            No errors was detected.<br/>
                          </Typography>
                        </Box>
                      )
                      
                    ))
                  ) : (
                    <Typography
                    component='p'
                    id='dashboard-error-list-no-desks'
                    sx={{
                      color: 'rgba(250, 0, 0, 1)'
                    }}
                    >
                      No desks has been detected. Please contact an administrator for help.
                    </Typography>
                  )
                ) : (
                  <CircularProgress />
                )
              }
            </Box>

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

    </Box>

  )
}
