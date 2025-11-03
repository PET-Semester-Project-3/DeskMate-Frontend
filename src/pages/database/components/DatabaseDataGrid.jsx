import * as React from 'react';
import { useNavigate } from "react-router";
import { DataGrid  } from '@mui/x-data-grid';
import { Box, Card, CardContent, CardActions, Button, Typography } from '@mui/material';

/* Controller */
export default function DatabaseDataGridController({ rows }) {
    
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
        <DatabaseDataGrid rows={rows} columns={gridColumns} />
    )
}

/* View */
export function DatabaseDataGrid({ rows, columns }) {
  return (
    <Box sx={{ height: 400, width: '100%' }}>
      <DataGrid
        rows={rows}
        columns={columns}
        initialState={{
          pagination: {
            paginationModel: {
              pageSize: 5,
            },
          },
        }}
        pageSizeOptions={[25, 50, 75, 100]}
        checkboxSelection
        disableRowSelectionOnClick
      />
    </Box>
  );
}