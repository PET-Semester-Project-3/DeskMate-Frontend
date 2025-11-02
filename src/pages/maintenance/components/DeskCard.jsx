import * as React from 'react';
import {
  Card,
  CardContent,
  Typography,
  Box,
  Badge,
  Chip,
  Divider,
  Popover,
  IconButton,
  Switch,
} from '@mui/material';
import WarningIcon from '@mui/icons-material/Warning';
import deskImage from '../../../assets/desk.png';

/* Controller */
export default function DeskCardController({ desk }) {

  const [anchorEl, setAnchorEl] = React.useState(null);
  const [isOnline, setIsOnline] = React.useState(desk.status === 'Online');

  const handleClick = (event) => {
    setAnchorEl(event.currentTarget);
  };

  const handleClose = () => {
    setAnchorEl(null);
  };

  const handleSwitchChange = (event) => {
    const newStatus = event.target.checked;
    setIsOnline(newStatus);
  };

  const open = Boolean(anchorEl);
  const id = open ? 'error-popover' : undefined;

  return (
    <DeskCard 
      desk={desk}
      anchorEl={anchorEl}
      isOnline={isOnline}
      handleClick={handleClick}
      handleClose={handleClose}
      handleSwitchChange={handleSwitchChange}
      open={open}
      id={id}
    />
  )
}

/* View */
export function DeskCard({ desk, anchorEl, isOnline, handleClick, handleClose, handleSwitchChange, open, id }) {
  return (
    <Card
      sx={{
        minWidth: 275,
        maxWidth: 350,
        borderRadius: 3,
        boxShadow: 3,
        border: '2px solid',
        borderImage: 'linear-gradient(135deg, #667eea 0%, #764ba2 100%) 1',
        transition: 'transform 0.3s ease, box-shadow 0.3s ease',
        '&:hover': {
          transform: 'translateY(-8px)',
          boxShadow: '0 12px 24px rgba(102, 126, 234, 0.3)',
        },
      }}
    >
      <CardContent sx={{ position: 'relative' }}>
        {desk.lasterrors && desk.lasterrors.length > 0 && (
          <Box sx={{ position: 'absolute', top: 16, left: 16 }}>
            <IconButton
              aria-describedby={id}
              onClick={handleClick}
              sx={{ p: 0 }}
            >
              <Badge badgeContent={desk.lasterrors.length} color="error">
                <WarningIcon color="warning" />
              </Badge>
            </IconButton>
            <Popover
              id={id}
              open={open}
              anchorEl={anchorEl}
              onClose={handleClose}
              anchorOrigin={{
                vertical: 'bottom',
                horizontal: 'left',
              }}
            >
              <Box sx={{ p: 2, maxWidth: 300 }}>
                <Typography variant="subtitle2" sx={{ mb: 1, fontWeight: 'bold' }}>
                  Last Errors:
                </Typography>
                <Box sx={{ display: 'flex', flexDirection: 'column', gap: 0.5 }}>
                  {desk.lasterrors.map((error, index) => (
                    <Chip
                      key={index}
                      label={error}
                      size="small"
                      color="warning"
                      sx={{ fontSize: '0.75rem' }}
                    />
                  ))}
                </Box>
              </Box>
            </Popover>
          </Box>
        )}

        <Box
          sx={{
            display: 'flex',
            justifyContent: 'center',
            alignItems: 'center',
            fontSize: '4rem',
            mb: 2,
          }}
        >
          <img src={deskImage} width={150} height={150}></img>
        </Box>

        {/* Desk Name */}
        <Typography
          variant="h5"
          component="div"
          sx={{
            textAlign: 'center',
            fontWeight: 'bold',
            mb: 1,
            color: '#818cf8',
          }}
        >
          {desk.name}
        </Typography>

        {/* Status Switch */}
        <Box sx={{ display: 'flex', justifyContent: 'center', alignItems: 'center', mb: 2, gap: 1 }}>
          <Typography variant="body2" color={isOnline ? 'success.main' : 'error.main'}>
            {isOnline ? 'Online' : 'Offline'}
          </Typography>
          <Switch
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

        <Divider sx={{ mb: 2 }} />

        {/* Desk Details */}
        <Box sx={{ display: 'flex', flexDirection: 'column', gap: 1 }}>
          <Box sx={{ display: 'flex', justifyContent: 'space-between' }}>
            <Typography variant="body2" color="text.secondary">
              Manufacturer:
            </Typography>
            <Typography variant="body2" fontWeight="medium">
              {desk.manufacturer}
            </Typography>
          </Box>

          <Box sx={{ display: 'flex', justifyContent: 'space-between' }}>
            <Typography variant="body2" color="text.secondary">
              Position:
            </Typography>
            <Typography variant="body2" fontWeight="medium">
              {desk.position} cm
            </Typography>
          </Box>

          <Box sx={{ display: 'flex', justifyContent: 'space-between' }}>
            <Typography variant="body2" color="text.secondary">
              Activation Count:
            </Typography>
            <Typography variant="body2" fontWeight="medium">
              {desk.activationcounter}
            </Typography>
          </Box>

          <Box sx={{ display: 'flex', justifyContent: 'space-between' }}>
            <Typography variant="body2" color="text.secondary">
              Sit/Stand Count:
            </Typography>
            <Typography variant="body2" fontWeight="medium">
              {desk.sitstandcounter}
            </Typography>
          </Box>
        </Box>
      </CardContent>
    </Card>
  );
}
