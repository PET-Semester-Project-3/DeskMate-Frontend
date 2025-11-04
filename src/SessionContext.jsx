import * as React from 'react';

export const SessionContext = React.createContext({
  session: {},
  setSession: () => {},
});

export function useSessionContext() {
  return React.useContext(SessionContext);
}