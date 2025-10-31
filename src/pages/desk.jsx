import * as React from 'react';
import { Box, Typography, Stack } from '@mui/material';
import { DESKS, USERSTODESKS, USERS } from '../../dummyData/dummyData';
import DeskView from '../components/desk/DeskView';
import Cookies from 'js-cookie';

export default function DeskPage() {
  
  const session = Cookies.get('session')

  // Get user ID from session
  const currentUser = session?.user?.email
    ? USERS.find((u) => u.email === session.user.email)
    : null;

  // Filter desks based on user's assigned desks
  const userDesks = currentUser
    ? USERSTODESKS.filter((utd) => utd.userid === currentUser.id)
        .map((utd) => DESKS.find((desk) => desk.id === utd.deskid))
        .filter(Boolean)
    : [];

  return (
    <Box title="" sx={{ boxShadow: 2 }}>
      <Typography
        variant="h4"
        sx={{
          fontWeight: 700,
          mb: 3,
          color: '#ec4899',
        }}
      >
        {'My Desk' + (userDesks.length > 1 ? 's' : '')}
      </Typography>
      <Box sx={{ maxWidth: '1600px', margin: '0 auto' }}>
        {userDesks.length > 0 ? (
          <Stack spacing={2}>
            {userDesks.map((desk) => (
              <DeskView key={desk.id} desk={desk} />
            ))}
          </Stack>
        ) : (
          <Typography
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
