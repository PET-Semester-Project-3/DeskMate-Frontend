import * as React from 'react';
import { Outlet } from 'react-router';
import { SessionContext } from './SessionContext';
import { LocalizationProvider } from '@mui/x-date-pickers/LocalizationProvider';
import { AdapterDayjs } from '@mui/x-date-pickers/AdapterDayjs';
import Cookies from 'js-cookie';
import SignIn from './pages/signin/SignInPage';

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
    <App sessionContextValue={sessionContextValue} />
    
  )
}

/* View */
export function App({ sessionContextValue }) {
  return (
    <LocalizationProvider dateAdapter={AdapterDayjs}>
      <SessionContext.Provider value={sessionContextValue}>
        {
          sessionContextValue.session == null ?
          <SignIn />
          : <Outlet />
        }
      </SessionContext.Provider>
    </LocalizationProvider>
  );
}