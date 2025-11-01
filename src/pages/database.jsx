import * as React from 'react';
import { Box, Typography } from '@mui/material';
import DatabaseEndpointCard from '../components/database/DatabaseEndpointCard'

const DATABASEENDPOINTS = 
[
  { id: 1, name: "Desks", description: "The desks available in the system.", endpoint: "/desks" },
  { id: 2, name: "Users", description: "The users that exists in the system.", endpoint: "/users" },
  { id: 3, name: "Permissions", description: "The permissions set for the website.", endpoint: "/permissions" },
  { id: 4, name: "User To Desks", description: "The relationships for users and desks.", endpoint: "/userstodesks" },
  { id: 5, name: "User To Permissions", description: "The relationships for users and permissions.", endpoint: "/userstopermissions" }
]

/* Controller */
export default function DatabasePageController() {
  return (
    <DatabasePage databaseEndpoints={DATABASEENDPOINTS} />
  )
}

/* View */
export function DatabasePage({ databaseEndpoints }) {
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
        <Box sx={{ display: 'flex', flexWrap: 'wrap' }}>
          {databaseEndpoints.map(dbep => {
            return <DatabaseEndpointCard dbep={dbep} ></DatabaseEndpointCard>
          })}
        </Box>
      </Box>
    </Box>
  );
}