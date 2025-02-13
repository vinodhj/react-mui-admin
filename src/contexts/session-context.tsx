import React, { createContext, useState, useCallback, useMemo, ReactNode, useEffect } from 'react';
import isJwtTokenExpired from 'jwt-check-expiry';
import { useLocation } from 'react-router-dom';

export interface SessionData {
  theme?: string;
  token: string;
  adminName: string;
  adminEmail: string;
  adminRole: string;
}

export interface SessionContextProps {
  session: SessionData;
  updateSession: (data: SessionData) => void;
}

const signOutCheckInterval = import.meta.env.VITE_SIGNOUT_CHECK_INTERVAL_MINUTES;

const isBrowser = typeof window !== 'undefined';

const getStorageItem = (storage: Storage, key: string): string => (isBrowser ? storage.getItem(key) ?? '' : '');

const defaultSession: SessionData = {
  theme: getStorageItem(localStorage, 'theme') || 'dark',
  token: getStorageItem(localStorage, 'access_token'),
  adminName: getStorageItem(sessionStorage, 'session_admin_name'),
  adminEmail: getStorageItem(sessionStorage, 'session_admin_email'),
  adminRole: getStorageItem(sessionStorage, 'session_admin_role'),
};

// eslint-disable-next-line react-refresh/only-export-components
export const SessionContext = createContext<SessionContextProps | undefined>(undefined);

interface SessionProviderProps {
  children: ReactNode;
}

const SessionProvider: React.FC<SessionProviderProps> = ({ children }) => {
  const [session, setSession] = useState<SessionData>(defaultSession);
  const location = useLocation();

  const updateSession = useCallback((data: SessionData) => {
    setSession(data);
    if (data.token) {
      localStorage.setItem('access_token', data.token);
    } else {
      localStorage.clear();
      sessionStorage.clear();
    }

    localStorage.setItem('theme', data.theme ?? 'dark');
    sessionStorage.setItem('session_admin_name', data.adminName);
    sessionStorage.setItem('session_admin_email', data.adminEmail);
    sessionStorage.setItem('session_admin_role', data.adminRole);
  }, []);

  // Define a function that checks for token expiration using isJwtTokenExpired.
  const checkToken = useCallback(() => {
    console.log('Checking token...', signOutCheckInterval);
    if (session.token && isJwtTokenExpired(session.token)) {
      console.log('Token is expired');
      // Token is expired: clear session data.
      updateSession({
        ...session,
        token: '',
        adminName: '',
        adminEmail: '',
        adminRole: '',
      });
      localStorage.clear();
      sessionStorage.clear();
      window['location'].reload();
    }
  }, [session, updateSession]);

  // Run the check on every route change.
  useEffect(() => {
    checkToken();
  }, [location.pathname, checkToken]);

  // Also run the check periodically (every 5 minutes)
  useEffect(() => {
    const intervalId = setInterval(checkToken, signOutCheckInterval * 60 * 1000);
    return () => clearInterval(intervalId);
  }, [checkToken]);
  const value = useMemo(() => ({ session, updateSession }), [session, updateSession]);

  return <SessionContext.Provider value={value}>{children}</SessionContext.Provider>;
};

export default SessionProvider;
