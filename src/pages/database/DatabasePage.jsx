import * as React from 'react';
import { Box, Typography } from '@mui/material';
import DatabaseDataSelection from './components/DatabaseDataSelection'
import DatabaseDataGrid from './components/DatabaseDataGrid'
import DatabaseActionButtons from './components/DatabaseActionButtons'
import DatabaseObjectPopout from './components/DatabaseObjectPopout';
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

  const [selectedRows, setSelectedRows] = React.useState([]);

  const [isEditing, setIsEditing] = React.useState(false);

  const onSelectionChanged = (newSelectedTable) => {
    setSelectedTable(newSelectedTable);
  };

  const onRowSelectionModelChange = (rowSelectionModel, details) => {
    const selectedRows = tableRows.filter(row => {
      return rowSelectionModel.ids.has(row.id);
    });
    setSelectedRows(selectedRows);
  }

  const onEditingStateChange = () => {
    setIsEditing(!isEditing)
  }

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
    <DatabasePage 
      dbSelection={[...DBDATASELECTION]} 
      onSelectionChanged={onSelectionChanged} 
      rows={tableRows} 
      onRowSelectionModelChange={onRowSelectionModelChange}
      selectedRows={selectedRows}
      isEditing={isEditing}
      onEditingStateChange={onEditingStateChange}
    />
  )
}

/* View */
export function DatabasePage({ dbSelection, onSelectionChanged, rows, onRowSelectionModelChange, selectedRows, isEditing, onEditingStateChange }) {
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
        <Box sx={{ display: 'flex', flexDirection: 'row' }} >
          <Box sx={{ width: '80%' }} >
            <DatabaseDataSelection dbSelection={dbSelection} onSelectionChanged={onSelectionChanged} />
          </Box>
          <Box sx={{ width: '20%', display: 'flex', alignItems: 'flex-end' }} >
            <DatabaseActionButtons selectedEntries={selectedRows} onEditingStateChange={onEditingStateChange} />
          </Box>
        </Box>
        <Box sx={{ display: 'flex', flexWrap: 'wrap' }}>
          <DatabaseDataGrid rows={rows} onRowSelectionModelChange={onRowSelectionModelChange} />
        </Box>
      </Box>
      <DatabaseObjectPopout selectedEntries={selectedRows} open={isEditing} onEditingStateChange={onEditingStateChange} />
    </Box>
  );
}