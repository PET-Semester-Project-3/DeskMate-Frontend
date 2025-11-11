import * as React from 'react';
import { Box, Typography, Link} from '@mui/material';
import useSession from '../../models/SessionContext';

/* Controller */
export default function FooterController(){
  
  // TODO: Session context to handle vissible links.  

  return (
    <Footer/>
  )
}

/* View */
export function Footer() {
  return (
    <Box
      component="footer"
      sx={{
        borderTop: '2px solid rgba(102, 126, 234, 0.2)',
        textAlign: 'center',
        p: 2
      }}
    >
      <Typography
        component="footer-copyright-text"
        sx = {{
            color: 'text.primary'
        }}
      >Copyright &copy; 2025 DeskMate, All Rights Reserved </Typography>

      <Box 
        component="footer-parts-container"
        sx={{
          display: 'flex',
          flexDirection: 'row',
          justifyContent: 'space-around',
          p: 2
        }}
      >
        
        <Box
          component="footer-contributers-container"
          sx={{
            display: 'flex',
            flexDirection: 'column'
          }}
        >
          <Typography component="footer-contributers-header" variant='h6'>Contributers</Typography>
          
          <Typography component="footer-contributers-text" sx={{color: 'text.secondary'}}>
            Patrick G. Schemel <br/>
            Asbjørn E. Rom <br/>
            Miroslav Andrejcak <br/>
            Rafał Kamil Fuchs <br/>
            Victor Petrica <br/>
            Maksym Andrzej Drzyzgiewicz <br/>
          </Typography>
        </Box>
          
        <Box
          component="footer-links-container"
          sx={{
            display: 'flex',
            flexDirection: 'column',
            pr: 5,
            pl: 5
          }}
        >
            <Typography component="footer-links-header" variant='h6'>Links</Typography>
            <Link component="footer-links-link-dashboard" href='/' sx={{color: 'text.secondary'}}>Dashboard</Link>
            <Link component="footer-links-link-desk" href='desk' sx={{color: 'text.secondary'}}>Desk</Link>
            <Link component="footer-links-link-maintenance" href='maintenance' sx={{color: 'text.secondary'}}>Maintenance</Link>
            <Link component="footer-links-link-database" href='database' sx={{color: 'text.secondary'}}>Database</Link>
        </Box>

        <Box 
          component="footer-information-container"
          sx={{
            display: 'flex',
            flexDirection: 'column',
            pr: 5,
            pl: 5
          }}
        >
          <Typography component="footer-information-header" variant='h6'>Information</Typography>
          <Link component="footer-information-link-howtouse" href='howtouse' sx={{color: 'text.secondary'}}>How To Use</Link>
          <Link component="footer-information-link-about" href='about' sx={{color: 'text.secondary'}}>About</Link>
        </Box>

      </Box>

    </Box>
  );
}