import { useNavigate } from 'react-router-dom';
import { useSession } from '../hooks/use-session';

export const useHandleLogout = () => {
  const navigate = useNavigate();
  const { updateSession } = useSession();

  const handleLogout = () => {
    // Update the session context to clear the token and user data.
    updateSession({
      token: '',
      adminName: '',
      adminEmail: '',
      adminRole: '',
      theme: 'system', // or leave as an empty string if preferred
    });

    localStorage.clear();
    sessionStorage.clear();
    // Pass a logout message via navigation state
    navigate('/', { state: { logoutMessage: 'Logout successfully!' } });
  };

  return handleLogout;
};
