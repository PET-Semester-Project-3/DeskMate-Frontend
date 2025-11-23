import * as React from 'react';
import { Outlet } from 'react-router';
import { Box } from '@mui/material';
import Footer from './footer/Footer'
import NavBar from './navbar/NavBar';
import useWindowDimensions from '../models/WindowDimensions';

/* Controller */
export default function LayoutController() {

  const { height, width } = useWindowDimensions();

  return (
    <Layout widowHeight={height} widowWidth={width} />
  )
}

/* View */
export function Layout({ widowHeight, widowWidth }) {
  return (
    <Box component='main' id='basic-web-layout' >
      <NavBar/>
      <Box component='section' id='basic-web-layout-page-container' sx={{ p: 3, pt: 18, minHeight: widowHeight-275 }} >
          <Outlet />
      </Box>
      <Footer/>
    </Box>
  );
}