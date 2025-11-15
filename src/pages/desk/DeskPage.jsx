import * as React from 'react';
import RestrictedPage from '../restricted/RestrictedPage'
import { Box, Typography, Stack } from '@mui/material';
import useSession from '../../models/SessionContext';
import DeskView from './components/DeskView';
import { asyncGetUserDesks } from '../../models/api-comm/APIUsers'


/* Controller */
export default function DeskPageController() {
  
  const [desks, setDesks] = React.useState([]);
  const { session, setSession } = useSession();

  React.useEffect(() => {
    async function getDesks(id) {
      const desks = await asyncGetUserDesks(id);
      setDesks(desks);
    }
    getDesks(session?.user?.id);
  }, []);

  return (
    <RestrictedPage Page={<DeskPage userDesks={desks} />} />
  )
}

/* View */
export function DeskPage({ userDesks }) {
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
      <Box component='section' id='user-desks-list-container' sx={{ maxWidth: '1600px', margin: '0 auto' }}>
        {userDesks.length > 0 ? (
          <Stack component='ul' id='user-desks-list' spacing={2}>
            {userDesks.map(desk => (
              <DeskView id={'user-desk-' + desk.id} key={desk.id} desk={desk} />
            ))}
          </Stack>
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
