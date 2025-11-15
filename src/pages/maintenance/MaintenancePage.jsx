import * as React from 'react';
import useSession from '../../models/SessionContext';
import { Typography, Box } from '@mui/material';
import RestrictedPage from '../restricted/RestrictedPage'
import DeskCard from './components/DeskCard';
import { asyncGetUserDesks } from '../../models/api-comm/APIUsers'

/* Controller */
export default function MaintenancePageController() {

  const [desks, setDesks] = React.useState([]);
  const { session, setSession } = useSession();

  React.useEffect(() => {
    async function getDesks(id) {
      const desks = await asyncGetUserDesks(id);
      setDesks(desks);
    }
    getDesks(session?.user?.id);
  }, []);

  return (
    <RestrictedPage Page={<MaintenancePage desks={desks} />} />
  )
}

/* View */
export function MaintenancePage({ desks }) {
  return (
    <Box component='main' id='maintenance-page' sx={{ boxShadow: 2 }}>
      <Typography
        component='h4'
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
      <Box component='ul' id='maintenance-page-desks-container' sx={{ display: 'flex', flexWrap: 'wrap', gap: 3 }}>
        {desks.map((desk) => (
          <DeskCard key={desk.id} desk={desk} />
        ))}
      </Box>
    </Box>
  );
}
