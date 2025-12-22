import * as React from 'react';
import RestrictedPage from '../restricted/RestrictedPage';
import {
  Box,
  Typography,
  Button,
  CircularProgress,
  Paper,
  Divider,
  Snackbar,
  Alert,
  Dialog,
  DialogTitle,
  DialogContent,
  DialogContentText,
  DialogActions
} from '@mui/material';
import AddIcon from '@mui/icons-material/Add';
import dayjs from 'dayjs';
import useSession from '../../models/SessionContext';
import { asyncGetUserDesks } from '../../models/api-comm/APIUsers';
import {
  asyncGetScheduledTasks,
  asyncPostScheduledTask,
  asyncPutScheduledTask,
  asyncDeleteScheduledTask,
  asyncCancelScheduledTask
} from '../../models/api-comm/APIScheduleTask';
import ScheduleCard from './components/ScheduleCard';
import ScheduleCalendar from './components/ScheduleCalendar';
import ScheduleFormPopout from './components/ScheduleFormPopout';

// Helper to format date headers
function formatDateHeader(dateStr) {
  const date = dayjs(dateStr);
  const today = dayjs();

  if (date.isSame(today, 'day')) return 'Today';
  if (date.isSame(today.add(1, 'day'), 'day')) return 'Tomorrow';
  if (date.isSame(today.subtract(1, 'day'), 'day')) return 'Yesterday';

  return date.format('dddd, MMMM D');
}

/* Controller */
export default function SchedulePageController() {
  const [waitingForResponse, setWaitingForResponse] = React.useState(false);
  const [schedules, setSchedules] = React.useState([]);
  const [desks, setDesks] = React.useState([]);
  const [isFormOpen, setIsFormOpen] = React.useState(false);
  const [selectedSchedule, setSelectedSchedule] = React.useState(null);
  const [error, setError] = React.useState(null);
  const [confirmDialog, setConfirmDialog] = React.useState({ open: false, type: null, id: null });

  const { session } = useSession();
  const dateRefs = React.useRef({});

  const fetchData = React.useCallback(async () => {
    if (!session?.user?.id) return;
    setWaitingForResponse(true);

    const [fetchedDesks, fetchedSchedules] = await Promise.all([
      asyncGetUserDesks(session.user.id),
      asyncGetScheduledTasks()
    ]);

    const userDeskIds = fetchedDesks?.map(d => d.id) || [];
    const userSchedules = fetchedSchedules?.filter(s =>
      userDeskIds.includes(s.desk_id)
    ) || [];

    setDesks(fetchedDesks || []);
    setSchedules(userSchedules);
    setWaitingForResponse(false);
  }, [session?.user?.id]);

  React.useEffect(() => {
    fetchData();
  }, [fetchData]);

  // Group schedules by date
  const groupedSchedules = React.useMemo(() => {
    const groups = {};
    schedules.forEach(s => {
      const dateKey = dayjs(s.scheduled_at).format('YYYY-MM-DD');
      if (!groups[dateKey]) groups[dateKey] = [];
      groups[dateKey].push(s);
    });

    return Object.entries(groups)
      .sort(([a], [b]) => dayjs(a).diff(dayjs(b)))
      .map(([date, items]) => ({
        date,
        schedules: items.sort((a, b) =>
          dayjs(a.scheduled_at).diff(dayjs(b.scheduled_at))
        )
      }));
  }, [schedules]);

  // Split into upcoming and completed groups
  const upcomingGroups = React.useMemo(() => {
    return groupedSchedules.filter(g =>
      g.schedules.some(s => s.status === 'PENDING' || s.status === 'IN_PROGRESS')
    );
  }, [groupedSchedules]);

  const completedGroups = React.useMemo(() => {
    return groupedSchedules.filter(g =>
      g.schedules.every(s => s.status !== 'PENDING' && s.status !== 'IN_PROGRESS')
    );
  }, [groupedSchedules]);

  // Get date status map for calendar badges
  const dateStatusMap = React.useMemo(() => {
    const map = {};
    schedules.forEach(s => {
      const dateKey = dayjs(s.scheduled_at).format('YYYY-MM-DD');
      const isPending = s.status === 'PENDING' || s.status === 'IN_PROGRESS';

      if (isPending) {
        map[dateKey] = 'pending';
      } else if (!map[dateKey]) {
        map[dateKey] = 'completed';
      }
    });
    return map;
  }, [schedules]);

  // Stats
  const upcomingCount = React.useMemo(() => {
    return schedules.filter(s => s.status === 'PENDING' || s.status === 'IN_PROGRESS').length;
  }, [schedules]);

  const completedCount = React.useMemo(() => {
    return schedules.filter(s => s.status === 'COMPLETED').length;
  }, [schedules]);

  const handleCreateClick = () => {
    setSelectedSchedule(null);
    setIsFormOpen(true);
  };

  const handleEditClick = (schedule) => {
    setSelectedSchedule(schedule);
    setIsFormOpen(true);
  };

  const handleCancelSchedule = async (scheduleId) => {
    try {
      await asyncCancelScheduledTask(scheduleId);
      fetchData();
    } catch (err) {
      setError('Failed to cancel schedule');
    }
  };

  const handleDeleteSchedule = async (scheduleId) => {
    try {
      await asyncDeleteScheduledTask(scheduleId);
      fetchData();
    } catch (err) {
      setError('Failed to delete schedule');
    }
  };

  const handleFormClose = () => {
    setIsFormOpen(false);
    setSelectedSchedule(null);
  };

  const handleFormSave = async (scheduleData) => {
    try {
      if (selectedSchedule) {
        await asyncPutScheduledTask({ id: selectedSchedule.id, ...scheduleData });
      } else {
        await asyncPostScheduledTask(scheduleData);
      }
      setIsFormOpen(false);
      setSelectedSchedule(null);
      fetchData();
    } catch (err) {
      setError('Failed to save schedule');
    }
  };

  // Confirmation dialog handlers
  const openConfirmDialog = (type, id) => {
    setConfirmDialog({ open: true, type, id });
  };

  const closeConfirmDialog = () => {
    setConfirmDialog({ open: false, type: null, id: null });
  };

  const handleConfirmAction = async () => {
    const { type, id } = confirmDialog;
    closeConfirmDialog();
    if (type === 'cancel') {
      await handleCancelSchedule(id);
    } else if (type === 'delete') {
      await handleDeleteSchedule(id);
    }
  };

  const scrollToDate = (date) => {
    const dateKey = date.format('YYYY-MM-DD');
    const ref = dateRefs.current[dateKey];
    if (ref) {
      ref.scrollIntoView({ behavior: 'smooth', block: 'start' });
    }
  };

  return (
    <RestrictedPage
      Page={
        <SchedulePage
          upcomingGroups={upcomingGroups}
          completedGroups={completedGroups}
          dateStatusMap={dateStatusMap}
          dateRefs={dateRefs}
          desks={desks}
          waitingForResponse={waitingForResponse}
          isFormOpen={isFormOpen}
          selectedSchedule={selectedSchedule}
          upcomingCount={upcomingCount}
          completedCount={completedCount}
          error={error}
          confirmDialog={confirmDialog}
          onDateClick={scrollToDate}
          onCreateClick={handleCreateClick}
          onEditClick={handleEditClick}
          onCancelSchedule={(id) => openConfirmDialog('cancel', id)}
          onDeleteSchedule={(id) => openConfirmDialog('delete', id)}
          onFormClose={handleFormClose}
          onFormSave={handleFormSave}
          onErrorClose={() => setError(null)}
          onConfirmDialogClose={closeConfirmDialog}
          onConfirmAction={handleConfirmAction}
          userId={session?.user?.id}
        />
      }
    />
  );
}

