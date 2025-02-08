import React, { createContext, useState, useCallback, useMemo, ReactNode } from 'react';

export interface SessionData {
  token: string;
  adminName: string;
  adminEmail: string;
  adminRole: string;
}

export interface SessionContextProps {
  session: SessionData;
  updateSession: (data: SessionData) => void;
}

const defaultSession: SessionData = {
  token: localStorage.getItem('access_token') || '',
  adminName: sessionStorage.getItem('session_admin_name') || '',
  adminEmail: sessionStorage.getItem('session_admin_email') || '',
  adminRole: sessionStorage.getItem('session_admin_role') || '',
};

// eslint-disable-next-line react-refresh/only-export-components
export const SessionContext = createContext<SessionContextProps | undefined>(undefined);

interface SessionProviderProps {
  children: ReactNode;
}

const SessionProvider: React.FC<SessionProviderProps> = ({ children }) => {
  const [session, setSession] = useState<SessionData>(defaultSession);

  const updateSession = useCallback((data: SessionData) => {
    setSession(data);
    if (data.token) {
      localStorage.setItem('access_token', data.token);
    }
    sessionStorage.setItem('session_admin_name', data.adminName);
    sessionStorage.setItem('session_admin_email', data.adminEmail);
    sessionStorage.setItem('session_admin_role', data.adminRole);
  }, []);

  const value = useMemo(() => ({ session, updateSession }), [session, updateSession]);

  return <SessionContext.Provider value={value}>{children}</SessionContext.Provider>;
};

export default SessionProvider;
