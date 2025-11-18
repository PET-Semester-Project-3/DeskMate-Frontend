import * as React from 'react';
import { Box, Typography, Button, ButtonGroup} from '@mui/material';
import useSession from '../../models/SessionContext';
import { Route, useNavigate } from 'react-router';

/* Controller */
export default function FooterController(){
  
  // TODO: Session context to handle vissible links.
  const { session, setSession } = useSession();
  const pages = session.pages ? [...session.pages] : [];
  // session.user gives u the user = { id: 1, name: "Guest", username: 'ThisGuest', email: "guest@guest.com", password: "guest" }, 
  // session.pages gives you pages for the user; pages = { id: 1, label: 'Database', route: "/database" }

  const navigate = useNavigate();
  // Use like so: navigate('/') goes to localhost:5173, navigate('/database') goes to localhost:5173/database

  return (
    <Footer navigate={navigate} pages={pages}/>
  )
}

/* View */
export function Footer({navigate, pages}) {

  return (
    <Box
      component='footer'
      id="footer"
      sx={{
        borderTop: '2px solid rgba(102, 126, 234, 0.2)',
        textAlign: 'center',
        p: 2
      }}
    >
      <Typography
        component='label'
        id="footer-copyright-label"
        sx = {{
            color: 'text.primary'
        }}
      >Copyright &copy; 2025 DeskMate, All Rights Reserved </Typography>

      <Box 
        component='section'
        id="footer-parts-container"
        sx={{
          display: 'flex',
          flexDirection: 'row',
          justifyContent: 'space-around',
          p: 2
        }}
      >
        
        <Box
          component='section'
          id="footer-contributers-container"
          sx={{
            display: 'flex',
            flexDirection: 'column'
          }}
        >
          
          <Typography component='hgroup' id="footer-contributers-text" sx={{color: 'text.secondary'}}>
              <Typography component='h6' id="footer-contributers-header" variant='h6' sx={{color: 'text.primary'}}>Contributers</Typography>
            Patrick G. Schemel <br/>
            Asbjørn E. Rom <br/>
            Miroslav Andrejcak <br/>
            Rafał Kamil Fuchs <br/>
            Victor Petrica <br/>
            Maksym Andrzej Drzyzgiewicz <br/>
          </Typography>
        </Box>
          
        <Box
          component='section'
          id="footer-links-container"
          sx={{
            display: 'flex',
            flexDirection: 'column',
            pr: 5,
            pl: 5
          }}
        >
            {/* KEEP component='nav' AND ids, DO NOT CHANGE THEM */}
            <Typography component='h6' id="footer-links-header" variant='h6'>Links</Typography>

{/* Does not properly work with user permissions, but works with button clicks.
    Most likly (I am fairly certain this is the case) the condition for displaying is the problem.
*/}
            <Button 
              component='nav' 
              id="footer-links-link-dashboard" 
              onClick={() => navigate('/')} 
              sx={{
                color: 'text.secondary', 
                //display: pages ? 'none' : 'block'
              }}>
            Dashboard</Button>

            <Button 
              component='nav' 
              id="footer-links-link-desk" 
              onClick={() => navigate('/desk')} 
              sx={{
                color: 'text.secondary', 
                //display: pages ? 'none' : 'block'
              }}>
            Desk</Button>

            <Button 
              component='nav' 
              id="footer-links-link-maintenance" 
              onClick={() => navigate('/maintenance')} 
              sx={{
                color: 'text.secondary', 
                //display: pages ? 'none' : 'block'
              }}>
            Maintenance</Button>

            <Button 
              component='nav' 
              id="footer-links-link-database" 
              onClick={() => navigate('/database')} 
              sx={{
                color: 'text.secondary', 
                //display: pages ? 'none' : 'block'
              }}>
            Database</Button>

{/* Works with user permissions, but button clicks does not work and formatting looks a bit weird.
            <ButtonGroup
              component='ul'
              id='footer-doormatnav-buttongroup'
              variant='string' 
              fullWidth='true' 
              sx={{flexDirection: 'column' }}
            >
              {
                pages.map(page => {
                  return (
                    <Button
                      component='nav'
                      id={'footer-links-link-' + page.label}
                      onClick={() => navigate(pages)}
                    >{page.label}</Button>
                  )
                })
              }
            </ButtonGroup>
*/}

        </Box>

        <Box
          component='section'
          id="footer-information-container"
          sx={{
            display: 'flex',
            flexDirection: 'column',
            pr: 5,
            pl: 5
          }}
        >
          <Typography component='h6' id="footer-information-header" variant='h6'>Information</Typography>
          <Button component='nav' id="footer-information-link-howtouse" onClick={() => navigate('/howtouse')} sx={{color: 'text.secondary'}}>How To Use</Button>
          <Button component='nav' id="footer-information-link-about" onClick={() => navigate('/about')} sx={{color: 'text.secondary'}}>About</Button>

        </Box>

      </Box>

    </Box>
  );
}