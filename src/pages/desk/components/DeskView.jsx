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
  Snackbar,
  CircularProgress,
} from '@mui/material';
import CheckIcon from '@mui/icons-material/Check';
import EditIcon from '@mui/icons-material/Edit';
import deskImage from '../../../assets/desk.png';
import { asyncPutDesk, asyncSetDeskHeight } from '../../../models/api-comm/APIDesk';
import { APIError } from '../../../models/api-comm/APIComm';

/**
 * Get user-friendly error message based on error code
 */
function getErrorMessage(err) {
  if (err instanceof APIError) {
    switch (err.code) {
      case 'SIMULATOR_TIMEOUT':
        return 'The desk did not respond in time. Please try again.';
      case 'SIMULATOR_UNAVAILABLE':
        return 'Unable to communicate with the desk. Please check if it is powered on.';
      case 'HEIGHT_OUT_OF_RANGE':
        return `Height must be between ${err.details?.min || 68}cm and ${err.details?.max || 132}cm.`;
      case 'NETWORK_ERROR':
        return 'Network error. Please check your internet connection.';
      default:
        return err.message || 'Failed to adjust desk height. Please try again.';
    }
  }
  return 'An unexpected error occurred. Please try again.';
}

/* Controller */
export default function DeskViewController({ desk }) {
  const [deskName, setDeskName] = React.useState(desk.name);
  const [tempName, setTempName] = React.useState(desk.name);
  const [isEditingName, setIsEditingName] = React.useState(false);
  const [height, setHeight] = React.useState(desk.last_data.height);
  const [previousHeight, setPreviousHeight] = React.useState(desk.last_data.height);
  const [isOnline, setIsOnline] = React.useState(desk.is_online);

  // Error and loading states
  const [error, setError] = React.useState(null);
  const [isHeightLoading, setIsHeightLoading] = React.useState(false);

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
    setIsHeightLoading(true);
    setError(null);

    try {
      await asyncSetDeskHeight(desk.id, newValue);
      // On success, update the previous height to the new confirmed value
      setPreviousHeight(newValue);
    } catch (err) {
      console.error('Failed to set desk height:', err);

      // Rollback to previous height on failure
      setHeight(previousHeight);

      // Set user-friendly error message
      setError(getErrorMessage(err));
    } finally {
      setIsHeightLoading(false);
    }
  };

  const handleNameEdit = () => {
    setIsEditingName(true);
  };

  const handleErrorClose = () => {
    setError(null);
  };

  return (
    <DeskView
      deskName={deskName}
      desk={desk}
      tempName={tempName}
      isEditingName={isEditingName}
      height={height}
      isOnline={isOnline}
      error={error}
      isHeightLoading={isHeightLoading}
      setTempName={setTempName}
      setHeight={handleHeightChange}
      setHeightCommit={handleHeightCommit}
      setIsOnline={handleSwitchChange}
      handleNameConfirm={handleNameConfirm}
      handleNameEdit={handleNameEdit}
      handleErrorClose={handleErrorClose}
    />
  );
}

/* View */
export function DeskView({
  deskName,
  desk,
  tempName,
  isEditingName,
  height,
  isOnline,
  error,
  isHeightLoading,
  setTempName,
  setHeight,
  setHeightCommit,
  setIsOnline,
  handleNameConfirm,
  handleNameEdit,
  handleErrorClose,
}) {
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
            <Box component='span' id='desk-view-left-panel-height-container'>
              <Box sx={{ display: 'flex', alignItems: 'center', gap: 1 }}>
                <Typography component='p' id='desk-view-left-panel-height-header' gutterBottom>
                  Height: {height} cm
                </Typography>
                {isHeightLoading && (
                  <CircularProgress size={16} sx={{ color: '#1976d2' }} />
                )}
              </Box>
              <Slider
                component='form'
                id='desk-view-left-panel-height-slider'
                value={height}
                onChange={setHeight}
                onChangeCommitted={setHeightCommit}
                min={68}
                max={132}
                valueLabelDisplay="auto"
                disabled={isHeightLoading || !isOnline}
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

            {/* Error Warnings from desk */}
            {desk.lasterrors && desk.lasterrors.length > 0 && (
              <Alert component='section' id='desk-view-left-panel-error-alert' severity="warning">
                <Typography component='p' id='desk-view-left-panel-error-alert-header' variant="subtitle2" gutterBottom>
                  Errors detected:
                </Typography>
                <ul id='desk-view-left-panel-error-alert-entry-list' style={{ margin: 0, paddingLeft: 20 }}>
                  {desk.lasterrors.map((err, index) => (
                    <li id={'desk-view-left-panel-error-alert-entry-' + index} key={index}>{err}</li>
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

      {/* Error Snackbar */}
      <Snackbar
        open={!!error}
        autoHideDuration={6000}
        onClose={handleErrorClose}
        anchorOrigin={{ vertical: 'bottom', horizontal: 'center' }}
      >
        <Alert onClose={handleErrorClose} severity="error" sx={{ width: '100%' }}>
          {error}
        </Alert>
      </Snackbar>
    </Card>
  );
}
