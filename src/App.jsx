import * as React from 'react';
import { Outlet } from 'react-router';
import { SnackbarProvider } from 'notistack';
import { SessionContext } from './models/SessionContext';
import { LocalizationProvider } from '@mui/x-date-pickers/LocalizationProvider';
import { AdapterDayjs } from '@mui/x-date-pickers/AdapterDayjs';
import Cookies from 'js-cookie';
import SignIn from './pages/signin/SignInPage';
import { Box } from '@mui/material';

/* Controller */
export default function AppController() {

  const [session, setSession] = React.useState(() => {
    const savedSession = Cookies.get('session');
    return savedSession ? JSON.parse(savedSession) : null;
  });

  React.useEffect(() => {
    console.log(session)
    if (session) {
      Cookies.set('session', JSON.stringify(session), { expires: 7 });
    } else {
      Cookies.remove('session');
    }
  }, [session]);

  const sessionContextValue = React.useMemo(() => ({ session, setSession }), [session, setSession]);

  return (
    <App sessionContextValue={sessionContextValue} />
  )
}

/* View */
export function App({ sessionContextValue }) {
  return (
    <LocalizationProvider dateAdapter={AdapterDayjs}>
      <SessionContext.Provider value={sessionContextValue}>
        <SnackbarProvider 
          maxSnack={5} 
          autoHideDuration={2000}
          disableWindowBlurListener
          anchorOrigin={{ 
            vertical: 'bottom', 
            horizontal: 'left' 
          }}
          SnackbarProps={{
            style: {
              height: 50
            }
          }}
          // Puts Alerts right under title of page .. but doesn't follow the title height
          /*anchorOrigin={{ 
            vertical: 'top', 
            horizontal: 'left' 
          }}
          
          SnackbarProps={{
            style: {
              top: 190
            }
          }}*/
        >
          {
            sessionContextValue.session == null ?
              <SignIn />
            : <Box sx={{ height: '100%', width: '100%' }} > 
                <Outlet />
              </Box>
          }
        </SnackbarProvider>
      </SessionContext.Provider>
    </LocalizationProvider>
  );
}