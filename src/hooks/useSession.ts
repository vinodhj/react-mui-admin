import { useContext } from 'react';
import { SessionContext, SessionContextProps } from './SessionContext';

export const useSession = (): SessionContextProps => {
  const context = useContext(SessionContext);
  if (!context) {
    throw new Error('useSession must be used within a SessionProvider');
  }
  return context;
};
