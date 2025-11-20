import * as React from 'react';
import {
  Card,
  CardContent,
  Typography,
  Box,
  Chip,
  Divider,
} from '@mui/material';
import deskImage from '../../../assets/desk.png';

/* Controller */
export default function SmallDeskCardController({ scheduledTask }) {
  return (
    <SmallScheduledTaskCard 
      scheduledTask={scheduledTask}
    />
  )
}

/* View */
export function SmallScheduledTaskCard({ scheduledTask }) {
  return (
    <Card
        component='div'
        id='scheduled-task-card'
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
        <Box component='div' id='scheduled-task-card-header' sx={{ display: 'flex', justifyContent: 'space-between', alignItems: 'center', mb: 2 }}>
          <Typography
            component='h5'
            id='scheduled-task-card-description'
            variant="h5"
            sx={{ fontWeight: 600 }}
            >
            {scheduledTask.description}
            </Typography>
            <Chip
                label={scheduledTask.status}
                color={
                  scheduledTask.status === 'COMPLETED' ? 'success' 
                  : scheduledTask.status === 'CANCELLED' ? 'warning' 
                  : scheduledTask.status === 'PENDING' ? 'blue' 
                  : 'default'}
                size='small'
            />
        </Box>
        <Divider sx={{ mb: 2 }} />
        <Box component='div' id='scheduled-task-card-details' sx={{ display: 'flex', flexDirection: 'column', gap: 1 }}>
          <Typography component='p' id='scheduled-task-card-desk-id' variant="body2">
            <strong>Desk ID:</strong> {scheduledTask.desk_id}
          </Typography>
          <Typography component='p' id='scheduled-task-card-user-id' variant="body2">
            <strong>User ID:</strong> {scheduledTask.user_id}
          </Typography>
          <Typography component='p' id='scheduled-task-card-new-height' variant="body2">
            <strong>New Height:</strong> {scheduledTask.new_height} cm
          </Typography>
          <Typography component='p' id='scheduled-task-card-scheduled-at' variant="body2">
            <strong>Scheduled At:</strong> {scheduledTask.scheduled_at ? new Date(scheduledTask.scheduled_at).toLocaleString() : 'N/A'}
          </Typography>
          <Typography component='p' id='scheduled-task-card-completed-at' variant="body2">
            <strong>Completed At:</strong> {scheduledTask.completed_at ? new Date(scheduledTask.completed_at).toLocaleString() : 'N/A'}
          </Typography>
          {scheduledTask.error_messages && (
            <Typography component='p' id='scheduled-task-card-error-messages' variant="body2" sx={{ color: 'error.main' }}>
              <strong>Error Messages:</strong> {scheduledTask.error_messages.join(', ')}
            </Typography>
          )}
        </Box>
      </CardContent>
    </Card>
  );
}
