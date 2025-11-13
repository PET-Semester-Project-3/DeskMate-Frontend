import * as React from 'react';
import {
  Box,
  Card,
  Typography,
  TextField,
  Slider,
  Switch,
  FormControlLabel,
  Alert,
  Grid,
  Stack,
  IconButton,
} from '@mui/material';
import CheckIcon from '@mui/icons-material/Check';
import EditIcon from '@mui/icons-material/Edit';
import deskImage from '../../../assets/desk.png';

/* Controller */
export default function DeskViewController({ desk }){

  const [deskName, setDeskName] = React.useState(desk.name);
  const [tempName, setTempName] = React.useState(desk.name);
  const [isEditingName, setIsEditingName] = React.useState(false);
  const [height, setHeight] = React.useState(desk.position);
  const [isOnline, setIsOnline] = React.useState(desk.status === 'Online');

  const handleNameConfirm = () => {
    setDeskName(tempName);
    setIsEditingName(false);
  };

  const handleNameEdit = () => {
    setIsEditingName(true);
  };

  return (
    <DeskView 
      deskName={deskName}
      desk={desk}
      tempName={tempName}
      isEditingName={isEditingName} 
      height={height} 
      isOnline={isOnline} 
      setTempName={setTempName}
      setHeight={setHeight}
      setIsOnline={setIsOnline}
      handleNameConfirm={handleNameConfirm} 
      handleNameEdit={handleNameEdit}
    />
  )
}

/* View */
export function DeskView({ deskName, desk, tempName, isEditingName, height, isOnline, setTempName, setHeight, setIsOnline, handleNameConfirm, handleNameEdit }) {
  return (
    <Card id='desk-view' sx={{ mb: 3, p: 3 }}>
      <Grid id='desk-view-grid' container spacing={4}>
        {/* Left Panel - Controls */}
        <Grid id='desk-view-grid-left-panel' item xs={12} md={6}>
          <Stack id='desk-view-left-panel-list' spacing={3}>
            {/* Desk Name */}
            <Box id='desk-view-left-panel-desk-container' sx={{ display: 'flex', gap: 1, alignItems: 'flex-start' }}>
              <TextField
                id='desk-view-left-panel-desk-name-textfield'
                label="Desk Name"
                value={isEditingName ? tempName : deskName}
                onChange={(e) => setTempName(e.target.value)}
                fullWidth
                variant="outlined"
                disabled={!isEditingName}
              />
              {isEditingName ? (
                <IconButton
                  id='desk-view-left-panel-desk-name-edit-check-button'
                  color="primary"
                  onClick={handleNameConfirm}
                  sx={{ mt: 1 }}
                >
                  <CheckIcon id='desk-view-left-panel-desk-name-check-icon' />
                </IconButton>
              ) : (
                <IconButton
                  id='desk-view-left-panel-desk-name-edit-icon-button'
                  color="default"
                  onClick={handleNameEdit}
                  sx={{ mt: 1 }}
                >
                  <EditIcon id='desk-view-left-panel-desk-name-icon-edit' />
                </IconButton>
              )}
            </Box>

            {/* Manufacturer Info */}
            <Typography id='desk-view-left-panel-manufacturer-header' variant="caption" color="text.secondary">
              Manufacturer: {desk.manufacturer}
            </Typography>

            {/* Height Control */}
            <Box id='desk-view-left-panel-height-container' >
              <Typography id='desk-view-left-panel-height-header' gutterBottom>Height: {height} cm</Typography>
              <Slider
                id='desk-view-left-panel-height-slider'
                value={height}
                onChange={(_, newValue) => setHeight(newValue)}
                min={60}
                max={130}
                valueLabelDisplay="auto"
              />
            </Box>

            {/* Power Toggle */}
            <FormControlLabel
              id='desk-view-left-panel-power-container'
              control={
                <Switch
                  id='desk-view-left-panel-power-switch'
                  checked={isOnline}
                  onChange={(e) => setIsOnline(e.target.checked)}
                  color="primary"
                />
              }
              label={isOnline ? 'Online' : 'Offline'}
            />

            {/* Error Warnings */}
            {desk.lasterrors && desk.lasterrors.length > 0 && (
              <Alert id='desk-view-left-panel-error-alert' severity="warning">
                <Typography id='desk-view-left-panel-error-alert-header' variant="subtitle2" gutterBottom>
                  Errors detected:
                </Typography>
                <ul id='desk-view-left-panel-error-alert-entry-list' style={{ margin: 0, paddingLeft: 20 }}>
                  {desk.lasterrors.map((error, index) => (
                    <li id={'desk-view-left-panel-error-alert-entry-' + index} key={index}>{error}</li>
                  ))}
                </ul>
              </Alert>
            )}
          </Stack>
        </Grid>

        {/* Right Panel - Desk Visualization */}
        <Grid id='desk-view-grid-right-panel' item xs={12} md={6}>
          <Box
            id='desk-view-grid-right-panel-desk-image-container'
            sx={{
              display: 'flex',
              alignItems: 'center',
              justifyContent: 'center',
              height: '100%',
            }}
          >
            <img
              id='desk-view-grid-right-panel-desk-image'
              src={deskImage}
              alt="Desk"
              style={{
                width: '100%',
                maxWidth: '500px',
                height: 'auto',
              }}
            />
          </Box>
        </Grid>
      </Grid>
    </Card>
  );
}
