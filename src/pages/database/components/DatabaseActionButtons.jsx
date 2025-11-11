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
    <Box sx={{ width: '100%', display: 'flex', justifyContent: 'flex-end' }}>
      {
        ( entry != null && entry.id != null ) ?
        (
            <Box>
                <Button 
                  variant='contained' 
                  onClick={onEditingStateChange}
                  sx={{ mb: 1, ml: 1 }}
                >Edit Selected</Button>
                <Button 
                  variant='contained'
                  onClick={onRemoveSelectedClick}
                  sx={{ mb: 1, ml: 1 }} 
                >Remove Selected</Button>
            </Box>
        )
        : (
          <Button 
            variant='contained' 
            onClick={onEditingStateChange}
            sx={{ mb: 1 }} 
          >Create New</Button>
        )
      }
    </Box>
  );
}