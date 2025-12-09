import * as React from "react"
import RestrictedPage from "../restricted/RestrictedPage"
import { Box, Typography } from "@mui/material"
import DatabaseDataSelection from "./components/DatabaseDataSelection"
import DatabaseDataGrid from "./components/DatabaseDataGrid"
import DatabaseActionButtons from "./components/DatabaseActionButtons"
import DatabaseObjectPopout from "./components/DatabaseObjectPopout/DatabaseObjectPopout"
import CreateUserPopout from "./components/DatabaseObjectPopout/CreateUserPopout"
import {
  asyncDeleteDesk,
  asyncGetDesks,
  asyncPostDesk,
  asyncPutDesk,
} from "../../models/api-comm/APIDesk"
import {
  asyncDeleteUser,
  asyncGetUsers,
  asyncPostUser,
  asyncPutUser,
} from "../../models/api-comm/APIUsers"
import {
  asyncDeletePermission,
  asyncGetPermissions,
  asyncPostPermission,
  asyncPutPermission,
} from "../../models/api-comm/APIPermission"
import {
  asyncDeleteController,
  asyncGetControllers,
  asyncPostController,
  asyncPutController,
} from "../../models/api-comm/APIController"
import {
  asyncDeleteScheduledTask,
  asyncGetScheduledTasks,
  asyncPostScheduledTask,
  asyncPutScheduledTask,
} from "../../models/api-comm/APIScheduleTask"
import {
  asyncDeleteDeskMate,
  asyncGetDeskMates,
  asyncPostDeskMate,
  asyncPutDeskMate,
} from "../../models/api-comm/APIDeskMate"
import { 
  asyncDeleteUserDesk,
  asyncGetUserDesks,
  asyncPostUserDesk,
  asyncPutUserDesk,
 } from "../../models/api-comm/APIUserDesk"
import { 
  asyncDeleteUserPermission,
  asyncGetUserPermissions,
  asyncPostUserPermission,
  asyncPutUserPermission,
 } from "../../models/api-comm/APIUserPermission"

const DBTABLESELECTION = [
  {
    name: "Desks",
    canCreateNew: true,
    blackListedProperties: ["last_data", "last_data_at", "created_at", "updated_at", "controller"],
    requiredProperties: ["id", "name", "manufacturer"],
    getAll: asyncGetDesks,
    post: asyncPostDesk,
    put: asyncPutDesk,
    delete: asyncDeleteDesk,
  },
  {
    name: "Users",
    canCreateNew: true,
    blackListedProperties: ["id", "created_at", "updated_at"],
    requiredProperties: ["email"],
    getAll: asyncGetUsers,
    post: asyncPostUser,
    put: asyncPutUser,
    delete: asyncDeleteUser,
  },
  {
    name: "Controllers",
    canCreateNew: false,
    blackListedProperties: ["id", "desks"],
    requiredProperties: ["name"],
    getAll: asyncGetControllers,
    post: asyncPostController,
    put: asyncPutController,
    delete: asyncDeleteController,
  },
  {
    name: "Permissions",
    canCreateNew: true,
    blackListedProperties: ["id", "created_at", "updated_at"],
    requiredProperties: ["label", "route"],
    getAll: asyncGetPermissions,
    post: asyncPostPermission,
    put: asyncPutPermission,
    delete: asyncDeletePermission,
  },
  {
    name: "Scheduled Tasks",
    canCreateNew: true,
    blackListedProperties: ["id", "created_at", "updated_at", "desk", "user"],
    requiredProperties: [
      "desk_id",
      "user_id",
      "description",
      "new_height",
      "scheduled_at",
      "status",
    ],
    getAll: asyncGetScheduledTasks,
    post: asyncPostScheduledTask,
    put: asyncPutScheduledTask,
    delete: asyncDeleteScheduledTask,
  },
  {
    name: "User To Desks",
    canCreateNew: true,
    blackListedProperties: ["id", "created_at", "updated_at", "user", "desk"],
    requiredProperties: ["user_id", "desk_id"],
    getAll: asyncGetUserDesks,
    post: asyncPostUserDesk,
    put: asyncPutUserDesk,
    delete: asyncDeleteUserDesk,
  },
  {
    name: "User To Permissions",
    canCreateNew: true,
    blackListedProperties: ["id", "created_at", "updated_at", "user", "permission"],
    requiredProperties: ["user_id", "permission_id"],
    getAll: asyncGetUserPermissions,
    post: asyncPostUserPermission,
    put: asyncPutUserPermission,
    delete: asyncDeleteUserPermission,
  },
  {
    name: "DeskMates",
    canCreateNew: true,
    blackListedProperties: ["id", "created_at", "updated_at", "user"],
    requiredProperties: ["name", "user_id"],
    getAll: asyncGetDeskMates,
    post: asyncPostDeskMate,
    put: asyncPutDeskMate,
    delete: asyncDeleteDeskMate,
  },
]

