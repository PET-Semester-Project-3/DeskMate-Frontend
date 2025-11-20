import * as React from 'react';
import * as ReactDOM from 'react-dom/client';
import { createBrowserRouter, RouterProvider } from 'react-router';
import { ThemeProvider } from '@mui/material/styles';
import CssBaseline from '@mui/material/CssBaseline';
import App from './App';
import Layout from './layouts/basicWebLayout';
import DashboardPage from './pages/dashboard/DashboardPage';
import DatabasePage from './pages/database/DatabasePage';
import DeskPage from './pages/desk/DeskPage';
import MaintenancePage from './pages/maintenance/MaintenancePage';
import AboutPage from './pages/about/AboutPage';
import HowToUsePage from './pages/howtouse/HowToUsePage';
import UserPage from './pages/user/UserPage';
import theme from './theme';


const router = createBrowserRouter([
  {
    Component: App,
    children: [
      {
        path: '/',
        Component: Layout,
        children: [
          {
            path: '',
            Component: DashboardPage,
          },
          {
            path: 'desk',
            Component: DeskPage,
          },
          {
            path: 'maintenance',
            Component: MaintenancePage,
          },
          {
            path: 'database',
            Component: DatabasePage,
          },
          {
            path: 'about',
            Component: AboutPage
          },
          {
            path: 'howtouse',
            Component: HowToUsePage
          },
          {
            path: 'user',
            Component: UserPage
          },
        ]
      }
    ],
  },
]);

ReactDOM.createRoot(document.getElementById('root')).render(
  <React.StrictMode>
    <ThemeProvider theme={theme}>
      <CssBaseline />
      <RouterProvider router={router} />
    </ThemeProvider>
  </React.StrictMode>
);