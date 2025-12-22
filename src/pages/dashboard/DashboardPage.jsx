import * as React from 'react';
import RestrictedPage from '../restricted/RestrictedPage'
import { Typography, Box, Card, CircularProgress } from '@mui/material';
import { BarChart, Gauge, gaugeClasses } from '@mui/x-charts';
import WarningIcon from '@mui/icons-material/Warning';
import dayjs from 'dayjs';
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

  const total_counter = [0, 0];

  desks.map(desk => (
    total_counter[0] += desk.last_data.activationCounter,
    total_counter[1] += desk.last_data.sitStandCounter
  ));

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
      total={total_counter}
      waitingForResponse={waitingForResponse}
    />
  )
}

/* View */
export function DashboardPage({ desks, session, total, waitingForResponse }) {
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
      <Card 
        component='p' 
        id='dashboard-greeting-text' 
        sx={{
            bgcolor: 'primary',
            borderRadius: 2,
            maxWidth: 400,
            p: 2,
            mb: 3,
          }}
        >
        Hello <b>{String(session?.user?.email).split('@')[0]}</b> <br/> {/* Will say: Hello admin */}
        {/*Hello {session?.user?.email} <br/> */}                {/* Will say: Hello admin@deskmate.com */}
        Welcome to the DeskMate Dashboard! <br/>
        <br/>
        Your account was created on: {dayjs(session?.user?.created_at).format('DD-MM-YYYY')} <br/>
        Your account last had updates on: {dayjs(session?.user?.updated_at).format('DD-MM-YYYY')} <br/>
      </Card>
      
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
            bgcolor: 'primary',
            borderRadius: 2,
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
                  <Card 
                    component=''
                    id={'dashboard-desk-position-value-' + desk.id}
                    sx={{
                      bgcolor: 'primary',
                      borderRadius: 2,
                      width: 250,
                      p: 2,
                      mt: 2,
                      mb: 2
                    }}
                  >
                    {desk.name} <br/>
                    Current height: {desk.last_data.height} cm
                  </Card>
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
            bgcolor: 'primary',
            borderRadius: 2,
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
                        <Card
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
                        </Card>
                      ) : (
                        <Card
                        component=''
                        id={'dashboard-error-list-' + desk.id}
                        sx={{
                          bgcolor: 'primary'
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
                        </Card>
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
            bgcolor: 'primary',
            borderRadius: 2,
            mt: 2,
            mb: 2
          }}
        >

          {/* Insert graphs and other data visualization here */}
          <Typography
            component='p'
            variant='h6'
          >
            Individual Activation counter
          </Typography>
          <Box
            id='dashboard-data-visualization-desks-flex-box'
            sx={{
              display: 'flex',
              flexWrap: 'wrap',
              flexDirection: 'row',
              gap: 3
            }}
          >
          
            {desks.map(desk => (
              <Card
              component=''
              id='dashboard-data-visualization-activation-bar'
              sx={{
                bgcolor: 'primary',
                width: 250,
                mt: 1,
                mb: 1,
                boxShadow: 2,
                
              }}>

                <Typography
                  id={'dashboard-data-visualization-graph-total-activation-title-' + desk.id}
                  textAlign={'center'}
                >
                  {desk.name} <br/> 
                </Typography>
                <BarChart
                  id={'dashboard-data-visualization-graph-bar-' + desk.id}
                  xAxis={[{
                    barGapRatio: 0,
                    data: [desk.name],
                  }]}
                  yAxis={[{
                    tickMinStep: 5,
                    min: 1,
                    max: [desk.last_data.activationCounter + 5],
                  }]}
                  series={
                    [
                      {label:'Activation', 
                        barLabel: 'value',
                        barLabelPlacement: 'outside', 
                        color: 'rgba(0, 150, 250, 0.5)', 
                        data: [desk.last_data.activationCounter]
                      },

                      {label: 'Sit/Stand', 
                        barLabel: 'value',
                        barLabelPlacement: 'outside',  
                        color: 'rgba(10, 200, 0, 0.5)', 
                        data: [desk.last_data.sitStandCounter]
                      }
                    ]}
                  height={300}
                  sx={{
                    width: 250
                  }}
                />

                <Gauge
                  id={'dashboard-data-visualization-graph-gauge-' + desk.id}
                  width={250} 
                  height={100} 
                  value={desk.last_data.sitStandCounter}
                  valueMax={desk.last_data.activationCounter}
                  startAngle={-90} 
                  endAngle={90}
                  text={({ value, valueMax }) => `${value} / ${valueMax}`}
                  sx={() => ({
                    [`& .${gaugeClasses.valueArc}`] : {
                      fill: 'rgba(10, 200, 0, 0.5)'
                    },
                    [`& .${gaugeClasses.referenceArc}`]: {
                      fill: 'rgba(0, 150, 250, 0.5)'
                    }
                  })}
                />

              </Card>
            ))}
          </Box>
          
          <Typography
            component='p'
            id='dashboard-data-visualization-total-activation-title'
            variant='h6'
            sx={{
              mt: 5
            }}
          >
            Total Activation counter
          </Typography>

          <Card
          component=''
          id='dashboard-data-visualization-total-activation-bar'
          sx={{
            bgcolor: 'primary',
            height: 250,
            maxWidth: 1280,
            mt: 1,
            mb: 1,
            boxShadow: 2
          }}>
            <Typography 
              id='dashboard-data-visualization-graph-total-activation-title'
              textAlign={'center'}
            >
              Graph of totals 
            </Typography>
              <BarChart
                id='dashboard-data-visualization-graph-total-bar'
                xAxis={[
                  {
                    barGapRatio: 0,
                    data:['Total']
                  }
                ]}
                series={[
                  { label:'Activation', 
                    barLabel: 'value',
                    barLabelPlacement: 'center', 
                    color: 'rgba(0, 150, 250, 0.5)', 
                    data: [total[0]],
                  },
                  { label:'Sit/Stand', 
                    barLabel: 'value',
                    barLabelPlacement: 'center', 
                    color: 'rgba(10, 200, 0, 0.5)',
                    data: [total[1]],
                  }
                ]}
              />
          </Card>
        </Box>
      </Box>

    </Box>

  )
}
