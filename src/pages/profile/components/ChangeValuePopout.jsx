import * as React from 'react';
import { Paper, Box, Backdrop, Button, Typography } from '@mui/material';

/* Controller */
export default function ChangeValuePopoutController({ children, header, onSaveClick, isOpen, setIsOpen  }) {
  return (
    <ChangeValuePopout 
        children={children}
        header={header}
        onSaveClick={onSaveClick}
        isOpen={isOpen}
        setIsOpen={setIsOpen}
    />
  )
}

/* View */
export function ChangeValuePopout({ children, header, onSaveClick, isOpen, setIsOpen }) {
  return (
    <Backdrop
      component='div'
      id='change-value-popout'
      open={isOpen}
      sx={{ zIndex: 200 }}
    >
        <Box
            component='section'
            id='change-value-popout-sized-container'
            sx={{
                display: 'flex',
                flexDirection: 'column',
                justifyContent: 'flex-end',
            }}
        >
            {/* Close Button */}
            <Box
            component='section'
            id='change-value-popout-close-button-container'
            sx={{
                display: 'flex',
                justifyContent: 'flex-end',
                width: '100%'
            }}
            >
            <Button
                component='button'
                id='change-value-popout-close-button'
                variant='contained'
                onClick={() => setIsOpen(false)}
                sx={{ width: 50, height: 45, mb: 1 }}
            >X</Button>
            </Box>
            {/* Window */}
            <Paper
                component='section'
                id='change-value-popout-window-container'
                sx={{ 
                    width: '100%',
                    height: '100%',
                }}
                >
                <Box component='section' id='change-value-popout-window-header-container' sx={{ height: '87%' }}>
                    <Typography
                        component='h4'
                        id='change-value-popout-window-header'
                        variant="h4"
                        sx={{
                            fontWeight: 700,
                            m: 2,
                            color: '#667eea'
                        }}
                        >{header}</Typography>
                        <Box component='section' id='change-value-popout-window-form-container' sx={{ m: 1, display: 'flex', flexWrap: 'wrap', overflow: 'auto' }} >
                            {children}
                        </Box>
                </Box>
                {/* Save Button */}
                <Box
                    component='section'
                    id='change-value-popout-window-save-button-container'
                    sx={{
                        display: 'flex',
                        justifyContent: 'flex-end',
                        width: '100%',
                        height: '10%'
                    }}
                >
                    <Button
                        component='button'
                        id='change-value-popout-window-save-button'
                        variant='contained'
                        onClick={onSaveClick}
                        sx={{ width: 75, height: 35, m: 2, mt: 0 }}
                        >Save</Button>
                </Box>
            </Paper>
        </Box>
    </Backdrop>
  );
}