/* Controller */
export default function DatabasePageController() {
  const [waitingForResponse, setWaitingForResponse] = React.useState(false)

  const [selectedTable, setSelectedTable] = React.useState(DBTABLESELECTION[0])
  const [tableRows, setTableRows] = React.useState([])

  const [selectedRow, setSelectedRow] = React.useState()

  const [isEditing, setIsEditing] = React.useState(false)
  const [isCreateUserOpen, setIsCreateUserOpen] = React.useState(false)

  const onSelectionChanged = (newSelectedTable) => {
    setSelectedTable(DBTABLESELECTION.find((sel) => sel.name == newSelectedTable))
    setSelectedRow(null)
  }

  const onRowSelectionModelChange = (rowSelectionModel) => {
    const selectedRows = tableRows.filter((row) => {
      return rowSelectionModel.ids.has(row.id)
    })
    if (selectedRows.length == 0) setSelectedRow(null)
    else setSelectedRow(selectedRows[0])
  }

  const onEditingStateChange = () => {
    setIsEditing(!isEditing)
  }

  const onCreateUserClick = () => {
    setIsCreateUserOpen(true)
  }

  const onCreateUserClose = () => {
    setIsCreateUserOpen(false)
  }

  const onRemoveSelectedClick = async () => {
    if (selectedRow != null) {
      console.log(`Remove[${selectedTable.name}] (Id = ${selectedRow.id})`, selectedRow)
      const response = await selectedTable.delete(selectedRow.id)
      if (response.success != null && response.success == false) {
        console.log("Failed to delete object")
        return
      }
      getTableData()
    } else {
      console.log("No selected row to remove")
      return
    }
  }

  async function onSaveObjectClick(object) {
    if (object != null) {
      const missingProperties = selectedTable.requiredProperties.filter((prop) => {
        return object[prop] == null || object[prop] == ""
      })
      if (missingProperties.length > 0) return
      if (selectedRow == null) {
        console.log(`Create New[${selectedTable.name}]`, object)
        const response = await selectedTable.post(object)
        if (response.success != null && response.success == false) {
          console.log("Failed to create new object")
          return
        }
      } else {
        console.log(`Update[${selectedTable.name}] (Id = ${object.id})`, object)
        const response = await selectedTable.put(object)
        if (response.success != null && response.success == false) {
          console.log("Failed to create new object")
          return
        }
      }
      setIsEditing(false)
      getTableData()
    } else {
      console.log("Object was null")
      return
    }
  }

  const getTableData = React.useCallback(async () => {
    setWaitingForResponse(true)
    setTableRows([])
    var rows = []
    rows = await selectedTable.getAll()
    console.log("Fetched Data for Table:", selectedTable.name, rows)
    if (rows != null && rows.success == null) {
      setTableRows(rows)
    }
    setWaitingForResponse(false)
  }, [selectedTable])

  React.useEffect(() => {
    getTableData()
  }, [getTableData])

  return (
    <RestrictedPage
      Page={
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
          onCreateUserClick={onCreateUserClick}
          isCreateUserOpen={isCreateUserOpen}
          onCreateUserClose={onCreateUserClose}
          getTableData={getTableData}
        />
      }
    />
  )
}

/* View */
export function DatabasePage({
  dbSelection,
  onSelectionChanged,
  rows,
  onRowSelectionModelChange,
  selectedRow,
  selectedTable,
  isEditing,
  onEditingStateChange,
  onRemoveSelectedClick,
  onSaveObjectClick,
  waitingForResponse,
  onCreateUserClick,
  isCreateUserOpen,
  onCreateUserClose,
  getTableData,
}) {
  return (
    <Box component="main" id="database-page" sx={{ width: '100%' }}>
      <Box component="section" id="database-data-container">
        <Typography
        component="h4"
        id="database-page-header"
        variant="h4"
        sx={{
          fontWeight: 700,
          mb: 3,
          color: "#66ea7cff",
        }}
      >
        Database Management
      </Typography>
        <Box
          component="section"
          id="database-data-selector-actions-container"
          sx={{ display: "flex", flexDirection: "row", width: '100%' }}
        >
          <Box
            component="section"
            id="database-data-selector-container"
            sx={{ width: "70%" }}
          >
            <DatabaseDataSelection
              dbSelection={dbSelection}
              onSelectionChanged={onSelectionChanged}
            />
          </Box>
          <Box
            component="section"
            id="database-data-actions-container"
            sx={{ width: "30%", display: "flex", alignItems: "flex-end" }}
          >
            <DatabaseActionButtons
              selectedEntry={selectedRow}
              onEditingStateChange={onEditingStateChange}
              onRemoveSelectedClick={onRemoveSelectedClick}
              canCreateNew={selectedTable.canCreateNew}
              onCreateClick={selectedTable.name === "Users" ? onCreateUserClick : null}
            />
          </Box>
        </Box>
        <Box
          component="section"
          id="database-data-grid-container"
          sx={{ display: "flex", flexWrap: "wrap" }}
        >
          <DatabaseDataGrid
            rows={rows}
            onRowSelectionModelChange={onRowSelectionModelChange}
            waitingForResponse={waitingForResponse}
          />
        </Box>
      </Box>
      <Box component="section" id="database-data-object-popout-container">
        <DatabaseObjectPopout
          selectedEntry={selectedRow}
          isOpen={isEditing}
          onEditingStateChange={onEditingStateChange}
          schematicObject={rows[0] != null ? rows[0] : null}
          onSaveClick={onSaveObjectClick}
          blackListedProperties={selectedTable.blackListedProperties}
          requiredProperties={selectedTable.requiredProperties}
        />
        <CreateUserPopout
          isOpen={isCreateUserOpen}
          onClose={onCreateUserClose}
          onCreated={() => {
            getTableData()
          }}
        />
      </Box>
    </Box>
  )
}
