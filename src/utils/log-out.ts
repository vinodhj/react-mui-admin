import client from '../graphql/apollo/apollo-client';
import { setIsLoggingOut } from '../graphql/auth-events';
import { useLogOutMutation } from '../graphql/graphql-generated';
import { useSession } from '../hooks/use-session';

export const useHandleLogout = () => {
  const { session, updateSession } = useSession();

  const [logOutMutation] = useLogOutMutation();

  const handleLogout = async () => {
    // Mark that a logout is in progress to avoid triggering the revoke error screen
    setIsLoggingOut(true);

    // Call logout mutation to invalidate the token on the server
    try {
      await logOutMutation();
    } catch (error) {
      console.error('Error during logout mutation:', error);
    }

    // Update the session context to clear the token and user data.
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
