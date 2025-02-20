import client from '../graphql/apollo-client';
import { useSession } from '../hooks/use-session';

export const useHandleLogout = () => {
  const { updateSession } = useSession();

  const handleLogout = async () => {
    // Update the session context to clear the token and user data.
    updateSession({
      token: '',
      adminName: '',
      adminEmail: '',
      adminRole: '',
      adminID: '',
    });

    try {
      await client.resetStore();
    } catch (error) {
      console.error('Error resetting Apollo store:', error);
    }
    localStorage.clear();
    sessionStorage.clear();
    window['location'].reload();
  };

  return handleLogout;
};