/* View */
export function SchedulePage({
  upcomingGroups,
  completedGroups,
  dateStatusMap,
  dateRefs,
  desks,
  waitingForResponse,
  isFormOpen,
  selectedSchedule,
  upcomingCount,
  completedCount,
  error,
  confirmDialog,
  onDateClick,
  onCreateClick,
  onEditClick,
  onCancelSchedule,
  onDeleteSchedule,
  onFormClose,
  onFormSave,
  onErrorClose,
  onConfirmDialogClose,
  onConfirmAction,
  userId
}) {
  const hasNoSchedules = upcomingGroups.length === 0 && completedGroups.length === 0;

  return (
    <Box component="main" id="schedule-page" sx={{ width: '100%' }}>
      {/* Header */}
      <Box sx={{ display: 'flex', justifyContent: 'space-between', alignItems: 'center', mb: 3 }}>
        <Typography
          component="h4"
          variant="h4"
          sx={{ fontWeight: 700, color: '#10b981' }}
        >
          Desk Schedules
        </Typography>
        <Button
          variant="contained"
          startIcon={<AddIcon />}
          onClick={onCreateClick}
          sx={{ bgcolor: '#10b981', '&:hover': { bgcolor: '#059669' } }}
        >
          New Schedule
        </Button>
      </Box>

      {/* Split Layout */}
      <Box sx={{ display: 'flex', gap: 3, flexDirection: { xs: 'column', md: 'row' } }}>
        {/* Left Panel - Calendar (25% width, sticky) */}
        <Paper
          elevation={2}
          sx={{
            width: { xs: '100%', md: '25%' },
            flexShrink: 0,
            p: 2,
            bgcolor: 'rgba(255,255,255,0.03)',
            alignSelf: 'flex-start',
            position: { md: 'sticky' },
            top: { md: 80 },
            maxHeight: { md: 'calc(100vh - 100px)' },
            overflowY: 'auto'
          }}
        >
          <ScheduleCalendar
            onDateChange={onDateClick}
            dateStatusMap={dateStatusMap}
            upcomingCount={upcomingCount}
            completedCount={completedCount}
          />
        </Paper>

        {/* Right Panel - Timeline (75% width) */}
        <Box sx={{ flex: 1, minWidth: 0, width: { md: '75%' } }}>
          {waitingForResponse ? (
            <Box sx={{ display: 'flex', justifyContent: 'center', p: 5 }}>
              <CircularProgress size={60} sx={{ color: '#10b981' }} />
            </Box>
          ) : hasNoSchedules ? (
            <Paper
              elevation={1}
              sx={{
                bgcolor: 'rgba(16, 185, 129, 0.05)',
                borderRadius: 2,
                p: 4,
                textAlign: 'center',
                borderLeft: '4px solid rgba(16, 185, 129, 0.3)'
              }}
            >
              <Typography variant="h6" sx={{ color: 'rgba(255,255,255,0.6)' }}>
                No schedules yet
              </Typography>
              <Typography variant="body2" sx={{ color: 'rgba(255,255,255,0.4)', mt: 1 }}>
                Click "New Schedule" to create your first desk schedule
              </Typography>
            </Paper>
          ) : (
            <>
              {/* Upcoming Schedules */}
              {upcomingGroups.map(group => (
                <Box
                  key={group.date}
                  ref={el => dateRefs.current[group.date] = el}
                  sx={{ mb: 3 }}
                >
                  <Typography
                    variant="h6"
                    sx={{
                      mb: 1.5,
                      fontWeight: 600,
                      color: 'rgba(255,255,255,0.9)',
                      borderBottom: '1px solid rgba(255,255,255,0.1)',
                      pb: 1
                    }}
                  >
                    {formatDateHeader(group.date)}
                  </Typography>
                  {group.schedules.map(schedule => (
                    <ScheduleCard
                      key={schedule.id}
                      schedule={schedule}
                      onEdit={() => onEditClick(schedule)}
                      onCancel={() => onCancelSchedule(schedule.id)}
                      onDelete={() => onDeleteSchedule(schedule.id)}
                    />
                  ))}
                </Box>
              ))}

              {/* Completed Divider */}
              {completedGroups.length > 0 && (
                <Divider sx={{ my: 3 }}>
                  <Typography variant="body2" sx={{ color: 'rgba(255,255,255,0.4)', px: 2 }}>
                    Completed
                  </Typography>
                </Divider>
              )}

              {/* Completed Schedules (greyed out) */}
              <Box sx={{ opacity: 0.5 }}>
                {completedGroups.map(group => (
                  <Box
                    key={group.date}
                    ref={el => dateRefs.current[group.date] = el}
                    sx={{ mb: 3 }}
                  >
                    <Typography
                      variant="h6"
                      sx={{
                        mb: 1.5,
                        fontWeight: 600,
                        color: 'rgba(255,255,255,0.9)',
                        borderBottom: '1px solid rgba(255,255,255,0.1)',
                        pb: 1
                      }}
                    >
                      {formatDateHeader(group.date)}
                    </Typography>
                    {group.schedules.map(schedule => (
                      <ScheduleCard
                        key={schedule.id}
                        schedule={schedule}
                        onEdit={() => onEditClick(schedule)}
                        onCancel={() => onCancelSchedule(schedule.id)}
                        onDelete={() => onDeleteSchedule(schedule.id)}
                      />
                    ))}
                  </Box>
                ))}
              </Box>
            </>
          )}
        </Box>
      </Box>

      {/* Form Popout */}
      <ScheduleFormPopout
        isOpen={isFormOpen}
        onClose={onFormClose}
        onSave={onFormSave}
        schedule={selectedSchedule}
        desks={desks}
        userId={userId}
      />

      {/* Error Snackbar */}
      <Snackbar
        open={!!error}
        autoHideDuration={5000}
        onClose={onErrorClose}
        anchorOrigin={{ vertical: 'bottom', horizontal: 'center' }}
      >
        <Alert onClose={onErrorClose} severity="error" sx={{ width: '100%' }}>
          {error}
        </Alert>
      </Snackbar>

      {/* Confirmation Dialog */}
      <Dialog open={confirmDialog.open} onClose={onConfirmDialogClose}>
        <DialogTitle>
          {confirmDialog.type === 'cancel' ? 'Cancel Schedule' : 'Delete Schedule'}
        </DialogTitle>
        <DialogContent>
          <DialogContentText>
            {confirmDialog.type === 'cancel'
              ? 'Are you sure you want to cancel this schedule? This action cannot be undone.'
              : 'Are you sure you want to delete this schedule? This action cannot be undone.'}
          </DialogContentText>
        </DialogContent>
        <DialogActions>
          <Button onClick={onConfirmDialogClose}>No, Go Back</Button>
          <Button
            onClick={onConfirmAction}
            color={confirmDialog.type === 'delete' ? 'error' : 'warning'}
            variant="contained"
          >
            Yes, {confirmDialog.type === 'cancel' ? 'Cancel' : 'Delete'}
          </Button>
        </DialogActions>
      </Dialog>
    </Box>
  );
}
