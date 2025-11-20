import * as React from 'react';
import {
  Card,
  CardContent,
  Typography,
  Box,
  Chip,
  Divider,
  Switch,
} from '@mui/material';
import deskImage from '../../../assets/desk.png';

/* Controller */
export default function SmallDeskCardController({ desk }) {

  const [isOnline, setIsOnline] = React.useState(desk.status === 'Online');

  const handleSwitchChange = (event) => {
    const newStatus = event.target.checked;
    setIsOnline(newStatus);
  };

  return (
    <SmallDeskCard 
      desk={desk}
      isOnline={isOnline}
      handleSwitchChange={handleSwitchChange}
    />
  )
}

/* View */
export function SmallDeskCard({ desk, isOnline, handleSwitchChange }) {
  return (
    <Card
        component='div'
        id='desk-card'
        sx={{
            minWidth: 275,
            maxWidth: 300,
            boxShadow: 3,
            borderRadius: '16px',
            border: '2px solid transparent',
            transition: 'transform 0.2s, box-shadow 0.2s ease','&:hover': {
                transform: 'scale(1.02)',
                boxShadow: '0px 0px 6px 4px rgba(155, 133, 216, 0.3)',
            },
        }}
    >
      <CardContent>
        <Box component='div' id='desk-card-header' sx={{ display: 'flex', justifyContent: 'space-between', alignItems: 'center', mb: 2 }}>
          <Typography
            component='h5'
            id='desk-card-name'
            variant="h5"
            sx={{ fontWeight: 600 }}
            >
            {desk.name}
            </Typography>
            <Chip
                label={isOnline ? 'Online' : 'Offline'}
                color={isOnline ? 'success' : 'default'}
                size='small'
            />
        </Box>
        <Box component='div' id='desk-card-image-container' sx={{ display: 'flex', justifyContent: 'center', mb: 2 }}>
            <img src={deskImage} alt='Desk' style={{ width: '100px', height: '100px' }} />
        </Box>
        <Divider sx={{ mb: 2 }} />
        <Box component='div' id='desk-card-status-container' sx={{ display: 'flex', justifyContent: 'space-between', alignItems: 'center' }}>
            <Typography
                component='p'
                id='desk-card-status-text'
                sx={{ fontWeight: 500 }}
            >

                Status:
            </Typography>
            <Switch
                component='form'
                id='desk-card-status-switch'
                checked={isOnline}
                onChange={handleSwitchChange}
                color={isOnline ? 'success' : 'error'}
                sx={{
                  '& .MuiSwitch-switchBase.Mui-checked': {
                        color: 'success.main',
                    },
                    '& .MuiSwitch-switchBase': {
                        color: 'error.main',
                    },
                }}
            />
        </Box>
      </CardContent>
    </Card>
  );
}
