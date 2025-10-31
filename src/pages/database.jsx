import * as React from 'react';
import { useNavigate } from "react-router";
import { Box, Card, CardContent, CardActions, Button, Typography } from '@mui/material';

const databaseendpoints = 
[
  { id: 1, name: "Desks", description: "The desks available in the system.", endpoint: "/desks" },
  { id: 2, name: "Users", description: "The users that exists in the system.", endpoint: "/users" },
  { id: 3, name: "Permissions", description: "The permissions set for the website.", endpoint: "/permissions" },
  { id: 4, name: "User To Desks", description: "The relationships for users and desks.", endpoint: "/userstodesks" },
  { id: 5, name: "User To Permissions", description: "The relationships for users and permissions.", endpoint: "/userstopermissions" }
]

function DatabaseEndpointCard(props) {
  const { dbep } = props;
  let navigate = useNavigate();
  return (
    <Card id={dbep.id} key='dbtablecard' sx={{ m: 1, minWidth: '250px' }}>
      <CardContent>
        <Typography variant='h6' gutterBottom>{dbep.name}</Typography>
        <Typography variant='body1' gutterBottom>{dbep.description}</Typography>
        <Typography variant='caption' gutterBottom sx={{ display: 'block' }}>{dbep.endpoint}</Typography>
      </CardContent>
      <CardActions>
        <Button
          variant="contained"
          size="small"
          onClick={() => navigate('.' + dbep.endpoint)}
          sx={{
            background: 'linear-gradient(135deg, #667eea 0%, #764ba2 100%)',
            '&:hover': {
              background: 'linear-gradient(135deg, #764ba2 0%, #667eea 100%)',
            }
          }}
        >Access</Button>
      </CardActions>
    </Card>
  );
}

export default function DatabasePage() {
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
          {databaseendpoints.map(dbep => {
            return <DatabaseEndpointCard dbep={dbep} ></DatabaseEndpointCard>
          })}
        </Box>
      </Box>
    </Box>
  );
}