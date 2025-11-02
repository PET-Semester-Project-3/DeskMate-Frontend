import * as React from 'react';
import { Outlet } from 'react-router';
import { Box, Typography } from '@mui/material';
import FooterController from './footer/Footer'
import NavBar from './navbar/NavBar';

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
      <NavBar/>
      <Box sx={{ p: 3, pt: 18 }}>
          <Outlet />
      </Box>
      <FooterController/>
    </Box>
  );
}