import * as React from 'react';
import { Box, Typography, Link} from '@mui/material';
import {useSessionContext} from '../../SessionContext';

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
        sx = {{
            color: 'text.primary'
        }}
      >Copyright &copy; 2025 DeskMate, All Rights Reserved </Typography>

      <Box 
        sx={{
          display: 'flex',
          flexDirection: 'row',
          justifyContent: 'space-around',
          p: 2
        }}
      >
        
        <Box
          sx={{
            display: 'flex',
            flexDirection: 'column'
          }}
        >
          <Typography variant='h6'>Contributers</Typography>
          
          <Typography sx={{color: 'text.secondary'}}>
            Patrick G. Schemel <br/>
            Asbjørn E. Rom <br/>
            Miroslav Andrejcak <br/>
            Rafał Kamil Fuchs <br/>
            Victor Petrica <br/>
            Maksym Andrzej Drzyzgiewicz <br/>
          </Typography>
        </Box>
          
        <Box
          sx={{
            display: 'flex',
            flexDirection: 'column',
            pr: 5,
            pl: 5
          }}
        >
            <Typography variant='h6'>Links</Typography>
            <Link href='/' sx={{color: 'text.secondary'}}>Dashboard</Link>
            <Link href='desk' sx={{color: 'text.secondary'}}>Desk</Link>
            <Link href='maintenance' sx={{color: 'text.secondary'}}>Maintenance</Link>
            <Link href='database' sx={{color: 'text.secondary'}}>Database</Link>
        </Box>

        <Box 
          sx={{
            display: 'flex',
            flexDirection: 'column',
            pr: 5,
            pl: 5
          }}
        >
          <Typography variant='h6'>Information</Typography>
          <Link href='howtouse' sx={{color: 'text.secondary'}}>How To Use</Link>
          <Link href='about' sx={{color: 'text.secondary'}}>About</Link>
        </Box>

      </Box>

    </Box>
  );
}