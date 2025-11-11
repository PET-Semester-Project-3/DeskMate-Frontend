import * as React from 'react';
import { Box, Typography } from '@mui/material';

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
      >DeskMate (c) 2025, WIP</Typography>
    </Box>
  );
}