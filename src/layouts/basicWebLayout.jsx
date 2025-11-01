import * as React from 'react';
import { Outlet } from 'react-router';
import { Box, Typography } from '@mui/material';
import FooterController from './footer/footer'

/* Controller */
export default function LayoutController() {
  return (
    <Layout/>
  )
}

/* View */
export function Layout() {
  return (
    <Box>
      <Outlet />
      <FooterController/>
    </Box>
  );
}