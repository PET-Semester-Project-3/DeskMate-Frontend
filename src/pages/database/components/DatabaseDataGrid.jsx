import * as React from 'react';
import { DataGrid  } from '@mui/x-data-grid';
import { Box } from '@mui/material';

/* Controller */
export default function DatabaseDataGridController({ rows, onRowSelectionModelChange }) {
    
    const [gridColumns, setGridColumns] = React.useState([]);

    React.useEffect(() => {
        if (rows == null ||rows.length == 0)
            return;
        var propertyColumns = [];
        Object.getOwnPropertyNames(rows[0]).forEach(property => {
            propertyColumns.push({
                field: property,
                headerName: property.toUpperCase(),
                width: 50 + property.length * 10
            })
        });
        setGridColumns(propertyColumns);
    }, [rows]);
    
    return (
        <DatabaseDataGrid rows={rows} columns={gridColumns} onRowSelectionModelChange={onRowSelectionModelChange} />
    )
}

/* View */
export function DatabaseDataGrid({ rows, columns, onRowSelectionModelChange }) {
  return (
    <Box sx={{ width: '100%' }}>
      <DataGrid
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
      />
    </Box>
  );
}