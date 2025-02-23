import React, { createContext, useState, useCallback, useMemo, ReactNode, useEffect, useContext } from 'react';
import isJwtTokenExpired from 'jwt-check-expiry';
import { useLocation } from 'react-router-dom';
import { ColorModeContext } from './color-mode-context';
import client from '../graphql/apollo-client';
import getStoredOrPreferredColorMode from '../utils/preferred-color-mode';

export interface SessionData {
  colorMode?: string;
  token: string;
  sidebarImage?: string;
  sidebarCollapsed?: string;
  sidebarRTL?: string;
  adminName: string;
  adminEmail: string;
  adminRole: string;
  adminID: string;
}

export interface SessionContextProps {
  session: SessionData;
  updateSession: (data: SessionData) => void;
}

const signOutCheckInterval = Number(import.meta.env.VITE_SIGNOUT_CHECK_INTERVAL_MINUTES) * 60 * 1000 || 5 * 60 * 1000;

const isBrowser = typeof window !== 'undefined';

const getStorageItem = (storage: Storage, key: string): string => (isBrowser ? storage.getItem(key) ?? '' : '');

const defaultSession: SessionData = {
  colorMode: getStorageItem(localStorage, 'colorMode') || getStoredOrPreferredColorMode(),
  token: getStorageItem(localStorage, 'access_token'),
  sidebarImage: getStorageItem(localStorage, 'sidebarImage') || 'true',
  sidebarCollapsed: getStorageItem(localStorage, 'sidebarCollapsed') || 'false',
  sidebarRTL: getStorageItem(localStorage, 'sidebarRTL') || 'false',
  adminName: getStorageItem(sessionStorage, 'session_admin_name'),
  adminEmail: getStorageItem(sessionStorage, 'session_admin_email'),
  adminRole: getStorageItem(sessionStorage, 'session_admin_role'),
  adminID: getStorageItem(sessionStorage, 'session_admin_id'),
};

// Create the context
export const SessionContext = createContext<SessionContextProps | undefined>(undefined);

interface SessionProviderProps {
  children: ReactNode;
}

const SessionProvider: React.FC<SessionProviderProps> = ({ children }) => {
  const [session, setSession] = useState<SessionData>(defaultSession);
  const location = useLocation();
  const { setSystemMode } = useContext(ColorModeContext);
  const updateSession = useCallback(
    (data: SessionData) => {
      setSession(data);
      if (data.token) {
        localStorage.setItem('access_token', data.token);
      } else {
        localStorage.clear();
        sessionStorage.clear();
      }
      localStorage.setItem('colorMode', data.colorMode ?? getStoredOrPreferredColorMode());
      localStorage.setItem('sidebarImage', data.sidebarImage?.toString() ?? 'true');
      localStorage.setItem('sidebarCollapsed', data.sidebarCollapsed?.toString() ?? 'false');
      localStorage.setItem('sidebarRTL', data.sidebarRTL?.toString() ?? 'false');
      sessionStorage.setItem('session_admin_name', data.adminName);
      sessionStorage.setItem('session_admin_email', data.adminEmail);
      sessionStorage.setItem('session_admin_role', data.adminRole);
      sessionStorage.setItem('session_admin_id', data.adminID);

      // Force theme to system theme immediately
      setSystemMode();
    },
    [setSystemMode]
  );

  // Define a function that checks for token expiration using isJwtTokenExpired.
  const checkToken = useCallback(() => {
    if (session.token && isJwtTokenExpired(session.token)) {
      console.log('Token is expired');
      // Token is expired: clear session data.
      updateSession({
        ...session,
        token: '',
        adminName: '',
        adminEmail: '',
        adminRole: '',
        adminID: '',
        colorMode: '',
      });

      client.resetStore();
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
    const intervalId = setInterval(checkToken, signOutCheckInterval);
    return () => clearInterval(intervalId);
  }, [checkToken]);

  const value = useMemo(() => ({ session, updateSession }), [session, updateSession]);

  return <SessionContext.Provider value={value}>{children}</SessionContext.Provider>;
};

export default SessionProvider;
