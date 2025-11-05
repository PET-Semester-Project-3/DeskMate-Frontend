import * as React from 'react';
import { Box, Button } from '@mui/material';

/* Controller */
export default function DatabaseActionButtonsController({ selectedEntries, onEditingStateChange }) {
    
    const [entries, setEntries] = React.useState([]);
    
    React.useEffect(() => {
        setEntries(selectedEntries);
    }, [selectedEntries])

    return (
        <DatabaseActionButtons entries={entries} onEditingStateChange={onEditingStateChange} />
    )
}

/* View */
export function DatabaseActionButtons({ entries, onEditingStateChange }) {
  return (
    <Box sx={{ width: '100%', display: 'flex', justifyContent: 'flex-end' }}>
      <Button 
        variant='contained' 
        onClick={onEditingStateChange}
        sx={{ mb: 1 }} >Create New</Button>
      {
        entries.length > 0 ?
        (
            <Box>
                <Button variant='contained' sx={{ mb: 1, ml: 1 }} >Edit Selected</Button>
                <Button variant='contained' sx={{ mb: 1, ml: 1 }} >Remove Selected</Button>
            </Box>
        )
        : null
      }
    </Box>
  );
}