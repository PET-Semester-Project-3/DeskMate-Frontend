import * as React from 'react';
import { Box, Button } from '@mui/material';

/* Controller */
export default function DatabaseActionButtonsController({ selectedEntry, onEditingStateChange, onRemoveSelectedClick }) {
    
    const [entry, setEntry] = React.useState();
    
    React.useEffect(() => {
        setEntry({...selectedEntry});
    }, [selectedEntry])

    return (
        <DatabaseActionButtons 
          entry={entry} 
          onEditingStateChange={onEditingStateChange}
          onRemoveSelectedClick={onRemoveSelectedClick}
        />
    )
}

/* View */
export function DatabaseActionButtons({ entry, onEditingStateChange, onRemoveSelectedClick }) {
  return (
    <Box component='div' id='database-data-actions' sx={{ width: '100%', display: 'flex', justifyContent: 'flex-end' }}>
      {
        ( entry != null && entry.id != null ) ?
        (
            <Box component='section' id='database-data-actions-selected-container' >
                <Button
                  component='button'
                  id='database-data-actions-edit-button'
                  variant='contained' 
                  onClick={onEditingStateChange}
                  sx={{ mb: 1, ml: 1 }}
                >Edit Selected</Button>
                <Button
                  component='button'
                  id='database-data-actions-remove-button'
                  variant='contained'
                  onClick={onRemoveSelectedClick}
                  sx={{ mb: 1, ml: 1 }} 
                >Remove Selected</Button>
            </Box>
        )
        : (
          <Button
            component='button'
            id='database-data-actions-create-button'
            variant='contained' 
            onClick={onEditingStateChange}
            sx={{ mb: 1 }} 
          >Create New</Button>
        )
      }
    </Box>
  );
}