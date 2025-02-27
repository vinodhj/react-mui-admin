import { createContext, useContext } from 'react';
interface AuthContextProps {
  accessToken: string;
  setAccessToken: (type: string) => void;
  revoke: boolean;
  setRevoked: (type: boolean) => void;
}

export const AuthContext = createContext({} as AuthContextProps);

export function useAuth() {
  return useContext(AuthContext);
}
