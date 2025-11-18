import * as React from 'react';
import useSession from '../../models/SessionContext'
import RestrictedPage from '../restricted/RestrictedPage'
import { Box, Typography } from '@mui/material';
import DatabaseDataSelection from './components/DatabaseDataSelection'
import DatabaseDataGrid from './components/DatabaseDataGrid'
import DatabaseActionButtons from './components/DatabaseActionButtons'
import DatabaseObjectPopout from './components/DatabaseObjectPopout/DatabaseObjectPopout';
import { DESKS, USERSTODESKS, USERS, PERMISSIONS, USERTOPERMISSONS } from '../../../dummyData/dummyData';
import { asyncGetDesks } from '../../models/api-comm/APIDesk';
import { asyncGetUsers } from '../../models/api-comm/APIUsers';
import { asyncGetPermissions } from '../../models/api-comm/APIPermission';

const DBTABLESELECTION = [
    {
        name: 'Desks',
        canCreateNew: true,
        blackListedProperties: ['id', 'last_data', 'last_data_at' , 'created_at', 'updated_at'],
        requiredProperties: ['name', 'manufacturer'],
        getAll: asyncGetDesks
      },
    {
        name: 'Users',
        canCreateNew: false,
        blackListedProperties: ['id', 'created_at', 'updated_at'],
        requiredProperties: ['email'],
        getAll: asyncGetUsers
    },
    {
        name: 'Controllers',
        canCreateNew: false,
        blackListedProperties: ['id'],
        requiredProperties: ['name'],
        getAll:  /*asyncGetScheduledTasks()*/ () => { return [] }
    },
    {
        name: 'Permissions',
        canCreateNew: true,
        blackListedProperties: ['id', 'created_at', 'updated_at'],
        requiredProperties: ['label', 'route'],
        getAll: asyncGetPermissions
    },
    {
        name: 'Scheduled Tasks',
        canCreateNew: true,
        blackListedProperties: ['id', 'created_at', 'updated_at'],
        requiredProperties: ['desk_id', 'user_id', 'description', 'new_height', 'scheduled_at', 'status'],
        getAll: /*asyncGetScheduledTasks()*/ () => { return [] }
    },
    {
        name: 'User To Desks',
        canCreateNew: true,
        blackListedProperties: ['id', 'created_at', 'updated_at'],
        requiredProperties: ['user_id', 'desk_id'],
        getAll: () => [...USERSTODESKS]
    },
    {
        name: 'User To Permissions',
        canCreateNew: true,
        blackListedProperties: ['id', 'created_at', 'updated_at'],
        requiredProperties: ['user_id', 'permission_id'],
        getAll: () => [...USERTOPERMISSONS]
    }
]

/* Controller */
export default function DatabasePageController() {

  const [waitingForResponse, setWaitingForResponse] = React.useState(false);

  const [selectedTable, setSelectedTable] = React.useState(DBTABLESELECTION[0]);
  const [tableRows, setTableRows] = React.useState([]);

  const [selectedRow, setSelectedRow] = React.useState();

  const [isEditing, setIsEditing] = React.useState(false);

  const onSelectionChanged = (newSelectedTable) => {
    setSelectedTable(DBTABLESELECTION.find(sel => sel.name == newSelectedTable));
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
      console.log(`Remove[${selectedTable.name}] (Id = ${selectedRow.id})`, selectedRow)
      // BACKEND --> DB CONNECTION HERE
    }
    else {
      console.log('No selected row to remove')
      return;
    }
  }

  function onSaveObjectClick(object, newObject){
    if (object != null){
      if (newObject){
        console.log(`Create New[${selectedTable.name}]`, object)
      }
      else{
        console.log(`Update[${selectedTable.name}] (Id = ${object.id})`, object)
      }
      // BACKEND --> DB CONNECTION HERE
      setIsEditing(false);
    }
    else{
      console.log('Object was null')
      return;
    }
  }

  React.useEffect(() => {
    async function getTableData() {
      setWaitingForResponse(true);
      setTableRows([]);
      var rows = [];
      rows = await selectedTable.getAll();
      console.log('Fetched Data for Table:', selectedTable.name, rows);
      if (rows != null && rows.success == null){
        setTableRows(rows);
      }
      setWaitingForResponse(false);
    }
    getTableData();
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
          selectedTable={selectedTable}
          isEditing={isEditing}
          onEditingStateChange={onEditingStateChange}
          onRemoveSelectedClick={onRemoveSelectedClick}
          onSaveObjectClick={onSaveObjectClick}
          waitingForResponse={waitingForResponse}
        />
      )}
    />
  )
}

/* View */
export function DatabasePage({ dbSelection, onSelectionChanged, rows, onRowSelectionModelChange, selectedRow, selectedTable, isEditing, onEditingStateChange, onRemoveSelectedClick, onSaveObjectClick, waitingForResponse }) {
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
              canCreateNew={selectedTable.canCreateNew}
            />
          </Box>
        </Box>
        <Box component='section' id='database-data-grid-container' sx={{ display: 'flex', flexWrap: 'wrap' }}>
          <DatabaseDataGrid 
            rows={rows} 
            onRowSelectionModelChange={onRowSelectionModelChange}
            waitingForResponse={waitingForResponse}
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
          blackListedProperties={selectedTable.blackListedProperties}
          requiredProperties={selectedTable.requiredProperties}
        />
      </Box>
      
    </Box>
  );
}