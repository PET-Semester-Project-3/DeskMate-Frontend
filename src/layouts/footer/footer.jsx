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
      id="footer"
      sx={{
        borderTop: '2px solid rgba(102, 126, 234, 0.2)',
        textAlign: 'center',
        p: 2
      }}
    >
      <Typography
        id="footer-copyright-text"
        sx = {{
            color: 'text.primary'
        }}
      >Copyright &copy; 2025 DeskMate, All Rights Reserved </Typography>

      <Box 
        id="footer-parts-container"
        sx={{
          display: 'flex',
          flexDirection: 'row',
          justifyContent: 'space-around',
          p: 2
        }}
      >
        
        <Box
          id="footer-contributers-container"
          sx={{
            display: 'flex',
            flexDirection: 'column'
          }}
        >
          <Typography id="footer-contributers-header" variant='h6'>Contributers</Typography>
          
          <Typography id="footer-contributers-text" sx={{color: 'text.secondary'}}>
            Patrick G. Schemel <br/>
            Asbjørn E. Rom <br/>
            Miroslav Andrejcak <br/>
            Rafał Kamil Fuchs <br/>
            Victor Petrica <br/>
            Maksym Andrzej Drzyzgiewicz <br/>
          </Typography>
        </Box>
          
        <Box
          id="footer-links-container"
          sx={{
            display: 'flex',
            flexDirection: 'column',
            pr: 5,
            pl: 5
          }}
        >
            <Typography id="footer-links-header" variant='h6'>Links</Typography>
            <Link id="footer-links-link-dashboard" href='/' sx={{color: 'text.secondary'}}>Dashboard</Link>
            <Link id="footer-links-link-desk" href='desk' sx={{color: 'text.secondary'}}>Desk</Link>
            <Link id="footer-links-link-maintenance" href='maintenance' sx={{color: 'text.secondary'}}>Maintenance</Link>
            <Link id="footer-links-link-database" href='database' sx={{color: 'text.secondary'}}>Database</Link>
        </Box>

        <Box 
          id="footer-information-container"
          sx={{
            display: 'flex',
            flexDirection: 'column',
            pr: 5,
            pl: 5
          }}
        >
          <Typography id="footer-information-header" variant='h6'>Information</Typography>
          <Link id="footer-information-link-howtouse" href='howtouse' sx={{color: 'text.secondary'}}>How To Use</Link>
          <Link id="footer-information-link-about" href='about' sx={{color: 'text.secondary'}}>About</Link>
        </Box>

      </Box>

    </Box>
  );
}