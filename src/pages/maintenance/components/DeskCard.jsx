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
      component='div'
      id='desk-card'
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
      <CardContent component='section' id='desk-card-content' sx={{ position: 'relative' }}>
        {desk.lasterrors && desk.lasterrors.length > 0 && (
          <Box component='section' id='desk-errors-container' sx={{ position: 'absolute', top: 16, left: 16 }}>
            <IconButton
              component='button'
              id='desk-errors-button'
              aria-describedby={id}
              onClick={handleClick}
              sx={{ p: 0 }}
            >
              <Badge id='desk-errors-button-badge' badgeContent={desk.lasterrors.length} color="error">
                <WarningIcon id='desk-errors-button-badge-icon' color="warning" />
              </Badge>
            </IconButton>
            <Popover
              component='section'
              id={'desk-errors-popover-' + id}
              open={open}
              anchorEl={anchorEl}
              onClose={handleClose}
              anchorOrigin={{
                vertical: 'bottom',
                horizontal: 'left',
              }}
            >
              <Box component='section' id='desk-errors-popover-header-container' sx={{ p: 2, maxWidth: 300 }}>
                <Typography component='h6' id='desk-errors-popover-header' variant="subtitle2" sx={{ mb: 1, fontWeight: 'bold' }}>
                  Last Errors:
                </Typography>
                <Box component='span' id='desk-errors-popover-list-container' sx={{ display: 'flex', flexDirection: 'column', gap: 0.5 }}>
                  {desk.lasterrors.map((error, index) => (
                    <Chip
                      component='div'
                      id={'desk-errors-popover-list-element-' + error}
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
          component='section'
          id='desk-image-container'
          sx={{
            display: 'flex',
            justifyContent: 'center',
            alignItems: 'center',
            fontSize: '4rem',
            mb: 2,
          }}
        >
          <img id='desk-image' src={deskImage} width={150} height={150}></img>
        </Box>

        {/* Desk Name */}
        <Typography
          component='h5'
          id='desk-name-header'
          variant="h5"
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
        <Box component='section' id='desk-status-container' sx={{ display: 'flex', justifyContent: 'center', alignItems: 'center', mb: 2, gap: 1 }}>
          <Typography component='p' id='desk-status-header' variant="body2" color={isOnline ? 'success.main' : 'error.main'}>
            {isOnline ? 'Online' : 'Offline'}
          </Typography>
          <Switch
            component='form'
            id='desk-status-switch'
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
        <Box component='section' id='desk-details-container' sx={{ display: 'flex', flexDirection: 'column', gap: 1 }}>
          <Box component='span' id='desk-details-manufacturer-container' sx={{ display: 'flex', justifyContent: 'space-between' }}>
            <Typography component='label' id='desk-details-manufacturer-header' variant="body2" color="text.secondary">
              Manufacturer:
            </Typography>
            <Typography component='p' id='desk-details-manufacturer-value' variant="body2" fontWeight="medium">
              {desk.manufacturer}
            </Typography>
          </Box>

          <Box component='span' id='desk-details-position-container' sx={{ display: 'flex', justifyContent: 'space-between' }}>
            <Typography component='label' id='desk-details-position-header' variant="body2" color="text.secondary">
              Position:
            </Typography>
            <Typography component='p' id='desk-details-position-value' variant="body2" fontWeight="medium">
              {desk.height} cm
            </Typography>
          </Box>

          <Box component='span' id='desk-details-activationcount-container' sx={{ display: 'flex', justifyContent: 'space-between' }}>
            <Typography component='label' id='desk-details-activationcount-header' variant="body2" color="text.secondary">
              Activation Count:
            </Typography>
            <Typography component='p' id='desk-details-activationcount-value' variant="body2" fontWeight="medium">
              {desk.activationcounter}
            </Typography>
          </Box>

          <Box component='span' id='desk-details-sitstandcount-container' sx={{ display: 'flex', justifyContent: 'space-between' }}>
            <Typography component='label' id='desk-details-sitstandcount-header' variant="body2" color="text.secondary">
              Sit/Stand Count:
            </Typography>
            <Typography component='p' id='desk-details-sitstandcount-value' variant="body2" fontWeight="medium">
              {desk.sitstandcounter}
            </Typography>
          </Box>
        </Box>
      </CardContent>
    </Card>
  );
}
