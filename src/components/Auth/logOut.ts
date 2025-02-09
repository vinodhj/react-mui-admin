// authUtils.ts
import { useNavigate } from 'react-router-dom';
export const useHandleLogout = () => {
  const navigate = useNavigate();

  const handleLogout = () => {
    localStorage.clear();
    sessionStorage.clear();
    // Pass a logout message via navigation state
    navigate('/', { state: { logoutMessage: 'Logout successfully!' } });
  };

  return handleLogout;
};
