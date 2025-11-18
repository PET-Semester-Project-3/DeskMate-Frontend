import * as React from 'react';
import { DataGrid } from '@mui/x-data-grid';
import { CircularProgress } from '@mui/material';
import { Box } from '@mui/material';

/* Controller */
export default function DatabaseDataGridController({ rows, onRowSelectionModelChange, waitingForResponse }) {
    
    const [gridColumns, setGridColumns] = React.useState([]);

    React.useEffect(() => {
        if (rows == null || rows.length == 0)
            return;
        var propertyColumns = [];
        Object.getOwnPropertyNames(rows[0]).forEach(property => {
            propertyColumns.push({
                field: property,
                headerName: property.toUpperCase(),
                width: 100 + property.length * 15
            })
        });
        setGridColumns(propertyColumns);
    }, [rows]);
    
    return (
        <DatabaseDataGrid rows={rows} columns={gridColumns} onRowSelectionModelChange={onRowSelectionModelChange} waitingForResponse={waitingForResponse} />
    )
}

/* View */
export function DatabaseDataGrid({ rows, columns, onRowSelectionModelChange, waitingForResponse }) {
  return (
    <Box component='section' id='database-data-grid-container' sx={{ minHeight: 600, width: '100%', position: 'relative' }}>
      {
        waitingForResponse ?
        <Box 
          component={'section'} 
          id='database-data-grid-loading-container' 
          sx={{ 
            width: '100%', 
            height: '100%', 
            position: 'absolute', 
            backgroundColor: 'rgba(97, 92, 92, 0.7)', 
            display: 'flex', 
            justifyContent: 'center', 
            alignItems: 'center', 
            zIndex: 10 
          }}>
          <CircularProgress
            component='div'
            id='database-data-grid-circularprogress'
            size={60}
            sx={{
              color: 'primary.main',
            }}
          />
        </Box>
        : null
      }
      <DataGrid
        component='table'
        id='database-data-grid'
        rows={rows}
        columns={columns}
        initialState={{
          pagination: {
            paginationModel: {
              pageSize: 15,
            },
          },
        }}
        pageSizeOptions={[15, 25, 50, 100]}
        onRowSelectionModelChange={onRowSelectionModelChange}
        sx={{ width: '100%' }}
      >
      </DataGrid>
    </Box>
  );
}