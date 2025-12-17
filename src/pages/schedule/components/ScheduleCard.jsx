import * as React from 'react';
import { Paper, Box, Typography, IconButton, Tooltip, Chip } from '@mui/material';
import EditIcon from '@mui/icons-material/Edit';
import CancelIcon from '@mui/icons-material/Cancel';
import DeleteIcon from '@mui/icons-material/Delete';
import dayjs from 'dayjs';

const STATUS_CONFIG = {
  PENDING: { color: '#10b981', label: 'Pending' },
  IN_PROGRESS: { color: '#f59e0b', label: 'Running' },
  COMPLETED: { color: '#6b7280', label: 'Completed' },
  CANCELLED: { color: '#9ca3af', label: 'Cancelled' },
  FAILED: { color: '#ef4444', label: 'Failed' }
};

/* Controller */
export default function ScheduleCardController({ schedule, onEdit, onCancel, onDelete }) {
  const statusConfig = STATUS_CONFIG[schedule.status] || STATUS_CONFIG.PENDING;
  const time = dayjs(schedule.scheduled_at).format('HH:mm');
  const deskName = schedule.desk?.name || 'Unknown Desk';
  const height = schedule.new_height;
  const description = schedule.description || 'Scheduled height change';
  const isPending = schedule.status === 'PENDING';
  const isFinished = ['COMPLETED', 'CANCELLED', 'FAILED'].includes(schedule.status);

  return (
    <ScheduleCard
      time={time}
      description={description}
      deskName={deskName}
      height={height}
      statusColor={statusConfig.color}
      statusLabel={statusConfig.label}
      isPending={isPending}
      isFinished={isFinished}
      onEdit={onEdit}
      onCancel={onCancel}
      onDelete={onDelete}
    />
  );
}

/* View */
export function ScheduleCard({
  time,
  description,
  deskName,
  height,
  statusColor,
  statusLabel,
  isPending,
  isFinished,
  onEdit,
  onCancel,
  onDelete
}) {
  return (
    <Paper
      elevation={2}
      sx={{
        borderLeft: `4px solid ${statusColor}`,
        p: 2,
        mb: 2,
        bgcolor: 'rgba(255,255,255,0.03)',
        transition: 'all 0.2s ease',
        '&:hover': {
          bgcolor: 'rgba(16, 185, 129, 0.05)',
          transform: 'translateX(4px)'
        }
      }}
    >
      <Box sx={{ display: 'flex', justifyContent: 'space-between', alignItems: 'flex-start' }}>
        <Box sx={{ flex: 1 }}>
          <Box sx={{ display: 'flex', alignItems: 'center', gap: 1, mb: 0.5 }}>
            <Typography
              variant="h6"
              sx={{ fontWeight: 600, color: statusColor }}
            >
              {time}
            </Typography>
            <Chip
              label={statusLabel}
              size="small"
              sx={{
                bgcolor: `${statusColor}20`,
                color: statusColor,
                fontSize: '0.7rem',
                height: 20
              }}
            />
          </Box>
          <Typography variant="body1" sx={{ fontWeight: 500, mb: 0.5 }}>
            {description}
          </Typography>
          <Typography variant="body2" sx={{ color: 'rgba(255,255,255,0.6)' }}>
            {deskName} · {height} cm
          </Typography>
        </Box>

        <Box sx={{ display: 'flex', gap: 0.5 }}>
          {isPending && (
            <>
              <Tooltip title="Edit">
                <IconButton size="small" onClick={onEdit} sx={{ color: 'rgba(255,255,255,0.7)' }}>
                  <EditIcon fontSize="small" />
                </IconButton>
              </Tooltip>
              <Tooltip title="Cancel">
                <IconButton size="small" onClick={onCancel} sx={{ color: '#f59e0b' }}>
                  <CancelIcon fontSize="small" />
                </IconButton>
              </Tooltip>
            </>
          )}
          {isFinished && (
            <Tooltip title="Delete">
              <IconButton size="small" onClick={onDelete} sx={{ color: '#ef4444' }}>
                <DeleteIcon fontSize="small" />
              </IconButton>
            </Tooltip>
          )}
        </Box>
      </Box>
    </Paper>
  );
}
