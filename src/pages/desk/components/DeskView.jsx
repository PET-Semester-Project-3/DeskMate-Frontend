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
  Button
} from '@mui/material';
import { StarBorder, Star, Edit, Check } from '@mui/icons-material';
import deskImage from '../../../assets/desk.png';
import { asyncPutDesk } from '../../../models/api-comm/APIDesk';
import { useSnackbar } from 'notistack';


/* Controller */
export default function DeskViewController({ desk, setMainDesk }){

  const { enqueueSnackbar } = useSnackbar();

  const [deskName, setDeskName] = React.useState(desk.name);
  const [tempName, setTempName] = React.useState(desk.name);
  const [isEditingName, setIsEditingName] = React.useState(false);
  const [height, setHeight] = React.useState(desk.last_data.height);
  const [isOnline, setIsOnline] = React.useState(desk.is_online);

  const handleNameConfirm = async () => {
    setDeskName(tempName);
    const updatedDesk = await asyncPutDesk(desk.id, { name: tempName });
    if (updatedDesk.id)
      enqueueSnackbar(`Changed ${desk.name} to: ${tempName}`, { variant: 'success' });
    else
      enqueueSnackbar(`${updatedDesk.message}`, { variant: 'error' });
    setIsEditingName(false);
  };

  const handleHeightChange = (_, newValue) => {
    setHeight(newValue);
  };

  const handleSwitchChange = async (_, newValue) => {
    setIsOnline(newValue);
    const updatedDesk = await asyncPutDesk(desk.id, { is_online: newValue });
    if (updatedDesk.id)
      enqueueSnackbar(`${desk.name}'s online state to: ${newValue ? 'online' : 'offline'}`, { variant: 'info' });
    else
      enqueueSnackbar(`${updatedDesk.message}`, { variant: 'error' });
  };

  const handleHeightCommit = async (_, newValue) => {
    desk.last_data.height = newValue;
    const updatedDesk = await asyncPutDesk(desk.id,  { last_data: desk.last_data });
    if (updatedDesk.id)
      enqueueSnackbar(`${desk.name}'s height set to: ${newValue}`, { variant: 'info' });
    else
      enqueueSnackbar(`${updatedDesk.message}`, { variant: 'error' });
  };

  const handleNameEdit = () => {
    setIsEditingName(true);
  };

  const handleSaveAll = () => {
    handleNameConfirm();
    handleHeightCommit(null, height);
    handleSwitchChange(null, isOnline);
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
      handleSaveAll={handleSaveAll}
      setMainDesk={setMainDesk}
    />
  )
}

/* View */
export function DeskView({ deskName, desk, tempName, isEditingName, height, isOnline, setTempName, setHeight, setHeightCommit, setIsOnline, handleNameConfirm, handleNameEdit, handleSaveAll, setMainDesk }) {
  return (
    <Card component='div' id='desk-view' sx={{ pt: 3, width: 700 }}>
      <Grid component='section' id='desk-view-grid' container spacing={4}>
        {/* Left Panel - Controls */}
        <Grid component='section' id='desk-view-grid-left-panel' item xs={12} md={6}>
          <Stack component='ul' id='desk-view-left-panel-list' spacing={3}>
            {/* Desk Name */}
            <Box component='span' id='desk-view-left-panel-desk-container' sx={{ display: 'flex', gap: 1, alignItems: 'flex-start' }}>
              <TextField
                component='div'
                id='desk-view-left-panel-desk-name-textfield'
                label="Desk Name"
                value={isEditingName ? tempName : deskName}
                onChange={(e) => setTempName(e.target.value)}
                fullWidth
                variant="outlined"
                onKeyUp={e => { if (e.key == "Enter") handleNameConfirm(); }}
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
                  <Check id='desk-view-left-panel-desk-name-check-icon' />
                </IconButton>
              ) : (
                <IconButton
                  component='button'
                  id='desk-view-left-panel-desk-name-edit-icon-button'
                  color="default"
                  onClick={handleNameEdit}
                  sx={{ mt: 1 }}
                >
                  <Edit id='desk-view-left-panel-desk-name-icon-edit' />
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
                component='div'
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
                  component='div'
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
          <Box component='div' id='desk-view-right-panel-desk-image-container' sx={{ display: 'flex', flexDirection: 'column', justifyContent: 'center', alignItems: 'center', height: '100%' }}>
            <img
              id='desk-view-grid-right-panel-desk-image'
              src={deskImage}
              alt="Desk"
              style={{
                maxWidth: '275px',
                height: 'auto',
              }}
            />
            <IconButton
              component='div'
              id='desk-view-right-panel-favorite-desk-button'
              onClick={() => setMainDesk(desk)}
              sx={{ top: -275, right: -150 }}
            >
              {desk.isFavorit ? <Star id='desk-view-right-panel-favorite-desk-star-icon' /> : <StarBorder id='desk-view-right-panel-favorite-desk-starborder-icon' />}
            </IconButton>
            <Button 
              variant='contained' 
              sx={{ top: -15, right: -115 }}
              onClick={handleSaveAll}
            >
              Ensure Save
            </Button>
          </Box>
        </Grid>
      </Grid>
    </Card>
  );
}
