import * as React from 'react';
import { Box, Typography, Link} from '@mui/material';

/* Controller */
export default function FooterController(){
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
            color: 'text.secondary'
        }}
      >Copyright &copy; 2025 DeskMate, All Rights Reserved </Typography>

      <Box 
        sx={{
          display: 'flex',
          flexDirection: 'row',
          justifyContent: 'center'
        }}>
        
        <Box 
          sx={{
            display: 'flex',
            p: 2
          }}>
            <Link href='about'>About</Link>
        </Box>
          
        <Box
          sx={{
            display: 'flex',
            flexDirection: 'column',
            p: 2
          }}>
          <Link href='/'>Dashboard</Link>
          <Link href='desk'>Desk</Link>
          <Link href='maintenance'>Maintenance</Link>
          <Link href='database'>Database</Link>
        </Box>
      </Box>

    </Box>
  );
}