import React, { createContext, useState, useCallback, useMemo, ReactNode, useEffect, useContext } from 'react';
import isJwtTokenExpired from 'jwt-check-expiry';
import { useLocation } from 'react-router-dom';
import { ColorModeContext } from './color-mode-context';
import client from '../graphql/apollo-client';
import getStoredOrPreferredColorMode from '../utils/preferred-color-mode';
import { setIsRevoked } from '../graphql/authEvents';
import useLocalStorage from 'react-use-localstorage';

export interface UpdateSessionData {
  session: SessionData;
  sessionAdmin: SessionAdmin;
}
export interface SessionData {
  colorMode?: string;
  token: string;
  sidebarImage?: string;
  sidebarCollapsed?: string;
  sidebarRTL?: string;
}

export interface SessionAdmin {
  adminName: string;
  adminEmail: string;
  adminRole: string;
  adminID: string;
}

export interface SessionContextProps {
  session: SessionData;
  sessionAdmin: SessionAdmin;
  updateSession: (data: UpdateSessionData) => void;
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
};

const defaultSessionAdmin: SessionAdmin = {
  adminName: getStorageItem(localStorage, 'session_admin_name'),
  adminEmail: getStorageItem(localStorage, 'session_admin_email'),
  adminRole: getStorageItem(localStorage, 'session_admin_role'),
  adminID: getStorageItem(localStorage, 'session_admin_id'),
};

// Create the context
export const SessionContext = createContext<SessionContextProps | undefined>(undefined);

interface SessionProviderProps {
  children: ReactNode;
}

const SessionProvider: React.FC<SessionProviderProps> = ({ children }) => {
  const [tokenExpired, setTokenExpired] = useState(false);
  const [session, setSession] = useState<SessionData>(defaultSession);
  const [sessionAdmin, setSessionAdmin] = useLocalStorage('session_admin', JSON.stringify(defaultSessionAdmin));
  const parsedSessionAdmin = useMemo(() => JSON.parse(sessionAdmin), [sessionAdmin]);
  const location = useLocation();
  const { setSystemMode } = useContext(ColorModeContext);
  const updateSession = useCallback(
    (data: UpdateSessionData) => {
      setSession(data.session);
      setSessionAdmin(
        JSON.stringify({
          adminName: data.sessionAdmin.adminName,
          adminEmail: data.sessionAdmin.adminEmail,
          adminRole: data.sessionAdmin.adminRole,
          adminID: data.sessionAdmin.adminID,
        })
      );
      if (data.session.token) {
        localStorage.setItem('access_token', data.session.token);
      } else {
        localStorage.clear();
        // sessionStorage.clear();
      }
      localStorage.setItem('colorMode', data.session.colorMode ?? getStoredOrPreferredColorMode());
      localStorage.setItem('sidebarImage', data.session.sidebarImage?.toString() ?? 'true');
      localStorage.setItem('sidebarCollapsed', data.session.sidebarCollapsed?.toString() ?? 'false');
      localStorage.setItem('sidebarRTL', data.session.sidebarRTL?.toString() ?? 'false');

      // Force theme to system theme immediately
      setSystemMode();
    },
    [setSystemMode]
  );

  // Define a function that checks for token expiration using isJwtTokenExpired.
  const checkToken = useCallback(() => {
    if (!tokenExpired && session.token && isJwtTokenExpired(session.token)) {
      console.log('Token is expired');
      // Token is expired: clear session data.
      setTokenExpired(true);
      updateSession({
        session: {
          ...session,
          token: '',
          colorMode: '',
        },
        sessionAdmin: {
          adminName: '',
          adminEmail: '',
          adminRole: '',
          adminID: '',
        },
      });

      client.resetStore();
      localStorage.clear();
      setIsRevoked(true);
      // sessionStorage.clear();
      // window['location'].reload();
    }
  }, [session, sessionAdmin, tokenExpired, updateSession]);

  // Run the check on every route change.
  useEffect(() => {
    checkToken();
  }, [location.pathname, checkToken]);

  // Also run the check periodically (every 5 minutes)
  useEffect(() => {
    const intervalId = setInterval(checkToken, signOutCheckInterval);
    return () => clearInterval(intervalId);
  }, [checkToken]);

  const value = useMemo(() => ({ session, sessionAdmin: parsedSessionAdmin, updateSession }), [session, parsedSessionAdmin, updateSession]);
  return <SessionContext.Provider value={value}>{children}</SessionContext.Provider>;
};

export default SessionProvider;
