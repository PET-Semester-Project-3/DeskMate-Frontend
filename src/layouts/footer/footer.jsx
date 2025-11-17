import * as React from 'react';
import { Box, Typography, Link} from '@mui/material';
import useSession from '../../models/SessionContext';
import { useNavigate } from 'react-router';

/* Controller */
export default function FooterController(){
  
  // TODO: Session context to handle vissible links.
  const { session, setSession } = useSession();
  const pages = session.pages != null ? [...session.pages] : [];
  // session.user gives u the user = { id: 1, name: "Guest", username: 'ThisGuest', email: "guest@guest.com", password: "guest" }, 
  // session.pages gives you pages for the user; pages = { id: 1, label: 'Database', route: "/database" }

  const navigate = useNavigate();
  // Use like so: navigate('/') goes to localhost:5173, navigate('/database') goes to localhost:5173/database

  return (
    <Footer/>
  )
}

/* View */
export function Footer() {
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
            {/* CHANGE LINKS TO BUTTONS OR TYPOGRAPHY WITH onClick={() => navigate('/')}, KEEP component='nav' AND ids */}
            <Typography component='h6' id="footer-links-header" variant='h6'>Links</Typography>
            <Link component='nav' id="footer-links-link-dashboard" href='/' sx={{color: 'text.secondary'}}>Dashboard</Link>
            <Link component='nav' id="footer-links-link-desk" href='desk' sx={{color: 'text.secondary'}}>Desk</Link>
            <Link component='nav' id="footer-links-link-maintenance" href='maintenance' sx={{color: 'text.secondary'}}>Maintenance</Link>
            <Link component='nav' id="footer-links-link-database" href='database' sx={{color: 'text.secondary'}}>Database</Link>
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
          <Link component='nav' id="footer-information-link-howtouse" href='howtouse' sx={{color: 'text.secondary'}}>How To Use</Link>
          <Link component='nav' id="footer-information-link-about" href='about' sx={{color: 'text.secondary'}}>About</Link>
        </Box>

      </Box>

    </Box>
  );
}