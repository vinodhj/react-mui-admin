import React, { createContext, useState, useCallback, useMemo, ReactNode, useEffect, useContext } from 'react';
import isJwtTokenExpired from 'jwt-check-expiry';
import { useLocation } from 'react-router-dom';
import { ColorModeContext } from './color-mode-context';
import client from '../graphql/apollo-client';
import getStoredOrPreferredColorMode from '../utils/preferred-color-mode';
import { setIsRevoked } from '../graphql/authEvents';
import useLocalStorage from 'react-use-localstorage';
import { useTypedSessionStorage } from '../hooks/use-typed-session-storage';

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
  sidebarToggled?: string;
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

const signOutCheckInterval = Number(import.meta.env.VITE_SIGNOUT_CHECK_INTERVAL_MINUTES) * 60 * 1000;

const isBrowser = typeof window !== 'undefined';

const getStorageItem = (storage: Storage, key: string): string => (isBrowser ? storage.getItem(key) ?? '' : '');

const defaultSession: SessionData = {
  colorMode: getStorageItem(localStorage, 'colorMode') || getStoredOrPreferredColorMode(),
  token: getStorageItem(localStorage, 'access_token'),
  sidebarImage: getStorageItem(localStorage, 'sidebarImage') || 'true',
  sidebarCollapsed: getStorageItem(localStorage, 'sidebarCollapsed') || 'false',
  sidebarRTL: getStorageItem(localStorage, 'sidebarRTL') || 'false',
  sidebarToggled: getStorageItem(localStorage, 'sidebarToggled') || 'false',
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

const generateSessionId = (): string => {
  if (typeof crypto !== 'undefined' && crypto.randomUUID) {
    return crypto.randomUUID();
  }
  return 'session-' + Math.random().toString(36).substring(2, 15) + '-' + Date.now();
};

const SessionProvider: React.FC<SessionProviderProps> = ({ children }) => {
  const [tokenExpired, setTokenExpired] = useState(false);
  const [session, setSession] = useState<SessionData>(defaultSession);
  const [sessionAdmin, setSessionAdmin] = useLocalStorage('session_admin', JSON.stringify(defaultSessionAdmin));
  const location = useLocation();
  const { setSystemMode } = useContext(ColorModeContext);

  // Parse admin session data with error handling
  const parsedSessionAdmin = useMemo(() => {
    try {
      return JSON.parse(sessionAdmin);
    } catch (error) {
      console.error('Failed to parse session admin data:', error);
      return defaultSessionAdmin;
    }
  }, [sessionAdmin]);

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
        sessionStorage.clear();
      }
      localStorage.setItem('colorMode', data.session.colorMode ?? getStoredOrPreferredColorMode());
      localStorage.setItem('sidebarImage', data.session.sidebarImage?.toString() ?? 'true');
      localStorage.setItem('sidebarCollapsed', data.session.sidebarCollapsed?.toString() ?? 'false');
      localStorage.setItem('sidebarRTL', data.session.sidebarRTL?.toString() ?? 'false');
      localStorage.setItem('sidebarToggled', data.session.sidebarToggled?.toString() ?? 'false');

      // Force theme to system theme immediately
      setSystemMode();
    },
    [setSystemMode]
  );

  // Define a function that checks for token expiration using isJwtTokenExpired.
  const checkTokenValidity = useCallback(() => {
    if (tokenExpired || !session.token) return;

    try {
      if (isJwtTokenExpired(session.token)) {
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
        sessionStorage.clear();
        setIsRevoked(true);
      }
    } catch (error) {
      console.error('Error checking token validity:', error);
    }
  }, [session, sessionAdmin, tokenExpired, updateSession]);

  // Run the check on every route change.
  useEffect(() => {
    checkTokenValidity();
  }, [location.pathname, checkTokenValidity]);

  // Also run the check periodically (every 5 minutes)
  useEffect(() => {
    const intervalId = setInterval(checkTokenValidity, signOutCheckInterval);
    return () => clearInterval(intervalId);
  }, [checkTokenValidity]);

  // Use our custom hook for session ID and metadata.
  const [sessionId, setSessionId] = useTypedSessionStorage<string>('sessionId', '');
  const [_sessionMetadata, setSessionMetadata] = useTypedSessionStorage<{
    sessionId: string;
    token: string;
    url: string;
    lastTimestamp: string;
    targetElement?: string;
  }>('sessionMetadata', { sessionId: '', token: '', url: '', lastTimestamp: '' });

  // Initialize sessionId if not already set.
  useEffect(() => {
    if (!sessionId) {
      setSessionId(generateSessionId());
    }
  }, [sessionId, setSessionId]);

  // Helper function to update metadata using the custom hook.
  const updateMetadata = useCallback(
    (targetElement?: string) => {
      try {
        setSessionMetadata({
          sessionId: sessionId || generateSessionId(),
          token: session.token || '',
          url: window.location.href,
          lastTimestamp: new Date().toISOString(),
          targetElement,
        });

        // Here you would add analytics tracking or event logging
        // Example: analyticsService.logPageView(sessionId, window.location.href);
      } catch (error) {
        console.error('Error updating session metadata:', error);
      }
    },
    [sessionId, session.token, setSessionMetadata]
  );

  // Log page load event when session data is available.
  useEffect(() => {
    if (session.token) {
      // TODO: Log page load event
      updateMetadata();
    }
  }, [session.token, sessionId, updateMetadata]);

  // Log a user interaction event for every click.
  useEffect(() => {
    let debounceTimeout: NodeJS.Timeout;
    const handleUserInteraction = (event: MouseEvent) => {
      if (!session.token) return;
      if (debounceTimeout) clearTimeout(debounceTimeout);

      // Capture relevant information about the clicked element
      const target = event.target as HTMLElement;
      let targetInfo;
      if (target) {
        const tagName = target.tagName.toLowerCase();
        const targetId = target.id ? `#${target.id}` : '';
        targetInfo = `${tagName}${targetId}`;
      } else {
        targetInfo = 'unknown';
      }

      debounceTimeout = setTimeout(() => {
        updateMetadata(targetInfo);
      }, 500);
    };
    document.addEventListener('click', handleUserInteraction);
    return () => {
      document.removeEventListener('click', handleUserInteraction);
      if (debounceTimeout) clearTimeout(debounceTimeout);
    };
  }, [session.token, sessionId, updateMetadata]);

  const value = useMemo(() => ({ session, sessionAdmin: parsedSessionAdmin, updateSession }), [session, parsedSessionAdmin, updateSession]);
  return <SessionContext.Provider value={value}>{children}</SessionContext.Provider>;
};

export default SessionProvider;
