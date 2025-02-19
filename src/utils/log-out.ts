import { useSession } from '../hooks/use-session';

export const useHandleLogout = () => {
  const { updateSession } = useSession();

  const handleLogout = () => {
    // Update the session context to clear the token and user data.
    updateSession({
      token: '',
      adminName: '',
      adminEmail: '',
      adminRole: '',
      adminID: '',
    });

    localStorage.clear();
    sessionStorage.clear();
  };

  return handleLogout;
};
