import * as React from 'react';
import { Outlet } from 'react-router';
import { SessionContext } from './SessionContext';
import Cookies from 'js-cookie';
import { Box } from '@mui/material';

/* Controller */
export default function AppController() {

  const [session, setSession] = React.useState(() => {
    const savedSession = Cookies.get('session');
    return savedSession ? JSON.parse(savedSession) : null;
  });

  React.useEffect(() => {
    if (session) {
      Cookies.set('session', JSON.stringify(session), { expires: 7 });
    } else {
      Cookies.remove('session');
    }
  }, [session]);

  const sessionContextValue = React.useMemo(() => ({ session, setSession }), [session, setSession]);

  return (
    <Box>
        {
          session != null ? /* REVERSE WHEN SESSION WORKS */
          <Box/>
          : <App sessionContextValue={sessionContextValue} />
        }
      </Box>
  )
}

/* View */
export function App({ sessionContextValue }) {
  return (
    <SessionContext.Provider value={sessionContextValue}>
        <Outlet />
    </SessionContext.Provider>
  );
}