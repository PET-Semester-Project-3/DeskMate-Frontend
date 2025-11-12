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
    <Card sx={{ mb: 3, p: 3 }}>
      <Grid container spacing={4}>
        {/* Left Panel - Controls */}
        <Grid item xs={12} md={6}>
          <Stack spacing={3}>
            {/* Desk Name */}
            <Box sx={{ display: 'flex', gap: 1, alignItems: 'flex-start' }}>
              <TextField
                label="Desk Name"
                value={isEditingName ? tempName : deskName}
                onChange={(e) => setTempName(e.target.value)}
                fullWidth
                variant="outlined"
                disabled={!isEditingName}
              />
              {isEditingName ? (
                <IconButton
                  color="primary"
                  onClick={handleNameConfirm}
                  sx={{ mt: 1 }}
                >
                  <CheckIcon />
                </IconButton>
              ) : (
                <IconButton
                  color="default"
                  onClick={handleNameEdit}
                  sx={{ mt: 1 }}
                >
                  <EditIcon />
                </IconButton>
              )}
            </Box>

            {/* Manufacturer Info */}
            <Typography variant="caption" color="text.secondary">
              Manufacturer: {desk.manufacturer}
            </Typography>

            {/* Height Control */}
            <Box>
              <Typography gutterBottom>Height: {height} cm</Typography>
              <Slider
                value={height}
                onChange={(_, newValue) => setHeight(newValue)}
                min={60}
                max={130}
                valueLabelDisplay="auto"
              />
            </Box>

            {/* Power Toggle */}
            <FormControlLabel
              control={
                <Switch
                  checked={isOnline}
                  onChange={(e) => setIsOnline(e.target.checked)}
                  color="primary"
                />
              }
              label={isOnline ? 'Online' : 'Offline'}
            />

            {/* Error Warnings */}
            {desk.lasterrors && desk.lasterrors.length > 0 && (
              <Alert severity="warning">
                <Typography variant="subtitle2" gutterBottom>
                  Errors detected:
                </Typography>
                <ul style={{ margin: 0, paddingLeft: 20 }}>
                  {desk.lasterrors.map((error, index) => (
                    <li key={index}>{error}</li>
                  ))}
                </ul>
              </Alert>
            )}
          </Stack>
        </Grid>

        {/* Right Panel - Desk Visualization */}
        <Grid item xs={12} md={6}>
          <Box
            sx={{
              display: 'flex',
              alignItems: 'center',
              justifyContent: 'center',
              height: '100%',
            }}
          >
            <img
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
