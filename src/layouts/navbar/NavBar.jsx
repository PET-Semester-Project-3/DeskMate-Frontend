import * as React from 'react';
import { useNavigate } from 'react-router';
import { useSession } from '../../SessionContext';
import { Box, Paper, Button, Link, ButtonGroup, Typography } from '@mui/material';
import DeskmateInverseSVG from '../../assets/DeskMateInverse.svg'
import DeskmateSVG from '../../assets/DeskMate.svg'
import { useTheme } from '@mui/material/styles';

const PAGES = [
  {
    name: 'Dashboard',
    path: '/'
  },
  {
    name: 'Desk',
    path: '/desk'
  },
  {
    name: 'Maintenance',
    path: '/maintenance'
  },
  {
    name: 'Database',
    path: '/database'
  },
]


/* Controller */
export default function NavBarController(){

  const theme = useTheme();
  const imageSrc = theme.palette.mode == 'dark' ? DeskmateInverseSVG : DeskmateSVG;

  const navigate = useNavigate();

  const session = useSession();

  return (
    <NavBar imageSrc={imageSrc} navigate={navigate} session={session} />
  )
}

/* View */
export function NavBar({ imageSrc, navigate, session }) {

  return (
    <Paper 
      sx={{ 
        width: '100%', 
        height: '100', 
        display: 'flex', 
        flexDirection: 'row', 
        borderBottom: '2px solid rgba(102, 126, 234, 0.2)',
        pl: 1,
        position: 'fixed',
        bgcolor: 'background.default'
      }} 
    >
      <Link onClick={() => navigate('/')} >
        <img height='100' src={imageSrc} />
      </Link>
      <ButtonGroup 
        variant='string' 
        fullWidth='true' 
        sx={{ pl: 3 }}
      >
        {
          PAGES.map(page => {
            return (
              <Button 
                onClick={() => navigate(page.path)}
              >{page.name}</Button>
            )
          })
        }
      </ButtonGroup>
      <Box
        sx={{
          width: '100%',
          display: 'flex',
          flexDirection: 'row-reverse', 
          pr: 3
        }}
      >
        {
          session ?
            <Button 
              onClick={() => navigate('/')}
            >Sign-Out</Button>
            : <Button 
                onClick={() => navigate('/')}
              >Sign-In</Button>
        }
      </Box>
    </Paper>
  );
}