import * as React from 'react';
import { Box, Badge, Typography, Divider } from '@mui/material';
import { DateCalendar } from '@mui/x-date-pickers/DateCalendar';
import { PickersDay } from '@mui/x-date-pickers/PickersDay';
import dayjs from 'dayjs';

/* Custom Day Component with Badge - Memoized for performance */
const ScheduleDay = React.memo(function ScheduleDay({ dateStatusMap, day, outsideCurrentMonth, ...props }) {
  // Bail early for outside days to avoid unnecessary date formatting
  if (outsideCurrentMonth) {
    return <PickersDay {...props} day={day} outsideCurrentMonth={outsideCurrentMonth} />;
  }

  const dateKey = day.format('YYYY-MM-DD');
  const status = dateStatusMap[dateKey];

  // Green for pending, grey for completed/cancelled/failed, no badge otherwise
  const badgeColor = status === 'pending' ? '#10b981' : status === 'completed' ? '#6b7280' : null;

  return (
    <Badge
      key={day.toString()}
      overlap="circular"
      badgeContent={badgeColor ? '' : undefined}
      variant="dot"
      sx={{
        '& .MuiBadge-badge': {
          backgroundColor: badgeColor,
          minWidth: 6,
          height: 6,
          top: 6,
          right: 6
        }
      }}
    >
      <PickersDay
        {...props}
        day={day}
        outsideCurrentMonth={outsideCurrentMonth}
      />
    </Badge>
  );
});

/* Controller */
export default function ScheduleCalendarController({
  onDateChange,
  dateStatusMap,
  upcomingCount,
  completedCount
}) {
  return (
    <ScheduleCalendar
      onDateChange={onDateChange}
      dateStatusMap={dateStatusMap}
      upcomingCount={upcomingCount}
      completedCount={completedCount}
    />
  );
}

/* View */
export function ScheduleCalendar({
  onDateChange,
  dateStatusMap,
  upcomingCount,
  completedCount
}) {
  const [calendarValue, setCalendarValue] = React.useState(dayjs());

  const handleDateChange = (newValue) => {
    setCalendarValue(newValue);
    onDateChange(newValue);
  };

  return (
    <Box>
      <DateCalendar
        value={calendarValue}
        onChange={handleDateChange}
        slots={{
          day: ScheduleDay
        }}
        slotProps={{
          day: {
            dateStatusMap
          }
        }}
        sx={{
          width: '100%',
          '& .MuiPickersDay-root': {
            color: 'rgba(255,255,255,0.9)',
            '&:hover': {
              backgroundColor: 'rgba(16, 185, 129, 0.2)'
            },
            '&.Mui-selected': {
              backgroundColor: '#10b981',
              '&:hover': {
                backgroundColor: '#059669'
              }
            }
          },
          '& .MuiPickersDay-today': {
            border: '1px solid #10b981'
          },
          '& .MuiDayCalendar-weekDayLabel': {
            color: 'rgba(255,255,255,0.5)'
          },
          '& .MuiPickersCalendarHeader-label': {
            color: 'rgba(255,255,255,0.9)'
          },
          '& .MuiPickersArrowSwitcher-button': {
            color: 'rgba(255,255,255,0.7)'
          }
        }}
      />

      <Divider sx={{ my: 2, borderColor: 'rgba(255,255,255,0.1)' }} />

      {/* Stats */}
      <Box sx={{ px: 2 }}>
        <Box sx={{ display: 'flex', justifyContent: 'space-between', mb: 1 }}>
          <Typography variant="body2" sx={{ color: 'rgba(255,255,255,0.6)' }}>
            Upcoming
          </Typography>
          <Typography variant="body2" sx={{ color: '#10b981', fontWeight: 600 }}>
            {upcomingCount}
          </Typography>
        </Box>
        <Box sx={{ display: 'flex', justifyContent: 'space-between' }}>
          <Typography variant="body2" sx={{ color: 'rgba(255,255,255,0.6)' }}>
            Completed
          </Typography>
          <Typography variant="body2" sx={{ color: '#6b7280', fontWeight: 600 }}>
            {completedCount}
          </Typography>
        </Box>
      </Box>
    </Box>
  );
}
