import * as React from 'react';
import useSession from '../../models/SessionContext'
import { Typography, Box } from '@mui/material';
import RestrictedPage from '../restricted/RestrictedPage'
import DeskCard from './components/DeskCard';
import { DESKS } from '../../../dummyData/dummyData';

/* Controller */
export default function MaintenancePageController() {
  return (
    <RestrictedPage Page={<MaintenancePage />} />
  )
}

/* View */
export function MaintenancePage() {
  return (
    <Box id='maintenance-page' sx={{ boxShadow: 2 }}>
      <Typography
        id='maintenance-page-header'
        variant="h4"
        sx={{
          fontWeight: 700,
          mb: 3,
          color: '#8b5cf6'
        }}
      >
        Desk Maintenance
      </Typography>
      <Box id='maintenance-page-desks-container' sx={{ display: 'flex', flexWrap: 'wrap', gap: 3 }}>
        {DESKS.map((desk) => (
          <DeskCard key={desk.id} desk={desk} />
        ))}
      </Box>
    </Box>
  );
}
