import * as React from 'react';
import { Box, Typography } from '@mui/material';
import DatabaseDataSelection from './components/DatabaseDataSelection'
import DatabaseDataGrid from './components/DatabaseDataGrid'
import { DESKS, USERSTODESKS, USERS, PERMISSIONS, USERTOPERMISSONS } from '../../../dummyData/dummyData';

const DBDATASELECTION = [
    {
        name: 'Desks',
    },
    {
        name: 'Users',
    },
    {
        name: 'User To Desks',
    },
    {
        name: 'Permissions',
    },
    {
        name: 'User To Permissions',
    },
]

/* Controller */
export default function DatabasePageController() {

  const [selectedTable, setSelectedTable] = React.useState(DBDATASELECTION[0].name);
  const [tableRows, setTableRows] = React.useState([]);

  const onSelectionChanged = (newSelectedTable) => {
    setSelectedTable(newSelectedTable);
  };

  React.useEffect(() => {
    switch(selectedTable){
      case 'Desks':
        setTableRows(DESKS);
        break;
      case 'Users':
        setTableRows(USERS);
        break;
      case 'User To Desks':
        setTableRows(USERSTODESKS);
        break;
      case 'Permissions':
        setTableRows(PERMISSIONS);
        break;
      case 'User To Permissions':
        setTableRows(USERTOPERMISSONS);
        break;
    };
  }, [selectedTable])

  return (
    <DatabasePage dbSelection={[...DBDATASELECTION]} onSelectionChanged={onSelectionChanged} rows={tableRows} />
  )
}

/* View */
export function DatabasePage({ dbSelection, onSelectionChanged, rows }) {
  return (
    <Box sx={{ boxShadow: 2 }}>
      <Typography
        variant="h4"
        sx={{
          fontWeight: 700,
          mb: 3,
          color: '#667eea'
        }}
      >
        Database Management
      </Typography>
      <Box>
        <DatabaseDataSelection dbSelection={dbSelection} onSelectionChanged={onSelectionChanged} />
        <Box sx={{ display: 'flex', flexWrap: 'wrap' }}>
          <DatabaseDataGrid rows={rows} />
        </Box>
      </Box>
    </Box>
  );
}