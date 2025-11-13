import * as React from 'react';
import RestrictedPage from '../restricted/RestrictedPage'
import { Box, Typography, Stack } from '@mui/material';
import useSession from '../../models/SessionContext';
import DeskView from './components/DeskView';
import { DESKS, USERSTODESKS } from '../../../dummyData/dummyData';


/* Controller */
export default function DeskPageController() {
  
  const { session, setSession } = useSession();

  // Filter desks based on user's assigned desks
  const userDesksIds = session.user
    ? USERSTODESKS.map(utd => {
      if (utd.userid == session.user.id)
        return utd.deskid;
    })
    : [];

  const userDesks = userDesksIds.length > 0
    ? DESKS.filter(d => userDesksIds.includes(d.id))
    : [];

  return (
    <RestrictedPage Page={<DeskPage userDesks={userDesks} />} />
  )
}

/* View */
export function DeskPage({ userDesks }) {
  return (
    <Box id='desk-page' sx={{ boxShadow: 2 }}>
      <Typography
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
      <Box id='user-desks-list-container' sx={{ maxWidth: '1600px', margin: '0 auto' }}>
        {userDesks.length > 0 ? (
          <Stack id='user-desks-list' spacing={2}>
            {userDesks.map(desk => (
              <DeskView id={'user-desk-' + desk.id} key={desk.id} desk={desk} />
            ))}
          </Stack>
        ) : (
          <Typography
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
