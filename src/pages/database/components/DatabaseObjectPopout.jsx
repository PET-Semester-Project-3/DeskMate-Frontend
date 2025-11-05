import * as React from 'react';
import { Paper, Box, Backdrop, Button } from '@mui/material';

/* Controller */
export default function DatabaseObjectPopoutController({ selectedEntries, open, onEditingStateChange }) {
    
  
  return (
    <DatabaseObjectPopout open={open} onEditingStateChange={onEditingStateChange} />
  )
}

/* View */
export function DatabaseObjectPopout({ open, onEditingStateChange }) {
  return (
    <Backdrop
      open={open}
      sx={{ zIndex: 200 }}
    >
      <Box
        sx={{
            display: 'flex',
            flexDirection: 'column',
            justifyContent: 'flex-end',
            width: '75%',
            height: '75%',
          }}
      >
        <Box
          sx={{
            display: 'flex',
            justifyContent: 'flex-end',
            width: '100%'
          }}
        >
          <Button
            variant='contained'
            onClick={onEditingStateChange}
            sx={{ width: 50, height: 45, mb: 1 }}
          >X</Button>
        </Box>
        <Paper
          sx={{ 
            width: '100%',
            height: '100%',
          }}
        >
        
        </Paper>
      </Box>
      
    </Backdrop>
  );
}