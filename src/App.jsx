import * as React from 'react';
import { Outlet, useNavigate, useLocation } from 'react-router';
import { SessionContext } from './SessionContext';
import Cookies from 'js-cookie';

export default function App() {

  const [session, setSession] = React.useState(() => {
    const savedSession = Cookies.get('session');
    return savedSession ? JSON.parse(savedSession) : null;
  });
  const navigate = useNavigate();

  React.useEffect(() => {
    if (session) {
      Cookies.set('session', JSON.stringify(session), { expires: 7 });
    } else {
      Cookies.remove('session');
    }
  }, [session]);

  const signIn = React.useCallback(() => {
    navigate('/sign-in');
  }, [navigate]);
  const signOut = React.useCallback(() => {
    setSession(null);
    navigate('/sign-in');
  }, [navigate]);
  const sessionContextValue = React.useMemo(() => ({ session, setSession }), [session, setSession]);

  return (
    <SessionContext.Provider value={sessionContextValue}>
        <Outlet />
    </SessionContext.Provider>
  );
}