import { useContext } from 'react';
import { SessionContext, SessionContextProps } from '../contexts/session-context';

export const useSession = (): SessionContextProps => {
  const context = useContext(SessionContext);
  if (!context) {
    throw new Error('useSession must be used within a SessionProvider');
  }
  return context;
};
