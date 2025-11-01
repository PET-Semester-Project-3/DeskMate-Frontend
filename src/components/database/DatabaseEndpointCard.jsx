import * as React from 'react';
import { useNavigate } from "react-router";
import { Card, CardContent, CardActions, Button, Typography } from '@mui/material';

/* Controller */
export function DatabaseEndpointCardController() {
    const { dbep } = props;
    let navigate = useNavigate();
    return (
        <DatabaseEndpointCard dbep={dbep} navigate={navigate} />
    )
}

/* View */
export function DatabaseEndpointCard({ dbep, navigate }) {
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