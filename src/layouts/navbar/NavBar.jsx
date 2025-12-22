import * as React from 'react';
import { useNavigate } from 'react-router';
import useSession from '../../models/SessionContext';
import { Box, Paper, Button, Link, ButtonGroup, Avatar, Menu, MenuItem, Divider, Tooltip } from '@mui/material';
import DeskmateInverseSVG from '../../assets/DeskMateInverse.svg'
import DeskmateSVG from '../../assets/DeskMate.svg'
import { useTheme } from '@mui/material/styles';

const NAVORDER = {
  Desk: 1,
  Maintenance: 2,
  Management: 3,
  Database: 4,
}

/* Controller */
export default function NavBarController(){

  const theme = useTheme();
  const imageSrc = theme.palette.mode == 'dark' ? DeskmateInverseSVG : DeskmateSVG;

  const navigate = useNavigate();

  const [anchorElUserMenu, setAnchorElUserMenu] = React.useState(null);

  const {session, setSession} = useSession();
  const pages = session.pages != null ? [...session.pages] : [];

  const avatarClick = (event) => {
    console.log(!anchorElUserMenu ? event.currentTarget : null)
    setAnchorElUserMenu(!anchorElUserMenu ? event.currentTarget : null);
  }

  return (
    <NavBar
      imageSrc={imageSrc} 
      navigate={navigate} 
      userEmail={session?.user?.email}
      avaterClick={avatarClick}
      anchorElUserMenu={anchorElUserMenu}
      pages={pages} 
      setSession={setSession}
      />
  );
}

/* View */
export function NavBar({ imageSrc, navigate, userEmail, avaterClick, anchorElUserMenu, pages, setSession}) {

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
      <Link component='nav' id='navbar-logo-link' onClick={() => navigate('/')} >
        <img id='deskmate-logo-image' height='100' src={imageSrc} />
      </Link>
      <ButtonGroup
        component='ul'
        id='navbar-navigation-buttongroup'
        variant='string' 
        fullWidth='true' 
        sx={{ pl: 3 }}
      >
        <Button component='button' id="footer-information-link-dashboard" onClick={() => navigate('/')} sx={{width: '115px'}}>Dashboard</Button>
        {
          pages.sort((a, b) => !NAVORDER[a.label] ? -1 : NAVORDER[a.label] > NAVORDER[b.label] ? 1 : -1).map(page => {
            return (
              <Button
                component='button'
                id={'navbar-navigation-pagebutton-' + page.label}
                onClick={() => navigate(page.route)}
              >{page.label}</Button>
            )
          })
        }
        <Button component='button' id="footer-information-link-howtouse" onClick={() => navigate('/howtouse')} sx={{width: '115px'}}>How To Use</Button>
        <Button component='button' id="footer-information-link-about" onClick={() => navigate('/about')}>About</Button>
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
        <Box component='section' id='user-avatar-container' sx={{ display: 'flex', justifyContent: 'center', alignItems: 'center' }}>
          <Tooltip title={userEmail}>
            <Avatar
              component='div' 
              id='user-avatar'
              variant="square"
              onClick={avaterClick}
              sx={{ 
                width: 50, 
                height: 50, 
                fontSize: 20, 
                bgcolor: '#667eea',
                boxShadow: '0 4px 12px rgba(102, 126, 234, 0.3)',
                cursor: 'pointer'
              }}>
              {userEmail ? userEmail.split('@')[0].slice(0, 2).toUpperCase() : '??'}
            </Avatar>
          </Tooltip>
        </Box>
        <Menu
          component='div' 
          id='user-avatar-menu'
          anchorEl={anchorElUserMenu}
          open={anchorElUserMenu ? true : false}
          onClose={avaterClick}
          slotProps={{
            list: {
              'aria-labelledby': 'basic-button',
            },
          }}
        >
          <MenuItem component='span' id='user-avatar-menuitem-profile' onClick={(e) => { avaterClick(e); navigate('/profile'); }}>Profile</MenuItem>
          <MenuItem component='span' id='user-avatar-menuitem-deskmate' onClick={(e) => { avaterClick(e); navigate('/deskmate'); }}>My Deskmate</MenuItem>
          <Divider/>
          <MenuItem component='span' id='user-avatar-menuitem-sign-out' onClick={() => setSession(null)}>Sign-Out</MenuItem>
        </Menu>
      </Box>
    </Paper>
  );
}