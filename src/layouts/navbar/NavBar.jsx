import * as React from 'react';
import { useNavigate } from 'react-router';
import useSession from '../../models/SessionContext';
import { Box, Paper, Button, Link, ButtonGroup } from '@mui/material';
import DeskmateInverseSVG from '../../assets/DeskMateInverse.svg'
import DeskmateSVG from '../../assets/DeskMate.svg'
import { useTheme } from '@mui/material/styles';

/* Controller */
export default function NavBarController(){

  const theme = useTheme();
  const imageSrc = theme.palette.mode == 'dark' ? DeskmateInverseSVG : DeskmateSVG;

  const navigate = useNavigate();

  const { session, setSession} = useSession();
  const pages = session.pages != null ? [...session.pages] : [];

  const handleLogoClick = () => {
    navigate('/');
  };

  const handlePageClick = (pages) => {
    navigate(pages.route);
  };

  const handleSignOutClick = () => {
    setSession(null);
  };

  return (
    <NavBar imageSrc={imageSrc} logoClick={handleLogoClick} pageClick={handlePageClick} signoutClick={handleSignOutClick} pages={pages} />
  );
}

/* View */
export function NavBar({ imageSrc, logoClick, pageClick, signoutClick, pages}) {

  return (
    <Paper 
      component='navbar'
      id='navbar'
      sx={{ 
        width: '100%', 
        height: '100', 
        display: 'flex', 
        flexDirection: 'row', 
        borderBottom: '2px solid rgba(102, 126, 234, 0.2)',
        pl: 1,
        position: 'fixed',
        bgcolor: 'background.default',
        zIndex: 100
      }} 
    >
      <Link component='nav' id='navbar-logo-link' onClick={logoClick} >
        <img id='deskmate-logo-image' height='100' src={imageSrc} />
      </Link>
      <ButtonGroup
        component='ul'
        id='navbar-navigation-buttongroup'
        variant='string' 
        fullWidth='true' 
        sx={{ pl: 3 }}
      >
        {
          pages.map(page => {
            return (
              <Button
                component='button'
                id={'navbar-navigation-pagebutton-' + page.label}
                onClick={() => pageClick(page)}
              >{page.label}</Button>
            )
          })
        }

        {/* Buttons navigate, but only the the dashboard ('/') */}
        <Button component='button' id="footer-information-link-howtouse" onClick={() => pageClick({route: './howtouse'})} sx={{width: '115px'}}>How To Use</Button>
        <Button component='button' id="footer-information-link-about" onClick={() => pageClick({route: './about'})}>About</Button>
      </ButtonGroup>
      <Box
        component='section'
        id='navbar-account-signout-container'
        sx={{
          width: '100%',
          display: 'flex',
          flexDirection: 'row-reverse', 
          pr: 3
        }}
      >
        <Button
          component='button'
          id='navbar-signout-button'
          onClick={signoutClick}
        >Sign-Out</Button>
      </Box>
    </Paper>
  );
}