import * as React from 'react';
import {
  Box,
  Paper,
  Backdrop,
  Button,
  Typography,
  TextField,
  FormControl,
  InputLabel,
  Select,
  MenuItem,
  Slider,
  FormHelperText
} from '@mui/material';
import { DateTimePicker } from '@mui/x-date-pickers/DateTimePicker';
import dayjs from 'dayjs';
import deskImage from '../../../assets/desk.png';

/* Controller */
export default function ScheduleFormPopoutController({
  isOpen,
  onClose,
  onSave,
  schedule,
  desks,
  userId
}) {
  const [formData, setFormData] = React.useState({
    deskId: '',
    description: '',
    new_height: 80,
    scheduled_at: dayjs().add(1, 'hour')
  });
  const [errors, setErrors] = React.useState({});

  React.useEffect(() => {
    if (schedule) {
      setFormData({
        deskId: schedule.desk_id,
        description: schedule.description || '',
        new_height: schedule.new_height,
        scheduled_at: dayjs(schedule.scheduled_at)
      });
    } else {
      setFormData({
        deskId: desks[0]?.id || '',
        description: '',
        new_height: 80,
        scheduled_at: dayjs().add(1, 'hour')
      });
    }
    setErrors({});
  }, [schedule, desks, isOpen]);

  const handleFieldChange = (field, value) => {
    setFormData(prev => ({ ...prev, [field]: value }));
    if (errors[field]) {
      setErrors(prev => ({ ...prev, [field]: null }));
    }
  };

  const validateForm = () => {
    const newErrors = {};
    if (!formData.deskId) newErrors.deskId = 'Desk is required';
    const selectedDesk = desks.find(d => d.id === formData.deskId);
    if (selectedDesk && !selectedDesk.is_online) newErrors.deskId = 'Cannot schedule for offline desk';
    if (!formData.new_height) newErrors.new_height = 'Height is required';
    if (!formData.scheduled_at) newErrors.scheduled_at = 'Schedule time is required';
    if (formData.scheduled_at && formData.scheduled_at.isBefore(dayjs())) {
      newErrors.scheduled_at = 'Schedule time must be in the future';
    }
    setErrors(newErrors);
    return Object.keys(newErrors).length === 0;
  };

  const handleSave = () => {
    if (!validateForm()) return;

    onSave({
      deskId: formData.deskId,
      userId: userId,
      description: formData.description || 'Scheduled height change',
      new_height: formData.new_height,
      scheduled_at: formData.scheduled_at.toISOString()
    });
  };

  return (
    <ScheduleFormPopout
      isOpen={isOpen}
      onClose={onClose}
      onSave={handleSave}
      formData={formData}
      onFieldChange={handleFieldChange}
      desks={desks}
      errors={errors}
      isEditing={!!schedule}
    />
  );
}

