import * as React from 'react';
import useSession from '../../models/SessionContext';
import { Typography, Box, CircularProgress } from '@mui/material';
import RestrictedPage from '../restricted/RestrictedPage'
import DeskCard from './components/DeskCard';
import { asyncGetUserDesks } from '../../models/api-comm/APIUsers'
import { useSnackbar } from 'notistack';

/* Controller */
export default function MaintenancePageController() {

  const { enqueueSnackbar } = useSnackbar();

  const [waitingForResponse, setWaitingForResponse] = React.useState(false);

  const [desks, setDesks] = React.useState([]);
  const { session } = useSession();

  React.useEffect(() => {
    const getDesks = async (id) => {
      setWaitingForResponse(true);
      const desks = await asyncGetUserDesks(id);
      if (desks.length)
        setDesks(desks);
      else
        enqueueSnackbar(`Failed to retrieve data`, { variant: 'error' });
      setWaitingForResponse(false);
    }
    getDesks(session?.user?.id);
  }, [session?.user?.id]);

  return (
    <RestrictedPage Page={<MaintenancePage desks={desks} waitingForResponse={waitingForResponse} />} />
  )
}

/* View */
export function MaintenancePage({ desks, waitingForResponse }) {
  return (
    <Box component='main' id='maintenance-page' sx={{ width: '100%' }}>
      <Typography
        component='h4'
        id='maintenance-page-header'
        variant="h4"
        sx={{
          fontWeight: 700,
          mb: 3,
          color: '#8b5cf6'
        }}
      >
        Desk Maintenance
      </Typography>
      <Box component='ul' id='maintenance-page-desks-container' sx={{ display: 'flex', flexWrap: 'wrap', gap: 3 }}>
        {
          waitingForResponse ?
          <Box component={'section'} id='maintenance-page-loading-container' sx={{ width: '100%', display: 'flex', justifyContent: 'center', alignItems: 'center', p: 5 }}>
            <CircularProgress 
              component='div' 
              id='maintenance-page-circularprogress'
              size={60}
              sx={{
                color: 'primary.main',
              }}
            />
          </Box>
          : 
          desks.map((desk) => (
            <DeskCard key={desk.id} desk={desk} />
          ))
        }
        
      </Box>
    </Box>
  );
}
