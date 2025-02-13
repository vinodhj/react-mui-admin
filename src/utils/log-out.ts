import { useNavigate } from 'react-router-dom';
import { useSession } from '../hooks/use-session';
import { useContext } from 'react';
import { ColorModeContext } from '../contexts/color-mode-context';

export const useHandleLogout = () => {
  const navigate = useNavigate();
  const { updateSession } = useSession();
  const { setDarkMode } = useContext(ColorModeContext);

  const handleLogout = () => {
    // Update the session context to clear the token and user data.
    updateSession({
      token: '',
      adminName: '',
      adminEmail: '',
      adminRole: '',
      theme: '',
    });

    localStorage.clear();
    sessionStorage.clear();

    // Force theme to dark immediately
    setDarkMode();

    // Pass a logout message via navigation state
    navigate('/', { state: { logoutMessage: 'Logout successfully!' } });
  };

  return handleLogout;
};