/* View */
export function ScheduleFormPopout({
  isOpen,
  onClose,
  onSave,
  formData,
  onFieldChange,
  desks,
  errors,
  isEditing
}) {
  // Memoize selected desk lookup to avoid recalculating on every render
  const selectedDesk = React.useMemo(
    () => desks.find(d => d.id === formData.deskId),
    [desks, formData.deskId]
  );

  return (
    <Backdrop open={isOpen} sx={{ zIndex: 200 }}>
      <Box
        sx={{
          display: 'flex',
          flexDirection: 'column',
          width: '90%',
          maxWidth: 500
        }}
      >
        {/* Close Button */}
        <Box sx={{ display: 'flex', justifyContent: 'flex-end' }}>
          <Button
            variant="contained"
            onClick={onClose}
            sx={{ width: 50, height: 45, mb: 1 }}
          >
            X
          </Button>
        </Box>

        {/* Form Paper */}
        <Paper sx={{ p: 3 }}>
          <Typography
            variant="h5"
            sx={{ mb: 3, color: '#10b981', fontWeight: 600 }}
          >
            {isEditing ? 'Edit Schedule' : 'Create New Schedule'}
          </Typography>

          {/* Desk Selector */}
          <FormControl fullWidth error={!!errors.deskId}>
            <InputLabel>Select Desk</InputLabel>
            <Select
              value={formData.deskId}
              label="Select Desk"
              onChange={(e) => onFieldChange('deskId', e.target.value)}
            >
              {desks.map(desk => (
                <MenuItem key={desk.id} value={desk.id}>
                  {desk.name}
                </MenuItem>
              ))}
            </Select>
            {errors.deskId && <FormHelperText>{errors.deskId}</FormHelperText>}
          </FormControl>

          {/* Selected Desk Details */}
          {selectedDesk && (
            <Paper
              sx={{
                p: 2,
                mt: 2,
                mb: 2,
                bgcolor: 'rgba(16, 185, 129, 0.08)',
                display: 'flex',
                gap: 2,
                alignItems: 'center',
                border: '1px solid rgba(16, 185, 129, 0.2)'
              }}
            >
              <img src={deskImage} width={60} height={60} alt="Desk" />
              <Box>
                <Typography variant="subtitle1" sx={{ fontWeight: 600, color: '#10b981' }}>
                  {selectedDesk.name}
                </Typography>
                <Typography variant="body2" color="text.secondary">
                  Current Height: {selectedDesk.last_data?.height || '—'} cm
                </Typography>
                <Typography variant="body2" color={selectedDesk.is_online ? 'success.main' : 'error.main'}>
                  {selectedDesk.is_online ? 'Online' : 'Offline'}
                </Typography>
              </Box>
            </Paper>
          )}

          {/* Description */}
          <TextField
            fullWidth
            label="Description (optional)"
            value={formData.description}
            onChange={(e) => onFieldChange('description', e.target.value)}
            sx={{ mb: 2 }}
            placeholder="e.g., Morning standing position"
          />

          {/* Height Slider */}
          <Box sx={{ mb: 3 }}>
            <Typography gutterBottom sx={{ color: 'rgba(255,255,255,0.7)' }}>
              Target Height: <strong>{formData.new_height} cm</strong>
            </Typography>
            <Slider
              value={formData.new_height}
              onChange={(_, value) => onFieldChange('new_height', value)}
              disabled={selectedDesk && !selectedDesk.is_online}
              min={60}
              max={130}
              valueLabelDisplay="auto"
              sx={{
                color: '#10b981',
                '& .MuiSlider-thumb': {
                  '&:hover, &.Mui-focusVisible': {
                    boxShadow: '0px 0px 0px 8px rgba(16, 185, 129, 0.16)'
                  }
                }
              }}
            />
            <Box sx={{ display: 'flex', justifyContent: 'space-between' }}>
              <Typography variant="caption" sx={{ color: 'rgba(255,255,255,0.5)' }}>
                60 cm (Sitting)
              </Typography>
              <Typography variant="caption" sx={{ color: 'rgba(255,255,255,0.5)' }}>
                130 cm (Standing)
              </Typography>
            </Box>
          </Box>

          {/* DateTime Picker */}
          <Box sx={{ mb: 3 }}>
            <DateTimePicker
              label="Schedule Date & Time"
              value={formData.scheduled_at}
              onChange={(value) => onFieldChange('scheduled_at', value)}
              slotProps={{
                textField: {
                  fullWidth: true,
                  error: !!errors.scheduled_at,
                  helperText: errors.scheduled_at
                }
              }}
              minDateTime={dayjs()}
            />
          </Box>

          {/* Save Button */}
          <Box sx={{ display: 'flex', justifyContent: 'flex-end' }}>
            <Button
              variant="contained"
              onClick={onSave}
              disabled={selectedDesk && !selectedDesk.is_online}
              sx={{
                bgcolor: '#10b981',
                '&:hover': { bgcolor: '#059669' },
                px: 4
              }}
            >
              {isEditing ? 'Update Schedule' : 'Create Schedule'}
            </Button>
          </Box>
        </Paper>
      </Box>
    </Backdrop>
  );
}
