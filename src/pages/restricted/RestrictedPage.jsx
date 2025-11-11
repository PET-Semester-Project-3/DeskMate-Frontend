import * as React from 'react';
import useSession from '../../models/SessionContext'
import { useLocation } from 'react-router';
import { Typography, Box } from '@mui/material';

/* Controller */
export default function RestrictedPageController({ Page }) {
  const { session, setSession } = useSession();
  const location = useLocation();
  return (
    
    <Box>
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
        sx={{
            display: 'flex',
            flexDirection: 'column',
            alignItems: 'center',
            width: '100%'
        }}
    >
        <Typography
            variant='h2'
            sx={{
                fontWeight: 700,
                m: 2,
            }}
        >
            Oops . . .
        </Typography>
        <Typography
            align='center'
            sx={{
                m: 2,
                maxWidth: 450,
            }}
        >
            {session.username}
            , You have found a page that you do not have access to. Try to contact an Administrator if you need to have access to:
            {' [ ' + route + ' ]'}
        </Typography>
    </Box>
  );
}
