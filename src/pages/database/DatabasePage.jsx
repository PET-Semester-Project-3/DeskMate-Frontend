import * as React from 'react';
import useSession from '../../models/SessionContext'
import RestrictedPage from '../restricted/RestrictedPage'
import { Box, Typography } from '@mui/material';
import DatabaseDataSelection from './components/DatabaseDataSelection'
import DatabaseDataGrid from './components/DatabaseDataGrid'
import DatabaseActionButtons from './components/DatabaseActionButtons'
import DatabaseObjectPopout from './components/DatabaseObjectPopout/DatabaseObjectPopout';
import { DESKS, USERSTODESKS, USERS, PERMISSIONS, USERTOPERMISSONS } from '../../../dummyData/dummyData';

const DBTABLESELECTION = [
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

  const [selectedTable, setSelectedTable] = React.useState(DBTABLESELECTION[0].name);
  const [tableRows, setTableRows] = React.useState([]);

  const [selectedRow, setSelectedRow] = React.useState();

  const [isEditing, setIsEditing] = React.useState(false);

  const onSelectionChanged = (newSelectedTable) => {
    setSelectedTable(newSelectedTable);
    setSelectedRow(null);
  };

  const onRowSelectionModelChange = (rowSelectionModel, details) => {
    const selectedRows = tableRows.filter(row => {
      return rowSelectionModel.ids.has(row.id);
    });
    if (selectedRows.length == 0)
      setSelectedRow(null);
    else
      setSelectedRow(selectedRows[0]);
  }

  const onEditingStateChange = () => {
    setIsEditing(!isEditing)
  }

  const onRemoveSelectedClick = () => {
    if (selectedRow != null){
      console.log(`Remove[${selectedTable}] (Id = ${selectedRow.id})`)
      console.log(selectedRow)
    }
    // BACKEND --> DB CONNECTION HERE
  }

  function onSaveObjectClick(object){
    if (object != null) {
      console.log(`Save[${selectedTable}] (Id = ${object.id})`)
      console.log(object)
    }
    else 
      console.log('Object was null')
    // BACKEND --> DB CONNECTION HERE
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
    <RestrictedPage 
      Page={(
        <DatabasePage 
          dbSelection={[...DBTABLESELECTION]} 
          onSelectionChanged={onSelectionChanged} 
          rows={tableRows} 
          onRowSelectionModelChange={onRowSelectionModelChange}
          selectedRow={selectedRow}
          isEditing={isEditing}
          onEditingStateChange={onEditingStateChange}
          onRemoveSelectedClick={onRemoveSelectedClick}
          onSaveObjectClick={onSaveObjectClick}
        />
      )}
    />
  )
}

/* View */
export function DatabasePage({ dbSelection, onSelectionChanged, rows, onRowSelectionModelChange, selectedRow, isEditing, onEditingStateChange, onRemoveSelectedClick, onSaveObjectClick }) {
  return (
    <Box component='main' id='database-page' sx={{ boxShadow: 2 }}>
      <Typography
        component='h4'
        id='database-page-header'
        variant="h4"
        sx={{
          fontWeight: 700,
          mb: 3,
          color: '#667eea'
        }}
      >
        Database Management
      </Typography>
      <Box component='section' id='database-data-container' >
        <Box component='section' id='database-data-selector-actions-container' sx={{ display: 'flex', flexDirection: 'row' }} >
          <Box component='section' id='database-data-selector-container' sx={{ width: '70%' }} >
            <DatabaseDataSelection 
              dbSelection={dbSelection} 
              onSelectionChanged={onSelectionChanged}
            />
          </Box>
          <Box component='section' id='database-data-actions-container' sx={{ width: '30%', display: 'flex', alignItems: 'flex-end' }} >
            <DatabaseActionButtons 
              selectedEntry={selectedRow} 
              onEditingStateChange={onEditingStateChange}
              onRemoveSelectedClick={onRemoveSelectedClick}
            />
          </Box>
        </Box>
        <Box component='section' id='database-data-grid-container' sx={{ display: 'flex', flexWrap: 'wrap' }}>
          <DatabaseDataGrid 
            rows={rows} 
            onRowSelectionModelChange={onRowSelectionModelChange} 
          />
        </Box>
      </Box>
      <Box component='section' id='database-data-object-popout-container' >
        <DatabaseObjectPopout 
          selectedEntry={selectedRow} 
          isOpen={isEditing} 
          onEditingStateChange={onEditingStateChange} 
          schematicObject={rows[0] != null ? rows[0] : null} 
          onSaveClick={onSaveObjectClick}
        />
      </Box>
      
    </Box>
  );
}