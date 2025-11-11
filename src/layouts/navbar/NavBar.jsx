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
export function NavBar({ imageSrc, logoClick, pageClick, signoutClick, pages }) {

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
        zIndex: 100
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
          pages.map(page => {
            return (
              <Button 
                onClick={() => pageClick(page)}
              >{page.label}</Button>
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