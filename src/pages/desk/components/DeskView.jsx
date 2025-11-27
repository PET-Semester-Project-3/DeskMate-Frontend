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
import { asyncPutDesk } from '../../../models/api-comm/APIDesk';

/* Controller */
export default function DeskViewController({ desk }){

  const [deskName, setDeskName] = React.useState(desk.name);
  const [tempName, setTempName] = React.useState(desk.name);
  const [isEditingName, setIsEditingName] = React.useState(false);
  const [height, setHeight] = React.useState(desk.last_data.height);
  const [isOnline, setIsOnline] = React.useState(desk.is_online);

  const handleNameConfirm = async () => {
    setDeskName(tempName);
    await asyncPutDesk(desk.id, { name: tempName });
    setIsEditingName(false);
  };

  const handleHeightChange = (_, newValue) => {
    setHeight(newValue);
  };

  const handleSwitchChange = async (_, newValue) => {
    setIsOnline(newValue);
    await asyncPutDesk(desk.id, { is_online: newValue });
  };

  const handleHeightCommit = async (_, newValue) => {
    desk.last_data.height = newValue;
    await asyncPutDesk(desk.id,  { last_data: desk.last_data });
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
      setHeight={handleHeightChange}
      setHeightCommit={handleHeightCommit}
      setIsOnline={handleSwitchChange}
      handleNameConfirm={handleNameConfirm}
      handleNameEdit={handleNameEdit}
    />
  )
}

/* View */
export function DeskView({ deskName, desk, tempName, isEditingName, height, isOnline, setTempName, setHeight, setHeightCommit, setIsOnline, handleNameConfirm, handleNameEdit }) {
  return (
    <Card component='div' id='desk-view' sx={{ pt: 3, width: 700 }}>
      <Grid component='section' id='desk-view-grid' container spacing={4}>
        {/* Left Panel - Controls */}
        <Grid component='section' id='desk-view-grid-left-panel' item xs={12} md={6}>
          <Stack component='ul' id='desk-view-left-panel-list' spacing={3}>
            {/* Desk Name */}
            <Box component='span' id='desk-view-left-panel-desk-container' sx={{ display: 'flex', gap: 1, alignItems: 'flex-start' }}>
              <TextField
                component='form'
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
                  component='button'
                  id='desk-view-left-panel-desk-name-edit-check-button'
                  color="primary"
                  onClick={handleNameConfirm}
                  sx={{ mt: 1 }}
                >
                  <CheckIcon id='desk-view-left-panel-desk-name-check-icon' />
                </IconButton>
              ) : (
                <IconButton
                  component='button'
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
            <Typography component='p' id='desk-view-left-panel-manufacturer-header' variant="caption" color="text.secondary">
              Manufacturer: {desk.last_data.manufacturer}
            </Typography>

            {/* Height Control */}
            <Box component='span' id='desk-view-left-panel-height-container' >
              <Typography component='p' id='desk-view-left-panel-height-header' gutterBottom>Height: {height} cm</Typography>
              <Slider
                component='form'
                id='desk-view-left-panel-height-slider'
                value={height}
                onChange={setHeight}
                onChangeCommitted={setHeightCommit}
                min={60}
                max={130}
                valueLabelDisplay="auto"
              />
            </Box>

            {/* Power Toggle */}
            <FormControlLabel
              component='label'
              id='desk-view-left-panel-power-container'
              control={
                <Switch
                  component='form'
                  id='desk-view-left-panel-power-switch'
                  checked={isOnline}
                  onChange={setIsOnline}
                  color="primary"
                />
              }
              label={isOnline ? 'Online' : 'Offline'}
            />

            {/* Error Warnings */}
            {desk.lasterrors && desk.lasterrors.length > 0 && (
              <Alert component='section' id='desk-view-left-panel-error-alert' severity="warning">
                <Typography component='p' id='desk-view-left-panel-error-alert-header' variant="subtitle2" gutterBottom>
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
        <Grid component='section' id='desk-view-grid-right-panel' item xs={12} md={6}>
          <img
              id='desk-view-grid-right-panel-desk-image'
              src={deskImage}
              alt="Desk"
              style={{
                maxWidth: '300px',
                height: 'auto',
              }}
          />
        </Grid>
      </Grid>
    </Card>
  );
}
