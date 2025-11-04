import * as React from 'react';
import { useNavigate } from 'react-router';
import { useSessionContext } from '../../SessionContext';
import { Box, Paper, Button, Link, ButtonGroup } from '@mui/material';
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

  const sessionContext = useSessionContext();

  const handleLogoClick = () => {
    navigate('/');
  };

  const handlePageClick = (page) => {
    navigate(page.path);
  };

  const handleSignOutClick = () => {
    sessionContext.setSession(null);
  };

  return (
    <NavBar imageSrc={imageSrc} logoClick={handleLogoClick} pageClick={handlePageClick} signoutClick={handleSignOutClick} sessionContext={sessionContext} />
  );
}

/* View */
export function NavBar({ imageSrc, logoClick, pageClick, signoutClick, sessionContext }) {

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
        bgcolor: 'background.default',
        zIndex: 950
      }} 
    >
      <Link onClick={logoClick} >
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
                onClick={() => pageClick(page)}
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
        <Button 
          onClick={signoutClick}
        >Sign-Out</Button>
      </Box>
    </Paper>
  );
}