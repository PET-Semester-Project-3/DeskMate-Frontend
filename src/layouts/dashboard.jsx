import * as React from 'react';
import { Outlet } from 'react-router';
import { Box, Typography } from '@mui/material';


export default function Layout() {

  return (
    <Box>
      <Outlet />
    </Box>
  );
}