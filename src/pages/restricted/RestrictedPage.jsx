import * as React from 'react';
import useSession from '../../models/SessionContext'
import { useLocation } from 'react-router';
import { Typography, Box } from '@mui/material';

/* Controller */
export default function RestrictedPageController({ Page }) {
  const { session, setSession } = useSession();
  const location = useLocation();
  return (
    <Box component='main' id='restricted-page-container' sx={{ width: '100%', height: '100%' }} >
        {session.pages.map(p => p.route).includes(location.pathname) ? 
            Page
            : <RestrictedPage session={session} route={location.pathname} />
        }
    </Box>
  )
}

/* View */
export function RestrictedPage({ session, route }) {
  return (
    <Box
        component='section'
        id='restricted-page'
        sx={{
            display: 'flex',
            flexDirection: 'column',
            alignItems: 'center',
            width: '100%',
            height: '100%'
        }}
    >
        <Typography
            component='h2'
            id='restricted-page-header'
            variant='h2'
            sx={{
                fontWeight: 700,
                m: 2,
            }}
        >
            Oops . . .
        </Typography>
        <Typography
            component='p'
            id='restricted-page-text'
            align='center'
            sx={{
                m: 2,
                maxWidth: 450,
            }}
        >
            {session?.user?.email}
            , You have found a page that you do not have access to. Try to contact an Administrator if you need to have access to:
            {' [ ' + route + ' ]'}
        </Typography>
    </Box>
  );
}
