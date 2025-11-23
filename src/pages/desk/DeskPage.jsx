import * as React from 'react';
import RestrictedPage from '../restricted/RestrictedPage'
import { Box, Typography, Stack, CircularProgress } from '@mui/material';
import useSession from '../../models/SessionContext';
import DeskView from './components/DeskView';
import { asyncGetUserDesks } from '../../models/api-comm/APIUsers'


/* Controller */
export default function DeskPageController() {
  
  const [waitingForResponse, setWaitingForResponse] = React.useState(false);

  const [desks, setDesks] = React.useState([]);
  const { session } = useSession();

  React.useEffect(() => {
    const getDesks = async (id) => {
      setWaitingForResponse(true);
      const desks = await asyncGetUserDesks(id);
      setDesks(desks);
      setWaitingForResponse(false);
    }
    getDesks(session?.user?.id);
  }, [session?.user?.id]);

  return (
    <RestrictedPage Page={<DeskPage userDesks={desks} waitingForResponse={waitingForResponse} />} />
  )
}

/* View */
export function DeskPage({ userDesks, waitingForResponse }) {
  return (
    <Box component='main' id='desk-page' sx={{ boxShadow: 2 }}>
      <Typography
        component='h4'
        id='desk-page-header'
        variant="h4"
        sx={{
          fontWeight: 700,
          mb: 3,
          color: '#ec4899',
        }}
      >
        {'My Desk' + (userDesks.length > 1 ? 's' : '')}
      </Typography>
      <Box component='section' id='user-desks-list-container' sx={{ p: 5 }}>
        {userDesks.length > 0 || waitingForResponse ? (
          waitingForResponse ?
          <Box component={'section'} id='desk-page-loading-container' sx={{ width: '100%', display: 'flex', justifyContent: 'center', alignItems: 'center', p: 5 }}>
            <CircularProgress
              component='div'
              id='desk-page-circularprogress'
              size={60}
              sx={{
                color: 'primary.main',
              }}
            />
          </Box>
          :
          <Box component='section' id='user-desks-list' sx={{ display: 'flex', flexDirection: 'row', flexWrap: 'wrap', width: '100%', gap: 5, justifyContent: 'center' }} >
            {userDesks.map(desk => (
              <DeskView id={'user-desk-' + desk.id} key={desk.id} desk={desk} />
            ))}
          </Box>
        ) : (
          <Typography
            component='h6'
            id='no-desks-header'
            variant="h6"
            color="text.secondary"
            sx={{ textAlign: 'center', mt: 4 }}
          >
            No desks assigned to your account
          </Typography>
        )}
      </Box>
    </Box>
  );
}
